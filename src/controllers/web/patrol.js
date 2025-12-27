const { ObjectId } = require("mongodb");
const moment = require("moment-timezone");
const Patrol = require("../../models/patrol");
const Ruangan = require("../../models/ruangan");
const Cabang = require("../../models/cabang");
const Shift = require("../../models/shift");

class Controller {
  // static async createPatrol(req, res, next) {
  //   let { nama, idCabang } = req.decoded;
  //   let { idRuangan, idShift, status, deskripsi, nfc, temuan } = req.body;
  //   let date = new Date();
  //   let tglLaporan = moment(date).format("YYYY-MM-DD");
  //   let namaRuangan = await Ruangan.findOne({ _id: ObjectId(idRuangan) }).then(
  //     (response) => {
  //       return response ? response.ruangan : "Ruangan Tidak Ditemukan";
  //     }
  //   );
  //   let namaShift = await Shift.findOne({ _id: ObjectId(idShift) }).then(
  //     (response) => {
  //       return response ? response.shift : "Shift Tidak Ditemukan";
  //     }
  //   );

  //   let cabang = await Cabang.aggregate([
  //     { $match: { idCabang: idCabang.toString() } },
  //     {
  //       $lookup: {
  //         from: "clients",
  //         localField: "idClient",
  //         foreignField: "idClient",
  //         as: "Client",
  //       },
  //     },
  //     { $unwind: "$Client" },
  //     {
  //       $project: {
  //         idCabang: 1,
  //         namaCabang: 1,
  //         idClient: 1,
  //         namaClient: "$Client.namaClient",
  //       },
  //     },
  //     { $sort: { tglLaporan: -1 } },
  //   ]).then((response) => {
  //     return response && response.length > 0 ? response[0] : null;
  //   });

  //   // Tambahan
  //   // let dokumentasi = req.files?.map((file) => file.filename);

  //   // if (!cabang) {
  //   //     return res.status(404).json({ message: "Cabang tidak ditemukan" });
  //   // }

  //   Patrol.create({
  //     idCabang: cabang.idCabang,
  //     idClient: cabang.idClient,
  //     idRuangan: idRuangan,
  //     idShift: idShift,
  //     namaCabang: cabang.namaCabang,
  //     namaClient: cabang.namaClient,
  //     namaRuangan: namaRuangan,
  //     namaShift: namaShift,
  //     dilaporkanOleh: nama,
  //     tglLaporan: tglLaporan,
  //     status: status,
  //     deskripsi: deskripsi,
  //     nfc: nfc,
  //     temuan: temuan,
  //     dokumentasi: req.body.foto,
  //   })
  //     .then((response) => {
  //       res
  //         .status(200)
  //         .json({ data: response, message: "Laporan berhasil ditambahkan" });
  //     })
  //     .catch(next);
  // }

  // static async createPatrol(req, res, next) {
  //   try {
  //     let { nama, idCabang } = req.decoded;
  //     let { idRuangan, idShift, status, deskripsi, nfc, temuan, foto } =
  //       req.body;

  //     let date = new Date();
  //     let tglLaporan = moment(date).tz("Asia/Jakarta").format("YYYY-MM-DD");

  //     let listDokumentasi = [];

  //     // if (req.files && req.files.length > 0) {
  //     //   listDokumentasi = req.files.map((file) => `images/${file.filename}`);
  //     // } else if (foto) {
  //     //   listDokumentasi = Array.isArray(foto) ? foto : [foto];
  //     // }

  //     if (req.body.foto) {
  //       listDokumentasi = req.body.foto; // sudah berisi URL localhost
  //     }

  //     let dataRuangan = await Ruangan.findOne({ _id: new ObjectId(idRuangan) });
  //     if (!dataRuangan) {
  //       return res.status(404).json({ message: "Ruangan Tidak Ditemukan" });
  //     }

