import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import ScienceBuddyGame from "./ScienceBuddyGame";
import { useQuery } from "@tanstack/react-query";

// Science facts and critical thinking prompts
const SAMPLE_SCIENCE_FACTS = [
  {
    id: 1,
    content: "Did you know? The human brain has about 86 billion neurons. Each neuron forms connections with up to 10,000 other neurons, passing signals via over 100 trillion synaptic connections.",
    category: "Biology",
    source: "Neuroscience Journal"
  },
  {
    id: 101,
    content: "Thermal expansion is when matter expands as it heats up. We see this daily in thermometers, where liquid rises as it warms, or in bridges that have expansion joints to prevent buckling in hot weather.",
    category: "Physics",
    source: "Thermal Engineering"
  },
  {
    id: 102,
    content: "Rockets work using Newton's Third Law: for every action, there's an equal and opposite reaction. By expelling hot gases downward at high speed, rockets generate thrust that propels them upward.",
    category: "Physics",
    source: "Aerospace Engineering"
  },
  {
    id: 103,
    content: "The greenhouse effect occurs when gases like CO₂ and methane trap heat in Earth's atmosphere. Like glass in a greenhouse, these gases let sunlight in but prevent heat from escaping.",
    category: "Environmental Science",
    source: "Climate Research Institute"
  },
  {
    id: 104,
    content: "Salt melts ice by lowering its freezing point (freezing point depression). When salt dissolves in the thin layer of water on ice, it creates a solution that freezes at a lower temperature.",
    category: "Chemistry",
    source: "Journal of Physical Chemistry"
  },
  {
    id: 105,
    content: "Polymers are large molecules made of repeating subunits. They're used in plastics, fabrics, adhesives, paints, and even in your body as proteins, DNA, and starch.",
    category: "Chemistry",
    source: "Materials Science Today"
  },
  {
    id: 106,
    content: "Surface tension is a property that makes a liquid's surface behave like an elastic sheet. It allows water striders to walk on water, bubbles to form, and water droplets to bead up instead of spreading out.",
    category: "Physics",
    source: "Fluid Dynamics Journal"
  },
  {
    id: 107,
    content: "Plants grow toward light through a process called phototropism. Special cells in the plant detect light, triggering the release of a hormone called auxin that causes cells on the shaded side to elongate faster.",
    category: "Botany",
    source: "Plant Physiology"
  },
  {
    id: 108,
    content: "Mass is a measure of how much matter is in an object, while weight is the force of gravity acting on that mass. Your mass is the same everywhere, but your weight would be different on the Moon or Mars.",
    category: "Physics",
    source: "Fundamentals of Physics"
  },
  {
    id: 109,
    content: "Your heart beats because of specialized cardiac cells that generate electrical impulses automatically. These impulses cause heart muscles to contract in a coordinated rhythm, pumping blood throughout your body.",
    category: "Biology",
    source: "Cardiovascular Research"
  },
  {
    id: 110,
    content: "Kinetic energy is the energy an object has due to its motion. It depends on both mass and velocity, with faster or heavier objects having more kinetic energy that can be transferred to other objects upon impact.",
    category: "Physics",
    source: "Energy Science"
  },
  {
    id: 111,
    content: "Metal feels colder than wood at room temperature because it conducts heat away from your hand more quickly. Both are the same temperature, but metal's higher thermal conductivity creates the sensation of coldness.",
    category: "Physics",
    source: "Thermal Properties Research"
  },
  {
    id: 112,
    content: "Your body fights infection through the immune system, using white blood cells to detect and destroy pathogens. It also creates antibodies that remember specific pathogens for faster response to future infections.",
    category: "Biology",
    source: "Immunology Today"
  },
  {
    id: 113,
    content: "Simple machines are devices that change the direction or magnitude of a force. The six types are the lever, wheel and axle, pulley, inclined plane, wedge, and screw—all helping us do work more efficiently.",
    category: "Physics",
    source: "Mechanical Engineering"
  },
  {
    id: 114,
    content: "Icebergs float because ice is less dense than liquid water—it has about 9% less density. This unusual property happens because water molecules form a crystalline structure when frozen that takes up more space.",
    category: "Physics",
    source: "Oceanography Institute"
  },
  {
    id: 115,
    content: "Static electricity occurs when there's an imbalance of electric charges within or on the surface of a material. It builds up when two materials rub together and electrons move from one material to the other.",
    category: "Physics",
    source: "Electromagnetism Journal"
  },
  {
    id: 116,
    content: "We see lightning before hearing thunder because light travels faster than sound. Light travels at 300,000 km/s while sound travels at only about 343 m/s in air, creating a delay between seeing the flash and hearing the boom.",
    category: "Physics",
    source: "Meteorological Society"
  },
  {
    id: 117,
    content: "pH is a scale that measures how acidic or basic a solution is, ranging from 0 (very acidic) to 14 (very basic). It matters because most biological processes and chemical reactions only work within specific pH ranges.",
    category: "Chemistry",
    source: "Chemical Analysis Journal"
  },
  {
    id: 118,
    content: "Night-vision goggles work by amplifying tiny amounts of existing light, including infrared light that's invisible to the human eye. They convert photons into electrons, amplify them, and convert them back into visible light.",
    category: "Technology",
    source: "Optical Engineering"
  },
  {
    id: 119,
    content: "A black hole is a region of space where gravity is so strong that nothing, not even light, can escape from it. It forms when a massive star collapses under its own gravity at the end of its life cycle.",
    category: "Astronomy",
    source: "Astrophysics Research"
  },
  {
    id: 120,
    content: "Friction affects motion by converting kinetic energy into heat energy. It's the force that resists the sliding or rolling of one surface over another, which is why pushing a box across a carpet requires more effort than across ice.",
    category: "Physics",
    source: "Mechanics Institute"
  },
  {
    id: 121,
    content: "Magnets attract or repel because of their magnetic fields. Like poles (north-north or south-south) repel each other, while opposite poles (north-south) attract. These interactions occur because of the fundamental electromagnetic force.",
    category: "Physics",
    source: "Magnetism Research Center"
  },
  {
    id: 122,
    content: "Mirrors reflect light according to the law of reflection: the angle of incidence equals the angle of reflection. Light bounces off the smooth surface at the same angle it arrived, creating the reflection you see.",
    category: "Physics",
    source: "Optics Journal"
  },
  {
    id: 123,
    content: "Capillary action is the ability of a liquid to flow against gravity in narrow spaces. It's caused by the combination of adhesive forces (liquid molecules sticking to the surface) and cohesive forces (liquid molecules sticking together).",
    category: "Physics",
    source: "Fluid Mechanics"
  },
  {
    id: 124,
    content: "Bacteria multiply through binary fission, where one cell divides into two identical daughter cells. Under ideal conditions, some bacteria can double their population every 20 minutes, leading to exponential growth.",
    category: "Biology",
    source: "Microbiology Review"
  },
  {
    id: 125,
    content: "Buoyancy is the upward force exerted by a fluid on an immersed object. According to Archimedes' principle, this force equals the weight of the fluid displaced by the object, which is why some objects float while others sink.",
    category: "Physics",
    source: "Fluid Dynamics"
  },
  {
    id: 126,
    content: "A circuit breaker is a safety device that automatically interrupts electrical flow when it detects a fault condition. Unlike a fuse that needs replacement after breaking the circuit, a circuit breaker can be reset.",
    category: "Electricity",
    source: "Electrical Engineering"
  },
  {
    id: 127,
    content: "Photosynthesis works by using chlorophyll to capture light energy, which converts water and carbon dioxide into glucose and oxygen. This complex process occurs in the chloroplasts of plant cells and is the foundation of most food chains.",
    category: "Biology",
    source: "Plant Sciences"
  },
  {
    id: 128,
    content: "Warm air rises because it's less dense than cool air. When air is heated, its molecules move faster and spread out, making it lighter per unit volume. This principle drives weather patterns, home heating systems, and hot air balloons.",
    category: "Physics",
    source: "Atmospheric Science"
  },
  {
    id: 129,
    content: "Sonar and radar work by sending out waves (sound waves for sonar, radio waves for radar) and detecting their reflections. By measuring how long it takes for the waves to return, these systems can determine the distance, direction, and speed of objects.",
    category: "Physics",
    source: "Wave Technology Institute"
  },
  {
    id: 130,
    content: "Seasons are caused by Earth's tilted axis as it orbits the sun. When a hemisphere is tilted toward the sun, it receives more direct sunlight and experiences summer. When tilted away, it receives less direct sunlight and experiences winter.",
    category: "Astronomy",
    source: "Earth Sciences"
  },
  {
    id: 131,
    content: "Fermentation is a metabolic process that converts sugar to acids, gases, or alcohol in the absence of oxygen. It's used in making bread, cheese, yogurt, wine, and beer, and was one of the first forms of food preservation.",
    category: "Biology",
    source: "Food Science Journal"
  },
  {
    id: 132,
    content: "Your voice sounds different in recordings because you normally hear your voice through both air conduction and bone conduction. Recordings only capture the air-conducted sound that others hear, without the deeper tones conducted through your skull.",
    category: "Physics",
    source: "Acoustical Society"
  },
  {
    id: 133,
    content: "Renewable energy sources are those that naturally replenish themselves, including solar, wind, hydroelectric, geothermal, and biomass. Unlike fossil fuels, they produce minimal greenhouse gases and won't be depleted through continued use.",
    category: "Environmental Science",
    source: "Renewable Energy Institute"
  },
  {
    id: 134,
    content: "The speed of sound is approximately 343 meters per second (1,125 feet per second) in dry air at 20°C. It travels faster through liquids and solids than through gases because the molecules are closer together.",
    category: "Physics",
    source: "Acoustics Research"
  },
  {
    id: 135,
    content: "Prokaryotic cells (like bacteria) lack a true nucleus and membrane-bound organelles, while eukaryotic cells (like those in plants and animals) have a defined nucleus containing genetic material and specialized organelles with specific functions.",
    category: "Biology",
    source: "Cell Biology Journal"
  },
  {
    id: 136,
    content: "Airplanes leave contrails (condensation trails) when hot, humid exhaust from jet engines mixes with the cold, low-pressure air at high altitudes. This causes water vapor to rapidly condense and freeze into ice crystals, forming visible trails.",
    category: "Meteorology",
    source: "Aviation Science"
  },
  {
    id: 137,
    content: "Plastic recycling involves collecting, sorting, cleaning, shredding, melting, and remolding plastic waste into new products. Different types of plastic (identified by recycling codes 1-7) require different recycling processes.",
    category: "Environmental Science",
    source: "Waste Management Journal"
  },
  {
    id: 138,
    content: "Chemical bonds are the forces that hold atoms together in molecules. The main types are ionic bonds (electron transfer between atoms), covalent bonds (electron sharing), and metallic bonds (electron sea among positively charged metal ions).",
    category: "Chemistry",
    source: "Chemical Bonding Research"
  },
  {
    id: 139,
    content: "A solar eclipse occurs when the Moon passes between Earth and the Sun, blocking the Sun's light. Total solar eclipses happen when the Moon completely covers the Sun's disk, revealing the solar corona.",
    category: "Astronomy",
    source: "Astronomical Society"
  },
  {
    id: 140,
    content: "Vaccines work by training your immune system to recognize and fight specific pathogens. They contain weakened, dead, or parts of the disease-causing organism, which triggers an immune response without causing the actual disease.",
    category: "Biology",
    source: "Immunology Research"
  },
  {
    id: 141,
    content: "A catalyst is a substance that increases the rate of a chemical reaction without being consumed in the process. It works by providing an alternative reaction pathway with a lower activation energy, allowing more molecules to react without the catalyst being permanently altered.",
    category: "Chemistry",
    source: "Chemical Kinetics Journal"
  },
  {
    id: 145,
    content: "A control in an experiment is the standard against which experimental observations are compared. It isolates the effect of the independent variable by keeping all other variables the same, making it essential for drawing valid scientific conclusions.",
    category: "Scientific Method",
    source: "Research Methodology"
  },
  {
    id: 155,
    content: "The sky appears blue because air molecules scatter sunlight in all directions. Blue light, which has shorter wavelengths, is scattered more than red light. This scattered blue light is what we see when we look at the sky during daytime.",
    category: "Physics",
    source: "Atmospheric Optics"
  },
  {
    id: 166,
    content: "Newton's three laws of motion are: 1) An object at rest stays at rest, and an object in motion stays in motion unless acted upon by a force. 2) Force equals mass times acceleration (F=ma). 3) For every action, there is an equal and opposite reaction.",
    category: "Physics",
    source: "Classical Mechanics"
  },
  {
    id: 182,
    content: "The scientific method is a systematic approach to research that involves making observations, formulating hypotheses, conducting experiments, analyzing data, and drawing conclusions. It's designed to eliminate bias and ensure results are reliable and reproducible.",
    category: "Scientific Method",
    source: "Research Methodology"
  },
  {
    id: 191,
    content: "Enzymes in digestion are specialized proteins that break down food molecules into smaller, absorbable components. Different enzymes target specific nutrients: amylase breaks down carbohydrates, proteases break down proteins, and lipases break down fats.",
    category: "Biology",
    source: "Digestive Physiology"
  },
  {
    id: 215,
    content: "An atom is made of three basic particles: protons (positively charged), neutrons (no charge), and electrons (negatively charged). Protons and neutrons form the nucleus at the center, while electrons orbit around it in energy levels or shells.",
    category: "Chemistry",
    source: "Atomic Physics"
  },
  {
    id: 370,
    content: "A double helix is the structure formed by DNA, consisting of two strands that wind around each other like a twisted ladder. The sides of the ladder are made of sugar and phosphate molecules, while the rungs are formed by pairs of nucleotide bases.",
    category: "Biology",
    source: "Molecular Genetics"
  },
  {
    id: 375,
    content: "A conductor allows electricity to flow through it easily, while an insulator blocks or greatly reduces electrical flow. Metals like copper are good conductors because they have free electrons, while materials like rubber and glass are good insulators.",
    category: "Physics",
    source: "Electrical Engineering"
  },
  {
    id: 386,
    content: "An electromagnet is a type of magnet where the magnetic field is produced by an electric current. Unlike permanent magnets, electromagnets can be turned on and off, and their strength can be adjusted by changing the current flowing through them.",
    category: "Physics",
    source: "Electromagnetic Research"
  },
  {
    id: 389,
    content: "Asteroids are rocky objects that orbit the Sun, mostly found in the asteroid belt between Mars and Jupiter. Comets are icy bodies that, when near the Sun, develop a 'tail' of gas and dust. Comets typically have more eccentric orbits than asteroids.",
    category: "Astronomy",
    source: "Planetary Science"
  },
  {
    id: 401,
    content: "An alloy is a mixture of a metal with other elements, usually other metals or carbon. Alloys are designed to improve properties like strength, hardness, and corrosion resistance. Common examples include steel (iron + carbon) and brass (copper + zinc).",
    category: "Materials Science",
    source: "Metallurgical Engineering"
  },
  {
    id: 2,
    content: "South Africa's Vredefort Dome is the world's largest and oldest verified impact crater, created when an asteroid struck Earth around 2 billion years ago. It's a UNESCO World Heritage site.",
    category: "Geology",
    source: "UNESCO"
  },
  {
    id: 3,
    content: "The concept of absolute zero (-273.15°C or -459.67°F) is the lowest possible temperature where particles have minimal motion. It's physically impossible to reach this temperature.",
    category: "Physics",
    source: "Physical Review"
  },
  {
    id: 4,
    content: "Water boils at lower temperatures on mountains due to decreased atmospheric pressure. At the top of Mount Everest (8,848m), water boils at approximately 71°C instead of 100°C at sea level.",
    category: "Physics",
    source: "Environmental Science"
  },
  {
    id: 5,
    content: "Sunscreen works by containing organic compounds that absorb UV radiation and inorganic particles that reflect, scatter, and absorb UV rays, preventing them from reaching and damaging your skin cells.",
    category: "Chemistry",
    source: "Journal of Photochemistry"
  },
  {
    id: 6,
    content: "Metals conduct electricity because they have free electrons in their atomic structure that can move easily throughout the material when voltage is applied, creating an electric current.",
    category: "Physics",
    source: "Materials Science"
  },
  {
    id: 7,
    content: "An exothermic reaction releases energy to its surroundings, usually in the form of heat. Examples include combustion, neutralization, and most oxidation reactions.",
    category: "Chemistry",
    source: "Journal of Thermodynamics"
  },
  {
    id: 8,
    content: "Batteries store energy chemically and convert it to electrical energy through redox reactions, where electrons are transferred from one material to another through an electrolyte.",
    category: "Chemistry",
    source: "Energy Science"
  },
  {
    id: 9,
    content: "When light passes through a prism, it slows down and bends (refracts). Different wavelengths of light bend at different angles, causing white light to separate into the visible spectrum (rainbow).",
    category: "Physics",
    source: "Optics Journal"
  },
  {
    id: 10,
    content: "Fish extract oxygen from water using gills. As water passes over the thin gill filaments, oxygen diffuses from the water into the blood, while carbon dioxide diffuses from the blood into the water.",
    category: "Biology",
    source: "Marine Biology Research"
  },
  {
    id: 11,
    content: "The Doppler effect is the change in frequency of a wave when the source or observer is moving. It explains why a siren sounds higher in pitch as it approaches you and lower as it moves away.",
    category: "Physics",
    source: "Acoustical Society"
  },
  {
    id: 12,
    content: "Astronauts drink from special pouches with straws in zero gravity. The pouches prevent liquids from floating away as droplets, which could damage equipment and be inhaled by crew members.",
    category: "Space Science",
    source: "NASA"
  },
  {
    id: 13,
    content: "The law of conservation of mass states that matter cannot be created or destroyed in a closed system. The total mass of reactants equals the total mass of products in a chemical reaction.",
    category: "Chemistry",
    source: "Physical Chemistry"
  },
  {
    id: 14,
    content: "Rainbows form when sunlight enters water droplets in the air, reflects off the back of the droplets, and exits at a different angle, separating into different wavelengths (colors) we can see.",
    category: "Meteorology",
    source: "Atmospheric Science"
  },
  {
    id: 15,
    content: "Popcorn pops because each kernel contains a small amount of water. When heated, the water turns to steam, creating pressure inside until the kernel explodes and the starch inside expands.",
    category: "Food Science",
    source: "Agricultural Sciences"
  },
  {
    id: 16,
    content: "Enzymes are biological catalysts that speed up chemical reactions in the body without being used up themselves. They help with digestion, energy production, and thousands of other processes.",
    category: "Biology",
    source: "Biochemistry Journal"
  },
  {
    id: 17,
    content: "Leaves change color in autumn when chlorophyll (green pigment) breaks down, revealing other pigments like carotenoids (yellow/orange) and anthocyanins (red) that were present but masked.",
    category: "Botany",
    source: "Plant Physiology"
  },
  {
    id: 18,
    content: "Isotopes are variants of a chemical element with the same number of protons but different numbers of neutrons. This gives them identical chemical properties but different atomic masses.",
    category: "Chemistry",
    source: "Nuclear Science"
  },
  {
    id: 19,
    content: "Microwaves heat food by producing electromagnetic waves that cause water, fat, and sugar molecules to vibrate rapidly. This friction between molecules generates heat that cooks the food.",
    category: "Physics",
    source: "Food Technology"
  },
  {
    id: 20,
    content: "Acid rain forms when pollutants like sulfur dioxide and nitrogen oxides react with water and oxygen in the atmosphere to create sulfuric and nitric acids that fall as precipitation.",
    category: "Environmental Science",
    source: "Environmental Protection"
  },
  {
    id: 21,
    content: "A submarine rises and sinks by changing its buoyancy. By filling ballast tanks with water, it becomes denser than the surrounding water and sinks. By filling tanks with air, it becomes less dense and rises.",
    category: "Physics",
    source: "Naval Engineering"
  },
  {
    id: 22,
    content: "Fossils form when plants or animals are buried in sediment that hardens over time. The organic material is slowly replaced by minerals, creating a stone copy of the original organism.",
    category: "Paleontology",
    source: "Earth Science Institute"
  },
  {
    id: 23,
    content: "Earthquakes occur when tectonic plates suddenly slip past each other. The energy released travels as seismic waves through the Earth's crust, causing the ground to shake.",
    category: "Geology",
    source: "Seismological Society"
  },
  {
    id: 24,
    content: "A compass works by aligning itself with Earth's magnetic field. The magnetized needle is attracted to Earth's magnetic north pole, which is actually near the geographic south pole.",
    category: "Earth Science",
    source: "Geographic Journal"
  },
  {
    id: 25,
    content: "Nuclear energy is generated through nuclear fission, where atoms (usually uranium-235) are split apart, releasing large amounts of energy that heats water to create steam that drives turbines.",
    category: "Physics",
    source: "Nuclear Regulatory Commission"
  },
  {
    id: 26,
    content: "Plants 'drink' water from soil through their roots using a process called osmosis. Water molecules move from areas of higher concentration to lower concentration through root hair cells.",
    category: "Botany",
    source: "Botanical Sciences"
  },
  {
    id: 27,
    content: "Bubbles are round because surface tension pulls the water molecules into the shape that has the least surface area for a given volume, which is a sphere.",
    category: "Physics",
    source: "Fluid Dynamics Journal"
  },
  {
    id: 28,
    content: "Camouflage in animals is an adaptation that helps them blend into their environment to avoid predators or to help them sneak up on prey. It can involve matching colors, patterns, shapes, or behaviors.",
    category: "Biology",
    source: "Zoological Research"
  },
  {
    id: 29,
    content: "Nanotechnology involves manipulating materials at the nanoscale (1-100 nanometers). At this tiny scale, materials often exhibit different physical, chemical, and biological properties.",
    category: "Technology",
    source: "Institute of Nanotechnology"
  },
  {
    id: 30,
    content: "A magnet attracts iron by creating a magnetic field that aligns the electrons in iron atoms, turning the iron itself into a temporary magnet. This magnetic attraction works even through non-magnetic materials.",
    category: "Physics",
    source: "Electromagnetic Research"
  },
  {
    id: 31,
    content: "Hot air balloons rise because hot air is less dense than cool air. When the air inside the balloon is heated, it expands and some escapes, leaving fewer air molecules in the same volume of space.",
    category: "Physics",
    source: "Aviation Sciences"
  },
  {
    id: 32,
    content: "The ozone layer in the stratosphere protects life on Earth by absorbing harmful ultraviolet radiation from the sun. It's made of molecules containing three oxygen atoms (O₃) instead of the normal two (O₂).",
    category: "Environmental Science",
    source: "Atmospheric Research Center"
  },
  {
    id: 33,
    content: "The moon shines by reflecting sunlight. It doesn't produce its own light but instead acts like a mirror, reflecting about 12% of the sunlight that hits its surface back toward Earth.",
    category: "Astronomy",
    source: "Lunar Sciences Institute"
  },
  {
    id: 34,
    content: "Biodegradable materials can be broken down by microorganisms like bacteria and fungi into simpler substances like water, carbon dioxide, and biomass. This natural process helps reduce waste in landfills.",
    category: "Environmental Science",
    source: "Sustainable Materials Research"
  },
  {
    id: 35,
    content: "A parachute slows descent by increasing air resistance. The large canopy creates drag by catching air, which pushes against the downward force of gravity, allowing for a slower, safer landing.",
    category: "Physics",
    source: "Aerodynamics Journal"
  }
];

