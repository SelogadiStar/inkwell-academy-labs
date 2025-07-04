import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import confetti from "canvas-confetti";

// Quiz questions based on science facts
const SCIENCE_QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "How many neurons does the human brain have?",
    options: [
      "1 million",
      "86 million",
      "86 billion",
      "100 billion"
    ],
    correctAnswer: 2, // Index of correct answer (86 billion)
    explanation: "The human brain has about 86 billion neurons, each forming connections with up to 10,000 other neurons. These neurons communicate via electrical and chemical signals across trillions of synaptic connections, making the brain the most complex organ in the human body. For comparison, a fruit fly has about 100,000 neurons and a mouse has around 70 million.",
    category: "Biology",
    difficulty: "medium",
    points: 10
  },
  {
    id: 101,
    question: "What causes thermal expansion?",
    options: [
      "Decreasing pressure",
      "Increasing heat",
      "Magnetic fields",
      "Electrical currents"
    ],
    correctAnswer: 1, // Index of correct answer (Increasing heat)
    explanation: "Thermal expansion is when matter expands as it heats up. When a substance is heated, its molecules gain energy and vibrate more vigorously, increasing the average distance between them. This molecular behavior explains why we see expansion in everyday life, such as in thermometers, bridge expansion joints, and why railroad tracks have small gaps between sections to prevent buckling on hot days.",
    category: "Physics",
    difficulty: "easy",
    points: 5
  },
  {
    id: 102,
    question: "What scientific principle explains how rockets work?",
    options: [
      "Bernoulli's principle",
      "Newton's First Law",
      "Newton's Third Law",
      "Conservation of Energy"
    ],
    correctAnswer: 2, // Index of correct answer (Newton's Third Law)
    explanation: "Rockets work using Newton's Third Law: for every action, there's an equal and opposite reaction. The rocket engines burn fuel to create hot, expanding gases that are expelled downward at high velocity (the action). This creates an equal force in the opposite direction, pushing the rocket upward (the reaction). This principle works even in the vacuum of space, which is why rockets don't need air to push against in order to move forward.",
    category: "Physics",
    difficulty: "medium",
    points: 10
  },
  {
    id: 103,
    question: "Which gases are primarily responsible for the greenhouse effect?",
    options: [
      "Oxygen and nitrogen",
      "Helium and argon",
      "Carbon dioxide and methane",
      "Hydrogen and ozone"
    ],
    correctAnswer: 2, // Index of correct answer (Carbon dioxide and methane)
    explanation: "The greenhouse effect occurs when gases like CO₂ and methane trap heat in Earth's atmosphere. These greenhouse gases allow sunlight to pass through and warm the Earth's surface, but they prevent some of the resulting heat from escaping back into space. While this natural effect keeps our planet habitable (without it, Earth would be about 33°C colder), human activities have increased the concentration of these gases, enhancing the greenhouse effect and leading to climate change. Other important greenhouse gases include water vapor, nitrous oxide, and fluorinated gases.",
    category: "Environmental Science",
    difficulty: "medium",
    points: 10
  },
  {
    id: 110,
    question: "What determines how much kinetic energy an object has?",
    options: [
      "Its color and temperature",
      "Its mass and velocity",
      "Its volume and density",
      "Its shape and size"
    ],
    correctAnswer: 1, // Index of correct answer (Its mass and velocity)
    explanation: "Kinetic energy is the energy of motion and depends on both mass and velocity. The formula is KE = 1/2 × mass × velocity². Notice that velocity is squared in this equation, which means that doubling an object's speed increases its kinetic energy by four times! This explains why higher speeds are so much more dangerous in car accidents - a vehicle traveling at 60 km/h has four times the kinetic energy of the same vehicle at 30 km/h, requiring four times the distance to stop.",
    category: "Physics",
    difficulty: "medium",
    points: 10
  },
  {
    id: 127,
    question: "What are the main products of photosynthesis?",
    options: [
      "Oxygen and carbon dioxide",
      "Water and minerals",
      "Glucose and oxygen",
      "Carbon dioxide and water"
    ],
    correctAnswer: 2, // Index of correct answer (Glucose and oxygen)
    explanation: "Photosynthesis uses chlorophyll to capture light energy, which converts water and carbon dioxide into glucose (sugar) and oxygen. The complete equation is: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ (glucose) + 6O₂. This process is fundamental to life on Earth as it produces the oxygen we breathe and forms the base of most food chains. Plants store the glucose as starch or use it for energy, while releasing oxygen as a byproduct, which benefits animals and humans who need oxygen to survive.",
    category: "Biology",
    difficulty: "easy",
    points: 5
  },
  {
    id: 135,
    question: "What is the key difference between prokaryotic and eukaryotic cells?",
    options: [
      "Size - prokaryotes are always larger",
      "Presence of a defined nucleus in eukaryotes",
      "Prokaryotes have a cell wall, eukaryotes don't",
      "Eukaryotes cannot be single-celled organisms"
    ],
    correctAnswer: 1, // Index of correct answer (Presence of a defined nucleus in eukaryotes)
    explanation: "Prokaryotic cells (like bacteria) lack a true nucleus and membrane-bound organelles, while eukaryotic cells (like those in plants, animals, fungi, and protists) have a defined nucleus containing genetic material. Prokaryotes are typically much smaller (0.1-5 micrometers) than eukaryotes (10-100 micrometers) and have simpler structures. While most prokaryotes do have cell walls, many eukaryotes do too (like plant cells). Both types can be single-celled, though all multicellular organisms are eukaryotes.",
    category: "Biology",
    difficulty: "medium",
    points: 10
  },
  {
    id: 140,
    question: "How do vaccines help protect against disease?",
    options: [
      "By killing all bacteria in the body",
      "By providing pain relief when infected",
      "By training the immune system to recognize specific pathogens",
      "By providing antibiotics to fight infections"
    ],
    correctAnswer: 2, // Index of correct answer (By training the immune system to recognize specific pathogens)
    explanation: "Vaccines work by training your immune system to recognize and fight specific pathogens without causing the actual disease. They contain weakened, dead, or parts of the disease-causing organism (antigens), which trigger your body to produce antibodies and memory cells. If you're later exposed to the real pathogen, your immune system can quickly recognize it and mount a strong defense, preventing infection or reducing its severity. This creates 'immunological memory,' which can last for years or even a lifetime, depending on the vaccine.",
    category: "Biology",
    difficulty: "medium",
    points: 10
  },
  {
    id: 121,
    question: "Why do like magnetic poles repel each other?",
    options: [
      "Due to gravitational attraction",
      "Because of their magnetic fields interacting",
      "Due to differences in temperature",
      "Because of chemical reactions between them"
    ],
    correctAnswer: 1, // Index of correct answer (Because of their magnetic fields interacting)
    explanation: "Magnets attract or repel because of their magnetic fields. Like poles (north-north or south-south) repel each other, while opposite poles (north-south) attract. This happens because magnetic fields have a direction, and when two magnets are brought together, their fields either align in opposing directions (like poles) causing repulsion, or in the same direction (opposite poles) causing attraction. This fundamental electromagnetic force is similar to electric charges, where like charges repel and opposite charges attract. Magnetic fields can be visualized as invisible lines of force that emerge from the north pole and enter the south pole.",
    category: "Physics", 
    difficulty: "medium",
    points: 10
  },
  {
    id: 141,
    question: "What is the main characteristic of a catalyst in a chemical reaction?",
    options: [
      "It gets used up during the reaction",
      "It increases the reaction rate without being consumed",
      "It decreases the amount of product formed",
      "It adds heat energy to the reaction"
    ],
    correctAnswer: 1, // Index of correct answer (It increases the reaction rate without being consumed)
    explanation: "A catalyst is a substance that increases the rate of a chemical reaction without being consumed in the process. It works by providing an alternative reaction pathway with a lower activation energy, allowing more molecules to react at a given temperature. Catalysts are crucial in both industrial processes and biological systems. In your body, enzymes are biological catalysts that facilitate reactions like digestion. In industry, catalysts make processes like petroleum refining and fertilizer production economically viable. While catalysts participate in reactions, they are regenerated at the end, so they can be used over and over again.",
    category: "Chemistry",
    difficulty: "medium",
    points: 10
  },
  {
    id: 145,
    question: "What is the purpose of a control in a scientific experiment?",
    options: [
      "To make the experiment more interesting",
      "To provide a baseline for comparison",
      "To increase the sample size",
      "To demonstrate the researcher's knowledge"
    ],
    correctAnswer: 1, // Index of correct answer (To provide a baseline for comparison)
    explanation: "A control in an experiment is the standard against which experimental observations are compared. It isolates the effect of the independent variable by keeping all other variables the same. For example, if testing a new fertilizer on plants, you would have one group of plants receiving the fertilizer (experimental group) and another identical group not receiving it (control group). Without this control, you couldn't determine if changes in plant growth were due to the fertilizer or other factors like sunlight or soil quality. Controls are fundamental to the scientific method because they help eliminate alternative explanations and establish causation rather than just correlation. In medicine, placebo controls are used to account for psychological effects in clinical trials.",
    category: "Scientific Method",
    difficulty: "medium",
    points: 10
  },
  {
    id: 155,
    question: "Why does the sky appear blue during the day?",
    options: [
      "Because the ocean reflects its color to the sky",
      "Because blue light is scattered more by air molecules",
      "Because the atmosphere contains blue gases",
      "Because the sun emits primarily blue light"
    ],
    correctAnswer: 1, // Index of correct answer (Because blue light is scattered more by air molecules)
    explanation: "The sky appears blue because of a phenomenon called Rayleigh scattering. As sunlight travels through the atmosphere, air molecules scatter the light in all directions. Blue light has shorter wavelengths (about 450 nanometers) and is scattered more efficiently than other colors like red (about 700 nanometers). This scattered blue light reaches our eyes from all directions in the sky. During sunrise and sunset, sunlight must travel through more atmosphere, causing more blue light to scatter away, leaving mostly red and orange wavelengths visible - which is why sunsets appear reddish-orange.",
    category: "Physics",
    difficulty: "medium",
    points: 10
  },
  {
    id: 166,
    question: "Which of the following is NOT one of Newton's three laws of motion?",
    options: [
      "An object in motion stays in motion unless acted upon by a force",
      "Force equals mass times acceleration",
      "For every action, there is an equal and opposite reaction",
      "Objects with greater mass fall faster than objects with less mass"
    ],
    correctAnswer: 3, // Index of correct answer (Objects with greater mass fall faster than objects with less mass)
    explanation: "Newton's three laws are: 1) Law of Inertia: Objects maintain their state of motion unless acted upon by a force. This is why we wear seatbelts - our bodies would continue moving forward during a sudden stop. 2) Law of Force and Acceleration (F=ma): Force equals mass times acceleration. This explains why it takes more force to push a heavy object than a light one. 3) Law of Action and Reaction: For every action, there is an equal and opposite reaction. This is how rockets work - they push exhaust gases backward, and the gases push the rocket forward with equal force. The statement that heavier objects fall faster than lighter ones was disproven by Galileo long before Newton, when he demonstrated that all objects fall at the same rate in vacuum.",
    category: "Physics", 
    difficulty: "hard",
    points: 15
  },
  {
    id: 215,
    question: "What are the three basic particles that make up an atom?",
    options: [
      "Protons, neutrons, and molecules",
      "Protons, electrons, and isotopes",
      "Neutrons, isotopes, and electrons",
      "Protons, neutrons, and electrons"
    ],
    correctAnswer: 3, // Index of correct answer (Protons, neutrons, and electrons)
    explanation: "An atom is made of three basic particles: protons (positively charged), neutrons (no charge), and electrons (negatively charged). Protons and neutrons form the nucleus at the center, while electrons orbit around it in electron shells. The number of protons (atomic number) determines which element it is - for example, hydrogen has 1 proton, while oxygen has 8. In a neutral atom, the number of electrons equals the number of protons. Although we often visualize electrons orbiting like planets, they actually exist in probability clouds called orbitals, where we can only predict the likelihood of finding them in a certain region.",
    category: "Chemistry",
    difficulty: "easy",
    points: 5
  },
  {
    id: 370,
    question: "What structure does DNA form?",
    options: [
      "Single helix",
      "Double helix",
      "Triple helix",
      "Square structure"
    ],
    correctAnswer: 1, // Index of correct answer (Double helix)
    explanation: "DNA forms a double helix structure consisting of two strands that wind around each other like a twisted ladder, with nucleotide base pairs forming the rungs. These base pairs follow specific pairing rules: adenine (A) always pairs with thymine (T), and cytosine (C) always pairs with guanine (G). This complementary structure allows DNA to replicate itself accurately, as each strand serves as a template for creating a new strand. The sequence of these base pairs forms the genetic code that carries instructions for building and maintaining an organism. The human genome contains approximately 3 billion base pairs, which would stretch about 2 meters if unwound and laid out in a straight line.",
    category: "Biology",
    difficulty: "medium",
    points: 10
  },
  {
    id: 375,
    question: "Which of the following best describes an insulator?",
    options: [
      "A material that easily allows electrical flow",
      "A material that blocks or greatly reduces electrical flow",
      "A material that generates electricity",
      "A material that stores electrical charge"
    ],
    correctAnswer: 1, // Index of correct answer (A material that blocks or greatly reduces electrical flow)
    explanation: "An insulator blocks or greatly reduces electrical flow. Materials like rubber, glass, plastic, and wood are good insulators because their electrons are tightly bound to their atoms and not free to move. In contrast, conductors like metals have loosely bound electrons that can easily move, allowing electricity to flow. Insulators are crucial for safety in electrical systems - they coat wires in electrical cables, form the handles of tools used by electricians, and prevent dangerous current from flowing where it shouldn't. Some materials that are insulators for electricity can be conductors for heat (like diamond), showing that these properties aren't always linked.",
    category: "Physics",
    difficulty: "easy",
    points: 5
  },
  {
    id: 386,
    question: "What is the main difference between a permanent magnet and an electromagnet?",
    options: [
      "Permanent magnets are stronger than electromagnets",
      "Electromagnets can be turned on and off",
      "Permanent magnets can attract more types of metals",
      "Electromagnets don't need a power source"
    ],
    correctAnswer: 1, // Index of correct answer (Electromagnets can be turned on and off)
    explanation: "An electromagnet is a type of magnet where the magnetic field is produced by an electric current. Unlike permanent magnets, electromagnets can be turned on and off by controlling the current. They typically consist of a coil of wire wrapped around an iron core. When electricity flows through the wire, it creates a magnetic field, and the iron core becomes magnetized. The strength of an electromagnet can be increased by adding more turns to the coil, increasing the current, or using a core made of a material with high magnetic permeability. Electromagnets are used in many everyday devices like doorbells, loudspeakers, MRI machines, electric motors, and scrap metal sorting in recycling facilities.",
    category: "Physics",
    difficulty: "medium",
    points: 10
  },
  {
    id: 389,
    question: "What is the main difference between asteroids and comets?",
    options: [
      "Asteroids are larger than comets",
      "Comets are made of metal while asteroids are made of rock",
      "Asteroids are rocky while comets are mostly ice and dust",
      "Comets orbit the Sun while asteroids don't"
    ],
    correctAnswer: 2, // Index of correct answer (Asteroids are rocky while comets are mostly ice and dust)
    explanation: "Asteroids are rocky objects that orbit the Sun, while comets are icy bodies that develop a 'tail' when near the Sun. Comets are sometimes called 'dirty snowballs' because they contain ice, dust, and small rocky particles. When a comet approaches the Sun, the heat causes its ice to vaporize, creating a glowing coma (cloud) around its nucleus and often forming a spectacular tail that can stretch millions of kilometers. Most asteroids are found in the asteroid belt between Mars and Jupiter, while comets typically originate from either the Kuiper Belt (beyond Neptune) or the more distant Oort Cloud at the edge of our solar system. Both asteroids and comets are remnants from the early formation of our solar system about 4.6 billion years ago.",
    category: "Astronomy",
    difficulty: "medium",
    points: 10
  },
  {
    id: 401,
    question: "What is an alloy?",
    options: [
      "A pure metal extracted from ore",
      "A mixture of a metal with other elements",
      "A non-metallic material used in construction",
      "A metal that has been heated and cooled"
    ],
    correctAnswer: 1, // Index of correct answer (A mixture of a metal with other elements)
    explanation: "An alloy is a mixture of a metal with other elements, usually other metals or carbon. Alloys are designed to improve properties like strength, hardness, and corrosion resistance. Common examples include steel (iron + carbon), brass (copper + zinc), bronze (copper + tin), and stainless steel (iron + chromium + nickel). Pure metals often have limitations - they might be too soft, corrode easily, or be too brittle. By creating alloys, we can enhance their properties for specific applications. For instance, adding small amounts of carbon to iron creates steel, which is much stronger than pure iron. The South African mining industry contributes significantly to the global production of metals used in alloys, including platinum, chromium, manganese, and gold.",
    category: "Materials Science",
    difficulty: "medium",
    points: 10
  },
  {
    id: 2,
    question: "What is the Vredefort Dome?",
    options: [
      "A volcanic crater",
      "The world's largest impact crater",
      "A mountain in Cape Town",
      "An ancient Roman building"
    ],
    correctAnswer: 1, // Index of correct answer (world's largest impact crater)
    explanation: "South Africa's Vredefort Dome is the world's largest and oldest verified impact crater, created when an asteroid struck Earth around 2 billion years ago.",
    category: "Geology",
    difficulty: "medium",
    points: 10
  },
  {
    id: 3,
    question: "Which part of a plant captures light energy for photosynthesis?",
    options: [
      "Chlorophyll",
      "Roots",
      "Stem",
      "Petals"
    ],
    correctAnswer: 0, // Index of correct answer (Chlorophyll)
    explanation: "Chlorophyll is the green pigment in plants that captures light energy, which is then used to convert water and carbon dioxide into glucose.",
    category: "Biology",
    difficulty: "easy",
    points: 5
  },
  {
    id: 4,
    question: "What is the chemical symbol for gold?",
    options: [
      "Go",
      "Gd",
      "Gl",
      "Au"
    ],
    correctAnswer: 3, // Index of correct answer (Au)
    explanation: "The chemical symbol for gold is Au, which comes from the Latin word 'aurum'.",
    category: "Chemistry",
    difficulty: "easy",
    points: 5
  },
  {
    id: 5,
    question: "Why does water boil at a lower temperature on mountains?",
    options: [
      "The water is purer at high altitudes",
      "Lower atmospheric pressure",
      "Higher gravitational pull",
      "Lower humidity levels"
    ],
    correctAnswer: 1, // Index of correct answer (Lower atmospheric pressure)
    explanation: "Water boils at lower temperatures on mountains due to decreased atmospheric pressure. At the top of Mount Everest, water boils at approximately 71°C instead of 100°C at sea level.",
    category: "Physics",
    difficulty: "medium",
    points: 10
  },
  {
    id: 6,
    question: "How does sunscreen protect your skin?",
    options: [
      "By cooling the skin's surface",
      "By absorbing, reflecting, and scattering UV rays",
      "By creating a waterproof barrier",
      "By darkening the skin to block light"
    ],
    correctAnswer: 1, // Index of correct answer (By absorbing, reflecting, and scattering UV rays)
    explanation: "Sunscreen works by containing organic compounds that absorb UV radiation and inorganic particles that reflect, scatter, and absorb UV rays, preventing them from reaching and damaging your skin cells.",
    category: "Chemistry",
    difficulty: "medium",
    points: 10
  },
  {
    id: 7,
    question: "Why do metals conduct electricity so well?",
    options: [
      "They have a high melting point",
      "They are usually solid at room temperature",
      "They have free electrons that can move easily",
      "They have a shiny appearance"
    ],
    correctAnswer: 2, // Index of correct answer (They have free electrons that can move easily)
    explanation: "Metals conduct electricity because they have free electrons in their atomic structure that can move easily throughout the material when voltage is applied, creating an electric current.",
    category: "Physics",
    difficulty: "medium",
    points: 10
  },
  {
    id: 8,
    question: "What is an exothermic reaction?",
    options: [
      "A reaction that absorbs energy",
      "A reaction that releases energy",
      "A reaction that doesn't change energy",
      "A reaction that requires a catalyst"
    ],
    correctAnswer: 1, // Index of correct answer (A reaction that releases energy)
    explanation: "An exothermic reaction releases energy to its surroundings, usually in the form of heat. Examples include combustion, neutralization, and most oxidation reactions.",
    category: "Chemistry",
    difficulty: "medium",
    points: 10
  },
  {
    id: 9,
    question: "How do fish breathe underwater?",
    options: [
      "They don't need oxygen",
      "They have small lungs that store air",
      "They use gills to extract oxygen from water",
      "They surface regularly to breathe air"
    ],
    correctAnswer: 2, // Index of correct answer (They use gills to extract oxygen from water)
    explanation: "Fish extract oxygen from water using gills. As water passes over the thin gill filaments, oxygen diffuses from the water into the blood, while carbon dioxide diffuses from the blood into the water.",
    category: "Biology",
    difficulty: "easy",
    points: 5
  },
  {
    id: 10,
    question: "What causes the Doppler effect?",
    options: [
      "Changes in light intensity",
      "Relative motion between source and observer",
      "Changes in atmospheric pressure",
      "The curvature of the Earth"
    ],
    correctAnswer: 1, // Index of correct answer (Relative motion between source and observer)
    explanation: "The Doppler effect is the change in frequency of a wave when the source or observer is moving. It explains why a siren sounds higher in pitch as it approaches you and lower as it moves away.",
    category: "Physics",
    difficulty: "hard",
    points: 15
  },
  {
    id: 11,
    question: "What is the law of conservation of mass?",
    options: [
      "Mass can be created but not destroyed",
      "Mass can be destroyed but not created",
      "Matter cannot be created or destroyed in a closed system",
      "Matter constantly changes its mass"
    ],
    correctAnswer: 2, // Index of correct answer (Matter cannot be created or destroyed in a closed system)
    explanation: "The law of conservation of mass states that matter cannot be created or destroyed in a closed system. The total mass of reactants equals the total mass of products in a chemical reaction.",
    category: "Chemistry",
    difficulty: "medium",
    points: 10
  },
  {
    id: 12,
    question: "Why do leaves change color in autumn?",
    options: [
      "They are painted by nature spirits",
      "Chlorophyll breaks down revealing other pigments",
      "They absorb different minerals from the soil",
      "The sun bleaches them different colors"
    ],
    correctAnswer: 1, // Index of correct answer (Chlorophyll breaks down revealing other pigments)
    explanation: "Leaves change color in autumn when chlorophyll (green pigment) breaks down, revealing other pigments like carotenoids (yellow/orange) and anthocyanins (red) that were present but masked.",
    category: "Botany",
    difficulty: "medium",
    points: 10
  },
  {
    id: 13,
    question: "What are isotopes?",
    options: [
      "Different chemical elements with similar properties",
      "Variants of an element with different numbers of neutrons",
      "Subatomic particles found in the nucleus",
      "Molecules with identical chemical formulas"
    ],
    correctAnswer: 1, // Index of correct answer (Variants of an element with different numbers of neutrons)
    explanation: "Isotopes are variants of a chemical element with the same number of protons but different numbers of neutrons. This gives them identical chemical properties but different atomic masses.",
    category: "Chemistry",
    difficulty: "hard",
    points: 15
  },
  {
    id: 14,
    question: "How do microwaves heat food?",
    options: [
      "By producing infrared radiation",
      "By making food molecules vibrate rapidly",
      "By burning the surface of the food",
      "By chemical reactions with the food"
    ],
    correctAnswer: 1, // Index of correct answer (By making food molecules vibrate rapidly)
    explanation: "Microwaves heat food by producing electromagnetic waves that cause water, fat, and sugar molecules to vibrate rapidly. This friction between molecules generates heat that cooks the food.",
    category: "Physics",
    difficulty: "medium",
    points: 10
  },
  {
    id: 15,
    question: "What causes acid rain?",
    options: [
      "Naturally acidic clouds",
      "Ocean evaporation",
      "Air pollutants reacting with water in the atmosphere",
      "Global warming"
    ],
    correctAnswer: 2, // Index of correct answer (Air pollutants reacting with water in the atmosphere)
    explanation: "Acid rain forms when pollutants like sulfur dioxide and nitrogen oxides react with water and oxygen in the atmosphere to create sulfuric and nitric acids that fall as precipitation.",
    category: "Environmental Science",
    difficulty: "medium",
    points: 10
  },
  {
    id: 16,
    question: "What are enzymes in the human body?",
    options: [
      "Types of hormones that regulate growth",
      "Biological catalysts that speed up reactions",
      "White blood cells that fight infection",
      "Minerals needed for bone development"
    ],
    correctAnswer: 1, // Index of correct answer (Biological catalysts that speed up reactions)
    explanation: "Enzymes are biological catalysts that speed up chemical reactions in the body without being used up themselves. They help with digestion, energy production, and thousands of other processes.",
    category: "Biology",
    difficulty: "medium",
    points: 10
  },
  {
    id: 17,
    question: "Which South African biome is characterized by summer rainfall and large grazing mammals?",
    options: [
      "Fynbos",
      "Savanna",
      "Karoo",
      "Nama-Karoo"
    ],
    correctAnswer: 1, // Index of correct answer (Savanna)
    explanation: "The Savanna biome in South Africa is characterized by a grassy landscape with scattered trees, summer rainfall, and large grazing mammals like zebras and wildebeest.",
    category: "Ecology",
    difficulty: "hard",
    points: 15
  },
  {
    id: 18,
    question: "What is absolute zero?",
    options: [
      "0°C",
      "0°F",
      "-273.15°C",
      "The temperature of space"
    ],
    correctAnswer: 2, // Index of correct answer (-273.15°C)
    explanation: "Absolute zero (-273.15°C or -459.67°F) is the lowest possible temperature where particles have minimal motion. It's physically impossible to reach this temperature.",
    category: "Physics",
    difficulty: "medium",
    points: 10
  },
  {
    id: 19,
    question: "How do rainbows form?",
    options: [
      "From dust particles in the air",
      "From light reflecting and refracting in water droplets",
      "From chemical reactions in clouds",
      "From the Earth's magnetic field"
    ],
    correctAnswer: 1, // Index of correct answer (From light reflecting and refracting in water droplets)
    explanation: "Rainbows form when sunlight enters water droplets in the air, reflects off the back of the droplets, and exits at a different angle, separating into different wavelengths (colors) we can see.",
    category: "Meteorology",
    difficulty: "medium",
    points: 10
  },
  {
    id: 20,
    question: "Why does popcorn pop?",
    options: [
      "Chemical additives in the kernels",
      "Steam pressure from water inside the kernels",
      "Oil causing mini-explosions",
      "Kernels contain tiny air pockets"
    ],
    correctAnswer: 1, // Index of correct answer (Steam pressure from water inside the kernels)
    explanation: "Popcorn pops because each kernel contains a small amount of water. When heated, the water turns to steam, creating pressure inside until the kernel explodes and the starch inside expands.",
    category: "Food Science",
    difficulty: "easy",
    points: 5
  }
];

