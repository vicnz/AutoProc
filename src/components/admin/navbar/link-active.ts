const isActive = (path: string, url: string, className: any): string => {
    return `${path === url ? className : ""}`;
};

export default isActive;