type ScienceFact = {
  id: number;
  content: string;
  category: string;
  source?: string;
  likeCount?: number;
  shareCount?: number;
};

interface ScienceBuddyProps {
  minimized?: boolean;
  onToggleMinimize?: () => void;
}

export default function ScienceBuddy({ minimized = false, onToggleMinimize }: ScienceBuddyProps) {
  const [currentFact, setCurrentFact] = useState<ScienceFact | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [sharePopoverOpen, setSharePopoverOpen] = useState(false);
  const [gameMode, setGameMode] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const { toast } = useToast();
  
  // Temporary user ID until we implement authentication
  const TEMP_USER_ID = 1;

  // Load a fact when component mounts
  useEffect(() => {
    setIsLoading(true);
    
    // In a real implementation, we would fetch from the API
    // For now, use the sample facts
    const randomIndex = Math.floor(Math.random() * SAMPLE_SCIENCE_FACTS.length);
    setCurrentFact(SAMPLE_SCIENCE_FACTS[randomIndex]);
    setIsLoading(false);
    setIsLiked(false);
  }, []);

  // Get the next fact from our sample facts
  const handleNextFact = () => {
    setIsLoading(true);
    
    // Get current fact index
    const currentIndex = currentFact ? SAMPLE_SCIENCE_FACTS.findIndex(fact => fact.id === currentFact.id) : -1;
    const nextIndex = (currentIndex + 1) % SAMPLE_SCIENCE_FACTS.length;
    
    // Set the next fact
    setCurrentFact(SAMPLE_SCIENCE_FACTS[nextIndex]);
    setIsLoading(false);
    setIsLiked(false);
  };

  const handleLike = () => {
    if (isLiked || !currentFact) return;
    
    setIsLiked(true);
    toast({
      title: "Fact Liked!",
      description: "This fact has been added to your favorites.",
    });
    
    // Call API to record the like
    fetch(`/api/science-facts/like/${currentFact.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: TEMP_USER_ID }),
    }).catch(err => {
      console.error('Error liking fact:', err);
    });
  };

  // Share handling methods for each platform
  const handleWhatsAppShare = () => {
    if (!currentFact) return;
    const shareText = `${currentFact.content}${currentFact.source ? ` - Source: ${currentFact.source}` : ''} #InkwellLabsOnTheGo #SouthAfricanScience`;
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(shareUrl, '_blank');
    
    toast({
      title: "Shared on WhatsApp!",
      description: "Thanks for spreading science knowledge!",
    });
    
    recordShare('whatsapp');
  };
  
  const handleFacebookShare = () => {
    if (!currentFact) return;
    const shareText = `${currentFact.content}${currentFact.source ? ` - Source: ${currentFact.source}` : ''} #InkwellLabsOnTheGo #SouthAfricanScience`;
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(shareText)}`;
    window.open(shareUrl, '_blank');
    
    toast({
      title: "Shared on Facebook!",
      description: "Thanks for spreading science knowledge!",
    });
    
    recordShare('facebook');
  };
  
  const handleInstagramShare = () => {
    if (!currentFact) return;
    const shareText = `${currentFact.content}${currentFact.source ? ` - Source: ${currentFact.source}` : ''} #InkwellLabsOnTheGo #SouthAfricanScience`;
    
    // Instagram doesn't have a direct share URL, but we can show instructions
    toast({
      title: "Share to Instagram",
      description: "Text copied! Open Instagram and paste in your story or post.",
    });
    
    navigator.clipboard.writeText(shareText).catch(err => {
      console.error('Error copying to clipboard:', err);
    });
    
    recordShare('instagram');
  };
  
  // Helper function to record shares
  const recordShare = (platform: string) => {
    if (!currentFact) return;
    
    // In a real app, we would call the API
    console.log(`Shared fact #${currentFact.id} on ${platform}`);
    
    // Simulate API call for now
    setTimeout(() => {
      // This would be an actual API call in production
      if (currentFact) {
        console.log(`Recorded share for fact #${currentFact.id} on ${platform}`);
      }
    }, 500);
  };

  // Handle score updates from the game
  const handleScoreUpdate = (score: number) => {
    setUserScore(score);
    toast({
      title: "Score Updated!",
      description: `Your Science Buddy score is now ${score} points!`,
    });
  };

  // Toggle between fact mode and game mode
  const toggleGameMode = () => {
    setGameMode(!gameMode);
  };

  if (minimized) {
    return (
      <Button 
        className="fixed bottom-6 right-6 rounded-full h-14 w-14 p-0 shadow-lg bg-primary z-50 flex items-center justify-center"
        onClick={onToggleMinimize}
      >
        <span className="material-icons text-white text-2xl">science</span>
      </Button>
    );
  }

  // Show game mode if it's active
  if (gameMode) {
    return (
      <div className="fixed bottom-6 right-6 z-50 w-96 shadow-lg">
        <ScienceBuddyGame onClose={toggleGameMode} onScoreUpdate={handleScoreUpdate} />
      </div>
    );
  }

  // Show facts mode otherwise
  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 shadow-lg">
      <Card className="border-primary border-2">
        <CardHeader className="bg-primary text-white pb-3 pt-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="material-icons mr-2">science</span>
              <div>
                <CardTitle className="text-lg">Science Buddy</CardTitle>
                <CardDescription className="text-white text-opacity-90 text-xs">Your daily science companion</CardDescription>
              </div>
            </div>
            <div className="flex items-center">
              {userScore > 0 && (
                <div className="flex items-center bg-gold/20 rounded-full px-2 py-1 mr-2">
                  <span className="material-icons text-gold text-sm">stars</span>
                  <span className="text-gold text-sm font-medium ml-1">{userScore}</span>
                </div>
              )}
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white h-8 w-8"
                onClick={onToggleMinimize}
              >
                <span className="material-icons">remove</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4 pb-3">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-2 text-sm text-gray-500">Thinking of a fact...</p>
            </div>
          ) : currentFact ? (
            <div>
              <div className="bg-gray-50 p-3 rounded-lg mb-2">
                <p className="text-gray-800">{currentFact.content}</p>
              </div>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span className="font-medium">Category: {currentFact.category}</span>
                {currentFact.source && <span>Source: {currentFact.source}</span>}
              </div>
            </div>
          ) : (
            <p className="text-center py-4 text-gray-500">No facts available right now</p>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-3 pt-0 pb-3">
          <div className="flex justify-between w-full">
            <div className="flex space-x-2">
              <Button 
                variant={isLiked ? "default" : "outline"} 
                size="sm" 
                className={isLiked ? "bg-primary" : ""}
                onClick={handleLike}
                disabled={isLoading || !currentFact}
              >
                <span className="material-icons text-sm mr-1">thumb_up</span>
                Like
              </Button>
              
              <Popover open={sharePopoverOpen} onOpenChange={setSharePopoverOpen}>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    disabled={isLoading || !currentFact}
                  >
                    <span className="material-icons text-sm mr-1">share</span>
                    Share
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-2">
                  <div className="flex flex-col space-y-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="justify-start"
                      onClick={handleWhatsAppShare}
                    >
                      <span className="material-icons text-green-500 mr-2">whatsapp</span>
                      WhatsApp
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="justify-start"
                      onClick={handleFacebookShare}
                    >
                      <span className="material-icons text-blue-600 mr-2">facebook</span>
                      Facebook
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="justify-start"
                      onClick={handleInstagramShare}
                    >
                      <span className="material-icons text-pink-500 mr-2">photo_camera</span>
                      Instagram
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleNextFact}
              disabled={isLoading}
            >
              Next Fact
            </Button>
          </div>
          
          <Button
            variant="outline"
            className="w-full border-gold text-gold hover:bg-gold hover:text-navy"
            onClick={toggleGameMode}
          >
            <span className="material-icons mr-2">quiz</span>
            Play Science Quiz
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}