const Axios = require("axios");
const User = require("../../models/User");
const {
  generateTokenWOExp,
  generateTokenWithExp,
} = require("../../helpers/jwt");
const { checkPass } = require("../../helpers/hashPass");
const { response } = require("express");
//Dinda nambahin
const express = require("express");
const router = express.Router();

class Controller {
  static createUser(req, res, next) {
    let { idClient, idCabang, perusahaan, nama, username, role } = req.body;
    User.find({ username })
      .then((response) => {
        console.log(response, "response");
        if (response.length === 0) {
          return User.create({
            idClient,
            idCabang,
            perusahaan,
            nama,
            username,
            password: "1234",
            role,
          });
        } else {
          throw { status: 400, message: "User sudah digunakan" };
        }
      })
      .then((response) => {
        res.status(200).json({ message: "Berhasil untuk ditambahkan" });
      })
      .catch(next);
  }

  // static getProfile(req, res, next) {
  //   User.findById(req.user.id)
  //     .then((user) => {
  //       if (!user) throw { status: 404, message: "User tidak ditemukan" };

  //       res.status(200).json({
  //         id: user._id,
  //         nama: user.nama,
  //         username: user.username,
  //         role: user.role,
  //         perusahaan: user.perusahaan,
  //       });
  //     })
  //     .catch(next);
  // }

  static getUser(req, res, next) {
    User.aggregate([
      {
        $lookup: {
          from: "cabangs",
          localField: "idCabang",
          foreignField: "idCabang",
          as: "listCabang",
        },
      },
      {
        $unwind: {
          path: "$listCabang",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "clients",
          localField: "idClient",
          foreignField: "idClient",
          as: "listClient",
        },
      },
      {
        $unwind: {
          path: "$listClient",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          nama: 1,
          username: 1,
          password: 1,
          idCabang: "$listCabang.idCabang",
          namaCabang: "$listCabang.namaCabang",
          idClient: "$listClient.idClient",
          namaClient: "$listClient.namaClient",
          perusahaan: 1,
          role: 1,
          menu: 1,
        },
      },
      { $sort: { nama: 1 } },
    ])
      .then((response) => {
        res.status(200).json(response);
      })
      .catch(next);
  }

  static getJumlahUser(req, res, next) {
    User.countDocuments()
      .then((count) => {
        res.status(200).json({ count });
      })
      .catch(next);
  }

  // Berdasarkan id atau username
  static updateUser(req, res, next) {
    let { id, username } = req.query; // Ambil ID atau username dari query params
    let updateData = req.body; // Data yang akan diperbarui

    let searchCriteria = {};
    if (id) {
      searchCriteria._id = id;
    } else if (username) {
      searchCriteria.username = username;
    } else {
      return res
        .status(400)
        .json({ message: "Harap berikan ID atau username" });
    }

    User.findOne(searchCriteria)
      .then((existingUser) => {
        if (!existingUser) {
          throw { status: 404, message: "User tidak ditemukan" };
        }

        return User.findByIdAndUpdate(
          existingUser._id,
          {
            nama: updateData.nama || existingUser.nama,
            idClient: updateData.idClient || existingUser.idClient,
            idCabang: updateData.idCabang || existingUser.idCabang,
            perusahaan: updateData.perusahaan || existingUser.perusahaan,
            role: updateData.role || existingUser.role,
            menu: updateData.menu || existingUser.menu,
          },
          { new: true }
        );
      })
      .then((updatedUser) => {
        console.log(response, "cihuy");
        res
          .status(200)
          .json({ message: "User berhasil diperbarui", user: updatedUser });
      })
      .catch(next);
  }

  static loginWeb(req, res, next) {
    let { username, password } = req.body;
    User.findOne({ username })
      .then(async (response) => {
        if (response && checkPass(password, response.password)) {
          try {
            let token = {
              idCabang: response.idCabang,
              idClient: response.idClient,
              perusahaan: response.perusahaan,
              nama: response.nama,
              username: response.username,
              role: response.role,
              menu: response.menu,
            };

            let tokenHashed = await generateTokenWithExp(token);
            res.status(200).json({
              username: response.username,
              idClient: response.idClient,
              idCabang: response.idCabang,
              role: response.role,
              token: tokenHashed,
              menu: response.menu,
              nama: response.nama,
              perusahaan: response.perusahaan,
            });
          } catch (error) {
            console.log(error);
          }
        } else {
          throw { status: 400, message: "Username atau Password anda salah" };
        }
      })
      .catch(next);
  }

  static refresh(req, res, next) {
    User.findOne({ username: req.decoded.username })
      .then(async (response) => {
        if (response) {
          try {
            let token = {
              username: response.username,
              nama: response.nama,
              perusahaan: response.perusahaan,
              idCabang: response.idCabang,
              idClient: response.idClient,
              role: response.role,
            };

            let tokenHashed = await generateTokenWithExp(token);
            res.status(200).json({
              cabang: response.cabang,
              username: response.username,
              perusahaan: response.perusahaan,
              role: response.role,
              nama: response.nama,
              menu: response.menu,
              idCabang: response.idCabang,
              token: tokenHashed,
            });
          } catch (err) {}
        } else {
          throw { status: 403, message: "Kredensial bermasalah" };
        }
      })
      .catch(next);
  }

  static deleteUser(req, res, next) {
    const { id } = req.query; //hapus by ID (MongoDB _id)

    if (!id) {
      return res.status(400).json({ message: "ID User diperlukan!" });
    }

    User.findByIdAndDelete(id)
      .then((result) => {
        if (!result) {
          return res.status(404).json({ message: "User tidak ditemukan" });
        }
        res.status(200).json({
          message: "User berhasil dihapus",
          data: result,
        });
      })
      .catch(next);
  }
}

router.put("/users/:id", Controller.updateUser); // PUT untuk update keseluruhan

module.exports = Controller;
