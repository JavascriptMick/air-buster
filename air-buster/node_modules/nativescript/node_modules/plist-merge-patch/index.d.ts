export interface Reporter {
    log?(msg: string): void;
    warn?(msg: string): void;
}

export interface Patch {
    name: string;
    read(): string;
}

export class PlistSession {
    constructor(console: Reporter);
    public patch(patch: Patch): void;
    public build(): string;
}

export interface IPlistMerger {
    merge(base: any, patch: any): any;
}

export interface ICFBundleURLType {
    CFBundleTypeRole: string;
    CFBundleURLSchemes: string[];
}
