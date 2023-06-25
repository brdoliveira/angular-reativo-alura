import { ImageLinks } from "./image-links.model";

export interface VolumeInfo {
    title:               string;
    authors:             string[];
    publisher:           string;
    publishedDate:       string;
    description:         string;
    pageCount:           number;
    printType:           string;
    mainCategory:        string;
    categories:          string[];
    averageRating:       number;
    ratingsCount:        number;
    contentVersion:      string;
    imageLinks:          ImageLinks;
    language:            string;
    infoLink:            string;
    canonicalVolumeLink: string;
}
