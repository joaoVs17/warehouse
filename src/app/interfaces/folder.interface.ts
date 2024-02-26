export interface FolderInterface {

    _id?: string;
    name: string;
    files: string[];
    folders: string[];
    owner: string;
    metadata: {
        isPersonal: boolean;
        parent: string;
        starred: boolean;
        createdAt?: Date;
    }

}