const { response } = require("express");
const Ruangan = require("../../models/ruangan");

const { ObjectId } = require("mongoose").Types;

class Controller {
  // static createRuangan(req, res, next) {
  //   let { idCabang, ruangan, idClient } = req.body;
  //   console.log(req.body, "KKK");
  //   Ruangan.find({ ruangan })
  //     .then((response) => {
  //       if (response.length === 0) {
  //         return Ruangan.create({
  //           idCabang,
  //           ruangan,
  //           idClient,
  //         }).then((response) => {
  //           return Ruangan.findByIdAndUpdate(response._id, {
  //             kodeRuangan: String(response._id).slice(
  //               String(response._id).length - 6,
  //               String(response._id).length
  //             ),
  //           });
  //         });
  //       } else {
  //         throw { status: 400, message: "Ruangan sudah terdaftar" };
  //       }
  //     })
  //     .then((response) => {
  //       res.status(200).json({ message: "Ruangan baru berhasil ditambahkan" });
  //     })
  //     .catch(next);
  // }

  static createRuangan(req, res, next) {
    let { idRuangan, namaRuangan } = req.body;

    Ruangan.find({ idRuangan })
      .then((response) => {
        if (response.length === 0) {
          return Ruangan.create({
            idRuangan,
            namaRuangan,
          }).then((response) => {
            // generate kodeRuangan dari 6 digit terakhir ObjectId
            const kode = String(response._id).slice(-6);

            return Ruangan.findByIdAndUpdate(
              response._id,
              { kodeRuangan: kode },
              { new: true }
            );
          });
        } else {
          throw { status: 400, message: "ID Ruangan sudah digunakan" };
        }
      })
      .then(() => {
        res.status(200).json({ message: "Ruangan berhasil ditambahkan" });
      })
      .catch(next);
  }

  // static getRuangan(req, res, next) {
  //   Ruangan.aggregate([
  //     {
  //       $lookup: {
  //         from: "cabangs",
  //         localField: "idCabang",
  //         foreignField: "idCabang",
  //         as: "listCabang",
  //       },
  //     },
  //     {
  //       $unwind: {
  //         path: "$listCabang",
  //         preserveNullAndEmptyArrays: true,
  //       },
  //     },
  //     {
  //       $lookup: {
  //         from: "clients",
  //         localField: "idClient",
  //         foreignField: "idClient",
  //         as: "listClient",
  //       },
  //     },
  //     {
  //       $unwind: {
  //         path: "$listClient",
  //         preserveNullAndEmptyArrays: true,
  //       },
  //     },
  //     {
  //       $project: {
  //         _id: 1,
  //         ruangan: 1,
  //         idCabang: "$listCabang.idCabang",
  //         namaCabang: "$listCabang.namaCabang",
  //         idClient: "$listClient.idClient",
  //         namaClient: "$listClient.namaClient",
  //       },
  //     },
  //     { $sort: { ruangan: 1 } },
  //   ])
  //     .then((response) => {
  //       res.status(200).json(response);
  //     })
  //     .catch(next);
  // }

  static getRuangan(req, res, next) {
    Ruangan.aggregate([
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
          idRuangan: 1,
          namaRuangan: 1,
          kodeRuangan: 1,

          // idCabang: "$listCabang.idCabang",
          // namaCabang: "$listCabang.namaCabang",

          // idClient: "$listClient.idClient",
          // namaClient: "$listClient.namaClient",
        },
      },
      { $sort: { namaRuangan: 1 } },
    ])
      .then((response) => {
        res.status(200).json(response);
      })
      .catch(next);
  }

  // static getRuangan(req, res, next) {
  //   Ruangan.find()
  //     .then((response) => {
  //       res.status(200).json(response);
  //     })
  //     .catch(next);
  // }

  static getJumlahRuangan(req, res, next) {
    Ruangan.countDocuments()
      .then((count) => {
        res.status(200).json({ count });
      })
      .catch(next);
  }

  static deleteRuangan(req, res, next) {
    const { id } = req.query; // Ambil ID dari url (?id=...)

    if (!id) {
      return res.status(400).json({ message: "ID Ruangan diperlukan!" });
    }

    Ruangan.findOneAndDelete({ _id: new ObjectId(id) })
      .then((result) => {
        if (!result) {
          return res.status(404).json({ message: "Ruangan tidak ditemukan" });
        }

        res.status(200).json({
          message: "Data Ruangan berhasil dihapus",
          data: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Format ID salah atau Server Error",
          error: err.message,
        });
      });
  }
}

module.exports = Controller;
