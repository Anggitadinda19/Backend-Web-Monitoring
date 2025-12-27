const { response } = require("express");
const Shift = require("../../models/shift");

const { ObjectId } = require("mongoose").Types;

class Controller {
  static createShift(req, res, next) {
    let { idCabang, namaShift, durasi, patroli, jam, status } = req.body;

    Shift.create({ idCabang, namaShift, durasi, patroli, jam, status })
      .then((response) => {
        res.status(200).json({ message: "Data berhasil ditambahkan" });
      })
      .catch(next);
  }

  static getShift(req, res, next) {
    Shift.aggregate([
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
        $project: {
          _id: 1,
          idCabang: "$listCabang.idCabang",
          namaCabang: "$listCabang.namaCabang",
          namaShift: 1,
          durasi: 1,
          patroli: 1,
          jam: 1,
          status: 1,
        },
      },
      { $sort: { namaShift: 1 } },
    ])
      .then((response) => {
        res.status(200).json(response);
      })
      .catch(next);
  }

  static getJumlahShift(req, res, next) {
    Shift.countDocuments()
      .then((count) => {
        res.status(200).json({ count });
      })
      .catch(next);
  }

  static deleteShift(req, res, next) {
    const { id } = req.query; // Ambil ID dari url (?id=...)

    if (!id) {
      return res.status(400).json({ message: "ID Shift diperlukan!" });
    }

    try {
      Shift.findOneAndDelete({ _id: new ObjectId(id) })
        .then((result) => {
          if (!result) {
            return res.status(404).json({ message: "Shift tidak ditemukan" });
          }

          res.status(200).json({
            message: "Data Shift berhasil dihapus",
            data: result,
          });
        })
        .catch(next);
    } catch (error) {
      return res.status(400).json({ message: "Format ID salah!" });
    }
  }
}

module.exports = Controller;
