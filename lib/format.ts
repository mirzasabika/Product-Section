export const currency = (n:number) => new Intl.NumberFormat('en-US', { style:'currency', currency:'USD'}).format(n);
