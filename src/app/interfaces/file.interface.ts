export interface FileInterface {
    _id?: string; 
    name: string;
    key: string;
    url: string;
    folder: string;
    owner: string;
    metadata: {
        mimetype: string;
        parent: string;
        starred: boolean;
        personalFile: boolean;
        size: number;
        createdAt: Date;
    }

}