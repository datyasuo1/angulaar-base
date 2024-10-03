export const exportJSON = (data: any, filename: string) => {
    const sJson = JSON.stringify(data);
    const element = document.createElement('a');
    element.setAttribute(
        'href',
        'data:text/json;charset=UTF-8,' + encodeURIComponent(sJson),
    );
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    // simulate click
    element.click();
    document.body.removeChild(element);
};

export const exportExcel = (
    data: any,
    filename: string,
    ext: string = '.xlsx',
) => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(data);
    link.download = `${filename}${ext}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
