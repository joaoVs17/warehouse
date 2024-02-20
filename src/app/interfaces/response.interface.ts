import { FileInterface } from "./file.interface"
import { FolderInterface } from "./folder.interface"
import { UserInterface } from "./user.interface"

export interface ResponseInterface {

    response: FileInterface | FolderInterface | UserInterface;

    msg: string;

}