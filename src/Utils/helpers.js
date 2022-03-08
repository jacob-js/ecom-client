import routes from "../Routes/routes";
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
    const categ = categorys.find(c => c.routeName === category || c.sub.find(s => s.routeName === category));
    if (categ) {
        const categSub = categ.sub.find(s => s.routeName === category);
        if(categSub) {
            subs.push(...categSub.subs)
        }else{
            categ.sub.forEach(sub => {
                if(sub.subs) {
                    subs.push(...sub.subs);
                } else {
                    subs.push(sub);
                }
            })
        }
    }
    console.log('categ', category, categ);
    console.log('subs', subs);
    if (subs.length > 0) {
        return subs.map(categ => categ.routeName);
    }else {
        return category;
    }
}

export const provinces = [
    "Bas-Uele",
    "Equateur",
    "Haut-Katanga",
    "Haut-Lomami",
    "Haut-Uele",
    "Ituri",
    "Kasaï",
    "Kasai-Occidental",
    "Kasai-Oriental",
    "Kongo-central",
    "Kinshasa",
    "Kwango",
    "Kwilu",
    "Lomami",
    "Lualaba",
    "Mai-Ndombe",
    "Maniema",
    "Mongala",
    "Nord-Kivu",
    "Nord-Ubangi",
    "Sankuru",
    "Sud-Kivu",
    "Sud-Ubangi",
    "Tanganyika",
    "Tshopo",
    "Tshuapa"
];