  //     let dataShift = await Shift.findOne({ _id: new ObjectId(idShift) });
  //     if (!dataShift) {
  //       return res.status(404).json({ message: "Shift Tidak Ditemukan" });
  //     }

  //     let newPatrol = await Patrol.create({
  //       idCabang: idCabang,
  //       idClient: dataRuangan.idClient,
  //       idRuangan: idRuangan,
  //       idShift: idShift,
  //       namaRuangan: dataRuangan.ruangan,
  //       namaShift: dataShift.namaShift,
  //       dilaporkanOleh: nama,
  //       tglLaporan: tglLaporan,
  //       // status: status,
  //       deskripsi: deskripsi,
  //       // nfc: nfc,
  //       // temuan: temuan,
  //       dokumentasi: listDokumentasi,
  //     });

  //     return res.status(200).json({
  //       message: "Laporan berhasil ditambahkan",
  //       data: newPatrol,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // static async createPatrol(req, res, next) {
  //   try {
  //     const { nama, idCabang } = req.decoded;
  //     const {
  //       judul,
  //       idRuangan,
  //       idShift,
  //       deskripsi,
  //       foto, // array URL
  //       tglPelaksanaan, // dari frontend
  //     } = req.body;

  //     const dataRuangan = await Ruangan.findById(idRuangan);
  //     if (!dataRuangan)
  //       return res.status(404).json({ message: "Ruangan Tidak Ditemukan" });

  //     const dataShift = await Shift.findById(idShift);
  //     if (!dataShift)
  //       return res.status(404).json({ message: "Shift Tidak Ditemukan" });

  //     const newPatrol = await Patrol.create({
  //       idCabang,
  //       idClient: dataRuangan.idClient,
  //       idRuangan,
  //       idShift,
  //       judul,
  //       namaRuangan: dataRuangan.ruangan,
  //       namaShift: dataShift.namaShift,
  //       dilaporkanOleh: nama,
  //       tglPelaksanaan: tglPelaksanaan || new Date(),
  //       deskripsi,
  //       dokumentasi: Array.isArray(foto) ? foto : [],
  //     });

  //     res.status(200).json({
  //       message: "Laporan berhasil ditambahkan",
  //       data: newPatrol,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // static async createPatrol(req, res, next) {
  //   try {
  //     const { nama } = req.decoded;

  //     const {
  //       judul,
  //       idRuangan,
  //       idShift,
  //       deskripsi,
  //       foto, // array URL / path
  //       // tglPelaksanaan,
  //       // status,
  //     } = req.body;

  //     // validasi ruangan
  //     const dataRuangan = await Ruangan.findById(idRuangan);
  //     if (!dataRuangan) {
  //       return res.status(404).json({
  //         message: "Ruangan tidak ditemukan",
  //       });
  //     }

  //     // validasi shift
  //     const dataShift = await Shift.findById(idShift);
  //     if (!dataShift) {
  //       return res.status(404).json({
  //         message: "Shift tidak ditemukan",
  //       });
  //     }

  //     const newPatrol = await Patrol.create({
  //       judul,
  //       // tglPelaksanaan: tglPelaksanaan || new Date(),
  //       idRuangan,
  //       idShift,
  //       dilaporkanOleh: nama,
  //       deskripsi,
  //       dokumentasi: Array.isArray(foto) ? foto : [],
  //       // status: status || "pending",
  //     });

