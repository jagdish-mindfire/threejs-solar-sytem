import {mercuryMaterial,venusMaterial,earthMaterial,marsMaterial,moonMaterial,sunMaterial} from '../material/planets'

export const planets = [
    {
      name: "Mercury",
      radius: 0.5,
      distance: 10,
      speed: 0.01,
      material: mercuryMaterial,
      moons: [],
    },
    {
      name: "Venus",
      radius: 0.8,
      distance: 15,
      speed: 0.007,
      material: venusMaterial,
      moons: [],
    },
    {
      name: "Earth",
      radius: 1,
      distance: 20,
      speed: 0.005,
      material: earthMaterial,
      moons: [
        {
          name: "Moon",
          radius: 0.3,
          distance: 3,
          speed: 0.015,
        },
      ],
    },
    {
      name: "Mars",
      radius: 0.7,
      distance: 25,
      speed: 0.003,
      material: marsMaterial,
      moons: [
        {
          name: "Phobos",
          radius: 0.1,
          distance: 2,
          speed: 0.02,
        },
        {
          name: "Deimos",
          radius: 0.2,
          distance: 3,
          speed: 0.015,
          color: 0xffffff,
        },
      ],
    },
  ];