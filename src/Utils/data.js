import { GiTravelDress, GiHomeGarage, GiMusicSpell, GiHealing } from 'react-icons/gi';
import { MdOutlineDevices, MdOutlineBikeScooter, MdOutlinePets } from 'react-icons/md';
import { FaBaby } from 'react-icons/fa';

export const countrys = [
    "Congo DRC",
    "Congo Brazza",
    "Rwanda",
    "Burundi",
    "Tanzania",
    "Uganda",
    "Kenya",
    "Sudan",
    "Somalia",
    "Ethiopia"
];

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

export const citys = [
    "Kinshasa",
    "Goma",
    "Lubumbashi",
    "Kisangani",
    "Mbandaka",
    "Kananga",
    "Bukavu",
    "Kikwit",
    "Kindu",
    "butembo",
    "Bunia"
]

export const categorys = [
    {
        name: 'Mode',
        icon: GiTravelDress,
        routeName: 'mode',
        sub: [
            {
                name: 'vêtements',
                routeName: 'vetements',
                subs: [
                    { name: 'Chemises', routeName: 'chemise' },
                    { name: 'T-shirts', routeName: 't-shirt' },
                    { name: 'Pantalons', routeName: 'pantalons' },
                    { name: 'Sous-vêtements', routeName: 'sous-vetement' },
                ]
            },
            {
                name: 'Chaussures',
                routeName: 'chaussures',
                subs: [
                    { name: 'Baskets', routeName: 'basket' },
                    { name: 'Sandales', routeName: 'sandale' },
                    { name: 'Chaussures de soirée', routeName: 'chaussure-de-soiree' },
                    { name: 'Chaussures de détente', routeName: 'chaussures-de-detente' }
                ]
            },
            {
                name: 'Accessoires',
                routeName: 'accessoires',
                subs: [
                    { name: 'Ceintures', routeName: 'ceintures' },
                    { name: 'Chapeau', routeName: 'chapeau' },
                    { name: 'Montres', routeName: 'montres' },
                    { name: 'Lunettes', routeName: 'lunettes' }
                ]
            },
            {
                name: 'Sacs',
                routeName: 'sacs',
                subs: [
                    { name: 'Sacs à dos', routeName: 'sac-a-dos' },
                    { name: 'Sacs à mains', routeName: 'sacs-a-mains' },
                    { name: 'Sacs de voyages', routeName: 'sacs-de-voyages' },
                    { name: 'Valises', routeName: 'valises' },
                ]
            }
        ]
    },
    {
        name: 'Electonique',
        routeName: 'electroniques',
        icon: MdOutlineDevices
    },
    {
        name: 'Velos',
        routeName: 'velos',
        icon: MdOutlineBikeScooter
    },
    {
        name: 'Maison et jardin',
        routeName: 'home-and-garden',
        icon: GiHomeGarage
    },
    {
        name: 'Musique',
        routeName: 'musique',
        icon: GiMusicSpell
    },
    {
        name: 'Santé et beauté',
        routeName: 'health-and-beauty',
        icon: GiHealing
    },
    {
        name: 'Jouets pour bébé',
        routeName: 'toys',
        icon: FaBaby
    },
    {
        name: 'Animaux domestiques',
        routeName: 'pets',
        icon: MdOutlinePets
    }
]