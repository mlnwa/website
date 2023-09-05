class PageInfo<T> {
    private pageIndex: number
    private pageSize : number
    private size     : number
    private startRow : number
    private endRow   : number
    private pages    : number
    private prePage  : number
    private nextPage : number

    private isFirstPage: boolean
    private isLastPage : boolean
    private hasPrePage : boolean
    private hasNextPage: boolean

    private navigatePages     : number
    private navigatePageIndexs: number[]
    private navigateFirstPage : number
    private navigateNextPage  : number

    private list:T[]

    public getPageIndex(): number {
        return this.pageIndex;
    }

    public setPageIndex(pageIndex: number): void {
        this.pageIndex = pageIndex;
    }

    public getPageSize(): number {
        return this.pageSize;
    }

    public setPageSize(pageSize: number): void {
        this.pageSize = pageSize;
    }

    public getSize(): number {
        return this.size;
    }

    public setSize(size: number): void {
        this.size = size;
    }

    public getStartRow(): number {
        return this.startRow;
    }

    public setStartRow(startRow: number): void {
        this.startRow = startRow;
    }

    public getEndRow(): number {
        return this.endRow;
    }

    public setEndRow(endRow: number): void {
        this.endRow = endRow;
    }

    public getPages(): number {
        return this.pages;
    }

    public setPages(pages: number): void {
        this.pages = pages;
    }

    public getPrePage(): number {
        return this.prePage;
    }

    public setPrePage(prePage: number): void {
        this.prePage = prePage;
    }

    public getNextPage(): number {
        return this.nextPage;
    }

    public setNextPage(nextPage: number): void {
        this.nextPage = nextPage;
    }

    public isIsFirstPage(): boolean {
        return this.isFirstPage;
    }

    public setIsFirstPage(isFirstPage: boolean): void {
        this.isFirstPage = isFirstPage;
    }

    public isIsLastPage(): boolean {
        return this.isLastPage;
    }

    public setIsLastPage(isLastPage: boolean): void {
        this.isLastPage = isLastPage;
    }

    public isHasPrePage(): boolean {
        return this.hasPrePage;
    }

    public setHasPrePage(hasPrePage: boolean): void {
        this.hasPrePage = hasPrePage;
    }

    public isHasNextPage(): boolean {
        return this.hasNextPage;
    }

    public setHasNextPage(hasNextPage: boolean): void {
        this.hasNextPage = hasNextPage;
    }

    public getNavigatePages(): number {
        return this.navigatePages;
    }

    public setNavigatePages(navigatePages: number): void {
        this.navigatePages = navigatePages;
    }

    public getNavigatePageIndexs(): number[] {
        return this.navigatePageIndexs;
    }

    public setNavigatePageIndexs(navigatePageIndexs: number[]): void {
        this.navigatePageIndexs = navigatePageIndexs;
    }

    public getNavigateFirstPage(): number {
        return this.navigateFirstPage;
    }

    public setNavigateFirstPage(navigateFirstPage: number): void {
        this.navigateFirstPage = navigateFirstPage;
    }

    public getNavigateNextPage(): number {
        return this.navigateNextPage;
    }

    public setNavigateNextPage(navigateNextPage: number): void {
        this.navigateNextPage = navigateNextPage;
    }

    public getList(): T[] {
        return this.list;
    }

    public setList(list: T[]): void {
        this.list = list;
    }

}

export default PageInfo