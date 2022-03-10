import {routes} from "../Routes/routes";
import { categorys } from "./data";

export const authRoutes = routes.filter(route => route.authRoute);
export const protectedRoutesWithNav = routes.filter(route => route.protected && route.nav);
export const notProtectedRoutesWithNav = routes.filter(route => !route.protected && route.nav);


export const getFieldError = (errors, field) => {
    return errors?.filter(error => error.key === field)[0]?.message;
}

export function useQuery(location) {
    return new URLSearchParams(location.search);
}
export const getSubCategorys = (category) => {
    let subs = [];
    const allCategs = categorys.map(cat => ([cat, cat.sub?.map(sub => ([sub, sub.subs?.map(subs => subs)].flat(2)))].flat(2))).flat();
    const categ = allCategs.find(c => c.routeName === category);
    if (categ) {
        const categSub = categ.sub?.find(s => s.routeName === category);
        if(categSub) {
            subs.push(...categSub.subs)
        }else if(categ.subs) {
            subs.push(...categ.subs)
        }else{
            categ.sub?.forEach(sub => {
                if(sub.subs) {
                    subs.push(...sub.subs);
                } else {
                    subs.push(sub);
                }
            })
        }
    }

    if (subs.length > 0) {
        return subs.map(categ => categ.routeName);
    }else {
        return category;
    }
}

export const getCategoryName = (category) => {
    const allCategs = categorys.map(cat => ([cat, cat.sub?.map(sub => ([sub, sub.subs?.map(subs => subs)].flat(2)))].flat(2))).flat();
    const categ = allCategs.find(c => c?.routeName === category);
    if (categ) {
        return categ.name;
    }
}