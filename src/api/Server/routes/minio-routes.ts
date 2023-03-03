import File from "@riniya.ts/database/Common/File";
import { v4 } from "uuid";
import AbstractRoutes from "../AbstractRoutes";

export default class StorageRoutes extends AbstractRoutes {
    public register() {
        this.router.get('/storage/:storageType/:accessId', async (req, res) => {
            if (req.params.storageType === undefined)
                return this.error(res, 403)
            
            if (process.env['MINIO_SERVER_ENABLED'] === undefined)
                return res.status(403).json({
                    status: false,
                    error: "MinIO server is currently disabled."
                })
            
            File.findOne({
                _id: req.params.accessId,
                private: false,
                deleted: false
            }).then(document => {
                if (document.fileId === undefined)
                    this.error(res, 404)
                this.minioCLI.bucketExists(req.params.storageType, result => {
                    if (result.stack === undefined) {
                        this.minioCLI.getObject(req.params.storageType, `${document._id}/${document.fileId}.${document.extension}`).then(doc => {
                            doc.on("data", bytes => {
                                res.contentType("image/png")
                                    .status(200)
                                    .pipe(bytes)                                })
                        }).catch(err => {
                            res.status(500).json({
                                status: false,
                                error: "The file is not found."
                            })
                        })
                    } else {
                        res.status(404).json({
                            status: false,
                            error: "The specified bucket does not exist in the server."
                        })
                    }
                })
            })

            
        })

        this.router.put('/storage/:storageType/upload', async (req, res) => {
            if (req.params.storageType === undefined)
                return this.error(res, 403)
            
            this.minioCLI.bucketExists(req.params.storageType, result => {
                if (result.stack === undefined) {
                    const uuid: string = v4()

                    new File({
                        guildId: req.body.guildId,
                        userId: req.body.userId,
                        fileId: uuid,
                        extension: req.body.ext,
                        private: req.body.private,
                        registeredAt: Date.now()
                    }).save()

                    // TODO: Add object to S3 Server
                } else {
                    res.status(404).json({
                        status: false,
                        error: "The specified bucket does not exist in the server."
                    })
                }
            })
        })

        this.router.delete('/storage/:storageType/:fileId/delete', async (req, res) => {
            if (req.params.storageType === undefined || req.params.fileId === undefined)
                return this.error(res, 403)
            this.minioCLI.bucketExists(req.params.storageType, (result) => {
                if (result.stack === undefined) {
                    File.findOne({
                        _id: req.params.fileId,
                        deleted: false
                    }).then(async (document) => {
                        if (document.fileId !== undefined) {
                            File.updateOne({
                                _id: req.params.fileId,
                            }, {
                                deleted: true
                            }).then(final => {
                                res.status(200).json({
                                    status: true,
                                    data: final
                                })
                            })   
                        } else {
                            res.status(404).json({
                                status: false,
                                error: "ObjectId not found."
                            })
                        }
                    })
                } else {
                    res.status(404).json({
                        status: false,
                        error: "The specified bucket does not exist in the server."
                    })
                }
            })
        })
    }
}