  //     res.status(201).json({
  //       message: "Patrol berhasil ditambahkan",
  //       data: newPatrol,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  static async createPatrol(req, res, next) {
    try {
      const { nama } = req.decoded;
      const { judul, idRuangan, idShift, deskripsi, foto } = req.body;

      const dataRuangan = await Ruangan.findById(idRuangan);
      if (!dataRuangan)
        return res.status(404).json({ message: "Ruangan tidak ditemukan" });

      const dataShift = await Shift.findById(idShift);
      if (!dataShift)
        return res.status(404).json({ message: "Shift tidak ditemukan" });

      const newPatrol = await Patrol.create({
        judul, // ✅ INI KUNCI TITLE
        idRuangan,
        idShift,

        namaRuangan: dataRuangan.namaRuangan || dataRuangan.ruangan, // ✅ INI KUNCI ROOM
        namaShift: dataShift.namaShift,

        dilaporkanOleh: nama,
        deskripsi,
        dokumentasi: Array.isArray(foto) ? foto : [],
      });

      res.status(201).json({
        message: "Patrol berhasil ditambahkan",
        data: newPatrol,
      });
    } catch (err) {
      next(err);
    }
  }

  // static getPatrol(req, res, next) {
  //   let { dariTgl, smpTgl, page, limit, search, shift } = req.query;
  //   let durasi = 7;
  //   let tglMulai = new Date(Number(dariTgl));
  //   let tglSelesai = new Date(Number(smpTgl));
  //   let tmpAwal = moment(new Date(Number(tglMulai))).format("YYYY-MM-DD");
  //   let tmpAkhir = moment(new Date(Number(tglSelesai))).format("YYYY-MM-DD");

  //   let shiftMulai = 7;

  //   let hasilJamAwl = (shiftMulai - durasi + 24) % 24;
  //   let hasilJamAkhir = ((shiftMulai - durasi + 24) % 24) - 1;
  //   hasilJamAkhir = hasilJamAkhir < 0 ? hasilJamAkhir + 24 : hasilJamAkhir;
  //   if (hasilJamAwl === 0) {
  //     let timeStamp = new Date(tmpAwal).getTime();
  //     let timestampSelanjutnya = timeStamp + 24 * 60 * 60 * 1000; // Menambahkan 1 hari (24 jam dalam milidetik)
  //     tmpAwal = new Date(timestampSelanjutnya).toISOString().split("T")[0];
  //   }
  //   var newtglAwal = new Date(
  //     `${tmpAwal}T${
  //       hasilJamAwl < 10 ? "0" + hasilJamAwl.toString() : hasilJamAwl.toString()
  //     }:00:00.000Z`
  //   ); // Tanggal awal dengan jam 06:00
  //   var newtglAkhir = new Date(
  //     `${tmpAkhir}T${
  //       hasilJamAkhir < 10
  //         ? "0" + hasilJamAkhir.toString()
  //         : hasilJamAkhir.toString()
  //     }:59:00.000Z`
  //   );

  //   let filter =
  //     dariTgl || smpTgl || search || shift
  //       ? {
  //           $and: [
  //             {
  //               createdAt: {
  //                 $gte: newtglAwal,
  //                 $lte: newtglAkhir,
  //               },
  //             },
  //             search
  //               ? {
  //                   $or: [
  //                     { dilaporkanOleh: new RegExp(search, "i") },
  //                     { namaRuangan: new RegExp(search, "i") },
  //                   ],
  //                 }
  //               : {},
  //             shift ? { namaShift: shift } : {},
  //           ],
  //         }
  //       : {};
  //   console.log(newtglAwal, "tanggal awal", newtglAkhir, "tanggal akhir");

  //   Patrol.find(filter)
  //     .skip(parseInt(limit) * (parseInt(page) - 1))
  //     .limit(parseInt(limit))
  //     .sort({ tglLaporan: -1 })
  //     .then((results) => {
  //       const response = {
  //         status: 200,
  //         data: results,
  //         limit: parseInt(limit),
  //         page: parseInt(page),
  //         totalDocs: results.length, // Total dokumen dalam hasil paginasi ini
  //         pagingCounter: (parseInt(page) - 1) * parseInt(limit) + 1, // Counter halaman pertama dalam paginasi ini
  //         hasPrevPage: parseInt(page) > 1, // Memeriksa apakah ada halaman sebelumnya
  //         hasNextPage: results.length === parseInt(limit), // Memeriksa apakah ada halaman berikutnya
  //         prevPage: parseInt(page) > 1 ? parseInt(page) - 1 : null, // Nomor halaman sebelumnya jika ada
  //         nextPage:
  //           results.length === parseInt(limit) ? parseInt(page) + 1 : null, // Nomor halaman berikutnya jika ada
  //       };

  //       Patrol.countDocuments(filter).then((count) => {
  //         response.totalDocs = count;
  //         // Menghitung total halaman
  //         response.totalPages = Math.ceil(
  //           count.length === 0 ? 0 : count / parseInt(limit)
  //         );
  //         res.status(200).json(response);
  //       });
  //     })
  //     .catch((err) => {
  //       console.error("Error:", err);
  //       res.status(500).json({ status: 500, message: "Internal Server Error" });
  //     });

  //   // Patrol.find()
  //   //     .sort({tglLaporan: 1})
  //   //     .then((response)=>{
  //   //         res.status(200).json(response)
  //   // })
  //   // .catch(next)
  // }

  static getPatrol(req, res, next) {
    let { dariTgl, smpTgl, page, limit, search, shift } = req.query;
    let durasi = 7;
    let tglMulai = new Date(Number(dariTgl));
    let tglSelesai = new Date(Number(smpTgl));
    let tmpAwal = moment(new Date(Number(tglMulai))).format("YYYY-MM-DD");
    let tmpAkhir = moment(new Date(Number(tglSelesai))).format("YYYY-MM-DD");

    let shiftMulai = 7;

    let hasilJamAwl = (shiftMulai - durasi + 24) % 24;
    let hasilJamAkhir = ((shiftMulai - durasi + 24) % 24) - 1;
    hasilJamAkhir = hasilJamAkhir < 0 ? hasilJamAkhir + 24 : hasilJamAkhir;
    if (hasilJamAwl === 0) {
      let timeStamp = new Date(tmpAwal).getTime();
      let timestampSelanjutnya = timeStamp + 24 * 60 * 60 * 1000;
      tmpAwal = new Date(timestampSelanjutnya).toISOString().split("T")[0];
    }

    var newtglAwal = new Date(
      `${tmpAwal}T${
        hasilJamAwl < 10 ? "0" + hasilJamAwl : hasilJamAwl
      }:00:00.000Z`
    );
    var newtglAkhir = new Date(
      `${tmpAkhir}T${
        hasilJamAkhir < 10 ? "0" + hasilJamAkhir : hasilJamAkhir
      }:59:00.000Z`
    );

    /** =========================
   * FILTER (HANYA DISENTUH DI SINI)
   ========================== */
    let filter =
      dariTgl || smpTgl || search || shift
        ? {
            $and: [
              {
                createdAt: {
                  $gte: newtglAwal,
                  $lte: newtglAkhir,
                },
              },
              search
                ? {
                    $or: [
                      { judul: new RegExp(search, "i") },
                      { dilaporkanOleh: new RegExp(search, "i") },
                    ],
                  }
                : {},
              shift ? { idShift: shift } : {}, // ✔ FIX (pakai ID)
            ],
          }
        : {};

    /** =========================
   * QUERY UTAMA (FIX RUANGAN & SHIFT)
   ========================== */
    Patrol.find(filter)
      .populate("idRuangan")
      .populate("idShift")
      .skip(parseInt(limit) * (parseInt(page) - 1))
      .limit(parseInt(limit))
      .sort({ tglLaporan: -1 })
      .then((results) => {
        const response = {
          status: 200,
          data: results,
          limit: parseInt(limit),
          page: parseInt(page),
          totalDocs: results.length,
          pagingCounter: (parseInt(page) - 1) * parseInt(limit) + 1,
          hasPrevPage: parseInt(page) > 1,
          hasNextPage: results.length === parseInt(limit),
          prevPage: parseInt(page) > 1 ? parseInt(page) - 1 : null,
          nextPage:
            results.length === parseInt(limit) ? parseInt(page) + 1 : null,
        };

        Patrol.countDocuments(filter).then((count) => {
          response.totalDocs = count;
          response.totalPages = Math.ceil(count / parseInt(limit));
          res.status(200).json(response);
        });
      })
      .catch((err) => {
        console.error("Error:", err);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
      });
  }

  // static async grafikPatrol(req, res, next){
  //     let { dari, sampai, idCabangWeb } = req.query;
  //     let { role, idCabang, idClient } = req.decoded;
  //     let tglMulai = new Date(Number(dari));
  //     let tglSelesai = new Date(Number(sampai));
  //     let selisih = tglSelesai - tglMulai;
  //     let diffDays = Math.ceil(selisih / (1000 * 60 * 60 * 24));
  //     let totalRuangan = 0;
  //     let sementara = new Date(Number(dari));
  //     let sementara2 = new Date(Number(sampai));
  //     // sementara.setDate(sementara.getDate() - 1);
  //     sementara2.setDate(sementara2.getDate());
  //     let tmpAwal = moment(new Date(Number(sementara))).format("YYYY-MM-DD");
  //     let tmpAkhir = moment(new Date(Number(sementara2))).format("YYYY-MM-DD");
  //     // var newtglAwal = new Date(${tmpAwal}T23:00:00.000Z); // Tanggal awal dengan jam 06:00
  //     // var newtglAkhir = new Date(${tmpAkhir}T22:59:00.000Z);
  //     let shift = await Shift.find({ idCabang: idCabangWeb })
  //       .sort({ namaShift: 1 })
  //       .then((response) => {
  //         if (response.length > 0) {
  //           return response[response.length - 1].jam[0];
  //         }
  //       });

  //     let durasi = 7;

  //     // let hasilJam = (shift - durasi + 24) % 24;

  //     let hasilJamAwl = (shift - durasi + 24) % 24;
  //     let hasilJamAkhir = ((shift - durasi + 24) % 24) - 1;
  //     hasilJamAkhir = hasilJamAkhir < 0 ? hasilJamAkhir + 24 : hasilJamAkhir;
  //     if (hasilJamAwl === 0) {
  //       let timeStamp = new Date(tmpAwal).getTime();
  //       let timestampSelanjutnya = timeStamp + 24 * 60 * 60 * 1000; // Menambahkan 1 hari (24 jam dalam milidetik)
  //       tmpAwal = new Date(timestampSelanjutnya).toISOString().split("T")[0];
  //     }

  //     var newtglAwal = new Date(
  //       `${tmpAwal}T${
  //         hasilJamAwl < 10 ? "0" + hasilJamAwl.toString() : hasilJamAwl.toString()
  //       }:00:00.000Z`
  //     ); // Tanggal awal dengan jam 06:00
  //     var newtglAkhir = new Date(
  //       `${tmpAkhir}T${
  //         hasilJamAkhir < 10
  //           ? "0" + hasilJamAkhir.toString()
  //           : hasilJamAkhir.toString()
  //       }:59:00.000Z`
  //     );
  //     let listRuang = [];
  //     Ruangan.find({ idCabang: idCabangWeb }).then((response) => {
  //       response.map((val) => {
  //         listRuang.push(val);
  //       });
  //     });
  //     }

  static getJumlahPatrol(req, res, next) {
    Patrol.countDocuments()
      .then((count) => {
        res.status(200).json({ count });
      })
      .catch(next);
  }

  static async deletePatrol(req, res, next) {
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ message: "ID Laporan tidak ditemukan!" });
      }

      let deletedData;
      try {
        deletedData = await Patrol.findOneAndDelete({ _id: ObjectId(id) });
      } catch (err) {
        return res.status(400).json({ message: "Format ID salah!" });
      }

      if (!deletedData) {
        return res
          .status(404)
          .json({ message: "Data Patrol tidak ditemukan / sudah terhapus" });
      }

      return res.status(200).json({
        message: "Laporan Patroli berhasil dihapus",
        data: deletedData,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
