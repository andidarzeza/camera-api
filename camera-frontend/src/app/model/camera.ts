export class Camera {

    id: string;
    name: string;
    model: string;
    ip: string;
    resolution:number;


    constructor(id:string, name:string, model:string, resolution:number, ip:string) {
        this.id = id;
        this.name = name;
        this.model = model;
        this.ip = ip;
        this.resolution=resolution;
    }

}
