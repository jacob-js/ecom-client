import routes from "../Routes/routes";

export const authRoutes = routes.filter(route => route.authRoute);
export const protectedRoutesWithNav = routes.filter(route => route.protected && route.nav);
export const notProtectedRoutesWithNav = routes.filter(route => !route.protected && route.nav);


export const getFieldError = (errors, field) => {
    return errors?.filter(error => error.key === field)[0]?.message;
}

export function useQuery(location) {
    return new URLSearchParams(location.search);
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