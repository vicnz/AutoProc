export default (path: string, url: string, className: any): string => {
    return `${path === url ? className : ""}`;
};