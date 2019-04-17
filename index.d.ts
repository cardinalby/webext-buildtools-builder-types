/**
 * ILogMethod compatible with winston's ILogMethod
 */
export type ILogMethod = (level: string, message: string, ...meta: any[]) => any;

export interface IBuildAsset<TValue> {
    /**
     * Build asset: object, filename, etc
     */
    getValue(): TValue;
}

// noinspection JSUnusedGlobalSymbols
export interface IDisposableBuildAsset<TValue> extends IBuildAsset<TValue> {
    /**
     * Indicates that asset is used only as intermediate build result for another builder
     * If true, dispose() could be called
     */
    isTemporary(): boolean;
    /**
     * Clean up file system artifacts, empty memory, etc
     * Expected to be called once if isTemporary() === true
     */
    dispose(): Promise<any>;

    isDisposed(): boolean;
}

export interface IBuildAssetsCollection {
    [name: string]: IBuildAsset<any> | IDisposableBuildAsset<any> | undefined;
}

export interface IBuildResult {
    hasWarnings(): boolean;
    getAssets(): IBuildAssetsCollection;
}

/**
 * Interface for different extension builders
 */
export interface ISimpleBuilder<TBuildResult extends IBuildResult> {
    /**
     * Any string which identifies builder
     */
    getTargetName(): string;
    /**
     * Start build process
     */
    build(): Promise<TBuildResult>;
}

// noinspection JSUnusedGlobalSymbols
export type BuildResultOf<TBuilder extends ISimpleBuilder<any>> =
    TBuilder extends ISimpleBuilder<infer TBuildResult> ? TBuildResult : never;