interface ScienceBuddyGameProps {
  onClose?: () => void;
  onScoreUpdate?: (score: number) => void;
}

export default function ScienceBuddyGame({ onClose, onScoreUpdate }: ScienceBuddyGameProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15); // 15 seconds per question
  const [streak, setStreak] = useState(0);
  const [highestStreak, setHighestStreak] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState([...SCIENCE_QUIZ_QUESTIONS]);
  const [difficulty, setDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [questionsPerGame, setQuestionsPerGame] = useState(10);
  const [showStartScreen, setShowStartScreen] = useState(true);
  const { toast } = useToast();

  // Countdown timer
  useEffect(() => {
    if (gameOver || isAnswered) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion, isAnswered, gameOver]);

  // Reset timer when moving to next question
  useEffect(() => {
    if (!showStartScreen) {
      setTimeLeft(15);
    }
  }, [currentQuestion, showStartScreen]);

  // Filter questions based on difficulty
  const filterQuestionsByDifficulty = (difficulty: 'all' | 'easy' | 'medium' | 'hard') => {
    if (difficulty === 'all') {
      return [...SCIENCE_QUIZ_QUESTIONS];
    }
    return SCIENCE_QUIZ_QUESTIONS.filter(q => q.difficulty === difficulty);
  };

  // Start the game with selected settings
  const startGame = (selectedDifficulty: 'all' | 'easy' | 'medium' | 'hard', questionCount: number) => {
    const filteredQuestions = filterQuestionsByDifficulty(selectedDifficulty);
    const shuffledQuestions = [...filteredQuestions].sort(() => Math.random() - 0.5);
    const limitedQuestions = shuffledQuestions.slice(0, questionCount);
    
    setDifficulty(selectedDifficulty);
    setQuestionsPerGame(questionCount);
    setQuizQuestions(limitedQuestions);
    setCurrentQuestion(0);
    setScore(0);
    setStreak(0);
    setHighestStreak(0);
    setShowStartScreen(false);
    setTimeLeft(15);
    
    toast({
      title: "Game Started!",
      description: `${questionCount} questions at ${selectedDifficulty} difficulty. Good luck!`,
    });
  };

  const handleTimeout = () => {
    setIsAnswered(true);
    setStreak(0);
    
    toast({
      title: "Time's up!",
      description: "You ran out of time. Try to answer faster next time!",
      variant: "destructive",
    });
  };

  const handleAnswer = (answerIndex: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    
    const currentQuiz = quizQuestions[currentQuestion];
    
    if (answerIndex === currentQuiz.correctAnswer) {
      // Correct answer
      const newStreak = streak + 1;
      setStreak(newStreak);
      
      // Update highest streak if needed
      if (newStreak > highestStreak) {
        setHighestStreak(newStreak);
      }
      
      // Calculate points (base points + streak bonus)
      const streakBonus = Math.min(newStreak - 1, 5); // Cap streak bonus at 5
      const earnedPoints = currentQuiz.points + (streakBonus * 2);
      
      setScore(prev => prev + earnedPoints);
      
      // Show success message with points
      toast({
        title: `Correct! +${earnedPoints} points`,
        description: newStreak > 1 ? `${newStreak}x streak bonus!` : "Great job!",
      });
      
      // Trigger confetti for correct answers
      if (typeof window !== 'undefined') {
        const confettiConfig = {
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        };
        try {
          confetti(confettiConfig);
        } catch (error) {
          console.error("Confetti error:", error);
        }
      }
    } else {
      // Incorrect answer
      setStreak(0);
      toast({
        title: "Incorrect",
        description: quizQuestions[currentQuestion].explanation,
        variant: "destructive",
      });
    }
    
    if (onScoreUpdate) {
      onScoreUpdate(score);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setGameOver(true);
      
      // Game over feedback based on score
      const maxScore = quizQuestions.reduce((total, q) => total + q.points, 0);
      const percentage = (score / maxScore) * 100;
      
      let title = "Quiz Completed!";
      let message = "";
      
      if (percentage >= 90) {
        message = "Excellent! You're a science genius!";
      } else if (percentage >= 70) {
        message = "Great job! You really know your science facts.";
      } else if (percentage >= 50) {
        message = "Good effort! Keep learning and try again.";
      } else {
        message = "Nice try! Practice makes perfect.";
      }
      
      toast({
        title,
        description: message,
      });
      
      // Update final score
      if (onScoreUpdate) {
        onScoreUpdate(score);
      }
    }
  };

  const handleRestartGame = () => {
    // Show start screen to select difficulty
    setShowStartScreen(true);
  };
  
  // Calculate correct answers for results screen
  const getCorrectAnswersCount = () => {
    if (!gameOver) return 0;
    return quizQuestions.reduce((count, _, index) => {
      const questionState = selectedAnswer === quizQuestions[index].correctAnswer;
      return questionState ? count + 1 : count;
    }, 0);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-green-100 text-green-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "hard": return "bg-red-100 text-red-800";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  // Start Screen UI
  if (showStartScreen) {
    return (
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="bg-navy text-white rounded-t-lg">
          <CardTitle className="text-xl text-center">Science Quiz Challenge</CardTitle>
          <CardDescription className="text-center text-gray-300">
            Test your knowledge with curriculum-aligned questions
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 pb-4 space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Choose Difficulty:</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="border-green-500 text-green-700 hover:bg-green-100"
                onClick={() => setDifficulty('easy')}
              >
                <span className="material-icons mr-2 text-green-600">school</span>
                Easy
              </Button>
              <Button 
                variant="outline" 
                className="border-yellow-500 text-yellow-700 hover:bg-yellow-100"
                onClick={() => setDifficulty('medium')}
              >
                <span className="material-icons mr-2 text-yellow-600">science</span>
                Medium
              </Button>
              <Button 
                variant="outline" 
                className="border-red-500 text-red-700 hover:bg-red-100"
                onClick={() => setDifficulty('hard')}
              >
                <span className="material-icons mr-2 text-red-600">psychology</span>
                Hard
              </Button>
              <Button 
                variant="outline" 
                className="border-blue-500 text-blue-700 hover:bg-blue-100"
                onClick={() => setDifficulty('all')}
              >
                <span className="material-icons mr-2 text-blue-600">shuffle</span>
                Mixed
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Currently selected: <span className="font-semibold capitalize">{difficulty}</span>
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3">Number of Questions:</h3>
            <div className="grid grid-cols-3 gap-3">
              <Button 
                variant="outline"
                onClick={() => setQuestionsPerGame(5)}
                className={questionsPerGame === 5 ? "bg-navy text-white" : ""}
              >
                5
              </Button>
              <Button 
                variant="outline"
                onClick={() => setQuestionsPerGame(10)}
                className={questionsPerGame === 10 ? "bg-navy text-white" : ""}
              >
                10
              </Button>
              <Button 
                variant="outline"
                onClick={() => setQuestionsPerGame(15)}
                className={questionsPerGame === 15 ? "bg-navy text-white" : ""}
              >
                15
              </Button>
            </div>
          </div>
          
          <div className="pt-4">
            <p className="text-sm text-gray-600 mb-3">
              The quiz covers various South African curriculum topics in physics, chemistry, biology, and more!
            </p>
            <Button 
              className="w-full bg-gold text-navy hover:bg-gold-dark py-6"
              onClick={() => startGame(difficulty, questionsPerGame)}
            >
              <span className="material-icons mr-2">play_arrow</span>
              Start Quiz
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-start">
          <Button variant="ghost" onClick={onClose}>
            <span className="material-icons mr-1 text-sm">arrow_back</span>
            Back to Facts
          </Button>
        </CardFooter>
      </Card>
    );
  }
  
  // Results Screen UI
  if (gameOver) {
    // Calculate performance metrics
    const correctAnswers = getCorrectAnswersCount();
    const maxScore = quizQuestions.reduce((total, q) => total + q.points, 0);
    const percentage = quizQuestions.length > 0 ? Math.round((correctAnswers / quizQuestions.length) * 100) : 0;
    
    // Determine award/badge based on performance
    let badge = "";
    let badgeColor = "";
    let message = "";
    
    if (percentage >= 90) {
      badge = "emoji_events";
      badgeColor = "text-yellow-500";
      message = "Science Champion! You've mastered these concepts!";
    } else if (percentage >= 70) {
      badge = "workspace_premium";
      badgeColor = "text-blue-500";
      message = "Science Scholar! You have strong knowledge!";
    } else if (percentage >= 50) {
      badge = "psychology";
      badgeColor = "text-green-500";
      message = "Science Explorer! You're making good progress!";
    } else {
      badge = "school";
      badgeColor = "text-purple-500";
      message = "Science Beginner! Keep practicing and learning!";
    }

    return (
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="bg-navy text-white rounded-t-lg">
          <CardTitle className="text-xl text-center">Science Quiz Results</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 pb-4">
          <div className="text-center">
            <div className="mb-4">
              <span className={`material-icons text-6xl ${badgeColor}`}>{badge}</span>
            </div>
            
            <span className="text-4xl font-bold text-navy">{score}</span>
            <p className="text-gray-500 mb-2">points earned</p>
            
            <p className="text-sm text-gray-700 mt-1 mb-6">{message}</p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span>Accuracy:</span>
                <span className="font-semibold">{percentage}%</span>
              </div>
              <Progress value={percentage} className="h-2 mb-4" />
              
              <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span>Questions:</span>
                  <span className="font-semibold">{quizQuestions.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Correct:</span>
                  <span className="font-semibold text-green-600">{correctAnswers}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Highest Streak:</span>
                  <span className="font-semibold">{highestStreak}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Difficulty:</span>
                  <span className="font-semibold capitalize">{difficulty}</span>
                </div>
              </div>
            </div>
            
            <p className="text-sm font-medium mt-4 mb-2">Keep learning and testing your knowledge!</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onClose}>
            <span className="material-icons mr-1 text-sm">arrow_back</span>
            Back to Facts
          </Button>
          <Button className="bg-gold text-navy hover:bg-gold-dark" onClick={handleRestartGame}>
            <span className="material-icons mr-1 text-sm">replay</span>
            Play Again
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const currentQuiz = quizQuestions[currentQuestion];

  return (
    <Card className="w-full max-w-lg shadow-lg">
      <CardHeader className="bg-navy text-white rounded-t-lg">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">Science Quiz</CardTitle>
          <div className="flex items-center space-x-2">
            <span className="material-icons text-gold">stars</span>
            <span className="font-bold">{score}</span>
          </div>
        </div>
        <CardDescription className="text-gray-300">
          Question {currentQuestion + 1}/{quizQuestions.length}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 pb-4">
        <div className="flex justify-between items-center mb-4">
          <Badge className={`${getDifficultyColor(currentQuiz.difficulty)}`}>
            {currentQuiz.difficulty}
          </Badge>
          <Badge variant="outline" className="capitalize">
            {currentQuiz.category}
          </Badge>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1">
            <span>Time remaining</span>
            <span>{timeLeft}s</span>
          </div>
          <Progress value={(timeLeft / 15) * 100} className="h-2" />
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">{currentQuiz.question}</h3>
          <div className="space-y-3">
            {currentQuiz.options.map((option, index) => (
              <Button
                key={index}
                variant={selectedAnswer === index 
                  ? index === currentQuiz.correctAnswer 
                    ? "default" 
                    : "destructive" 
                  : isAnswered && index === currentQuiz.correctAnswer
                    ? "default"
                    : "outline"
                }
                className={`w-full justify-start text-left py-6 ${
                  selectedAnswer === index 
                    ? index === currentQuiz.correctAnswer 
                      ? "bg-green-100 hover:bg-green-200 text-green-800 border-green-300" 
                      : "bg-red-100 hover:bg-red-200 text-red-800 border-red-300" 
                    : isAnswered && index === currentQuiz.correctAnswer
                      ? "bg-green-100 hover:bg-green-200 text-green-800 border-green-300"
                      : ""
                }`}
                onClick={() => handleAnswer(index)}
                disabled={isAnswered}
              >
                <div className="flex items-center">
                  <span className="mr-3 bg-gray-200 text-gray-700 w-6 h-6 rounded-full flex items-center justify-center text-sm">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </div>
                {isAnswered && index === currentQuiz.correctAnswer && (
                  <span className="material-icons ml-auto text-green-600">check_circle</span>
                )}
                {isAnswered && selectedAnswer === index && index !== currentQuiz.correctAnswer && (
                  <span className="material-icons ml-auto text-red-600">cancel</span>
                )}
              </Button>
            ))}
          </div>
        </div>
        
        {isAnswered && (
          <div className="bg-gray-100 p-3 rounded-lg mb-4">
            <p className="text-sm">{currentQuiz.explanation}</p>
          </div>
        )}
        
        {streak > 1 && (
          <div className="flex items-center justify-center bg-gold-light text-navy p-2 rounded-full mb-2 animate-pulse">
            <span className="material-icons mr-2">local_fire_department</span>
            <span className="font-bold">{streak}x Streak!</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onClose}>
          <span className="material-icons mr-1 text-sm">arrow_back</span>
          Back to Facts
        </Button>
        {isAnswered && (
          <Button onClick={handleNextQuestion}>
            {currentQuestion < quizQuestions.length - 1 ? "Next Question" : "See Results"}
            <span className="material-icons ml-1 text-sm">arrow_forward</span>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}