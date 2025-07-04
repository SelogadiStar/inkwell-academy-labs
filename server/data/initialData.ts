import { Grade, Topic, Experiment } from "@shared/schema";

// Grade data aligned with South African curriculum
export const initialGrades: Omit<Grade, "id">[] = [
  {
    number: 7,
    name: "Grade 7",
    color: "#4CAF50"
  },
  {
    number: 8,
    name: "Grade 8",
    color: "#2196F3"
  },
  {
    number: 9,
    name: "Grade 9",
    color: "#9C27B0"
  },
  {
    number: 10,
    name: "Grade 10",
    color: "#FF9800"
  },
  {
    number: 11,
    name: "Grade 11",
    color: "#F44336"
  },
  {
    number: 12,
    name: "Grade 12",
    color: "#795548"
  }
];

// Topics aligned with South African NCS and CAPS curriculum
export const initialTopics: (Omit<Topic, "id"> & { gradeNumber: number })[] = [
  // Grade 7 Topics
  {
    name: "Scientific Investigation",
    gradeNumber: 7
  },
  {
    name: "Properties of Materials",
    gradeNumber: 7
  },
  
  // Grade 8 Topics
  {
    name: "States of Matter",
    gradeNumber: 8
  },
  {
    name: "Mixtures",
    gradeNumber: 8
  },
  {
    name: "Chemical Change",
    gradeNumber: 8
  },
  
  // Grade 9 Topics
  {
    name: "Chemical Reactions",
    gradeNumber: 9
  },
  {
    name: "Electric Circuits",
    gradeNumber: 9
  },
  {
    name: "Ecosystems",
    gradeNumber: 9
  },
  
  // Grade 10 Topics
  {
    name: "Atomic Theory",
    gradeNumber: 10
  },
  {
    name: "Chemical Reactions",
    gradeNumber: 10
  },
  {
    name: "Motion",
    gradeNumber: 10
  },
  
  // Grade 11 Topics
  {
    name: "Acids and Bases",
    gradeNumber: 11
  },
  {
    name: "Newton's Laws",
    gradeNumber: 11
  },
  {
    name: "Cell Respiration",
    gradeNumber: 11
  },
  
  // Grade 12 Topics
  {
    name: "Organic Chemistry",
    gradeNumber: 12
  },
  {
    name: "Electromagnetism",
    gradeNumber: 12
  },
  {
    name: "Reaction Rates",
    gradeNumber: 12
  }
];

// Placeholder function to get topic ID by name and grade - will be replaced with actual IDs after DB is populated
export const getTopicId = (name: string, gradeId: number): number => {
  // This is just a temporary mapping for demonstration
  const topicMap: Record<string, Record<number, number>> = {
    "Scientific Investigation": { 7: 1 },
    "Properties of Materials": { 7: 2 },
    "States of Matter": { 8: 3 },
    "Mixtures": { 8: 4 },
    "Chemical Change": { 8: 5 },
    "Chemical Reactions": { 9: 6, 10: 10 },
    "Electric Circuits": { 9: 7 },
    "Ecosystems": { 9: 8 },
    "Atomic Theory": { 10: 9 },
    "Motion": { 10: 11 },
    "Acids and Bases": { 11: 12 },
    "Newton's Laws": { 11: 13 },
    "Cell Respiration": { 11: 14 },
    "Organic Chemistry": { 12: 15 },
    "Electromagnetism": { 12: 16 },
    "Reaction Rates": { 12: 17 }
  };
  
  return topicMap[name]?.[gradeId] || 1; // Default to ID 1 if not found
};

// Initial experiments based on the South African curriculum document
export const initialExperiments: (Omit<Experiment, "id" | "createdAt" | "topicId"> & { topicName: string })[] = [
  // Grade 7 Experiments
  {
    title: "Measuring Volume Using a Graduated Cylinder",
    description: "Learn how to accurately measure volume using a graduated cylinder by observing the meniscus and reading measurements properly.",
    duration: "30 minutes",
    imageUrl: "/images/experiments/measuring-volume.jpg",
    gradeId: 7,
    topicName: "Scientific Investigation",
    procedure: `1. Pour water into a beaker.
2. Carefully transfer water into a graduated cylinder.
3. Read the meniscus at eye level.
4. Record the volume in milliliters (mL).`,
    objective: "Understand scientific measurement and instruments.",
    curriculumAlignment: "NCS: Scientific Literacy - Understanding and using scientific instruments",
    learningOutcomes: "Students will learn to accurately measure and record liquid volumes using a graduated cylinder.",
    extensionActivities: "Compare measurements using different measuring tools (measuring cups, syringes, pipettes).",
    safetyPrecautions: "Handle glassware carefully to avoid breakage. Clean up spills immediately.",
    materialsList: "Beaker, Graduated cylinder, Water, Recording sheet",
    socialMediaScript: "Ever wonder how scientists measure liquids so precisely? In today's experiment, we're learning how to use a graduated cylinder to measure volume accurately. Watch as we read the meniscus - that curved surface of the liquid. #ScienceExperiment #SouthAfricanScience",
    visualRepresentation: "3D model of graduated cylinder with animated water being poured and close-up of meniscus reading."
  },
  {
    title: "Testing Properties of Materials",
    description: "Investigate and classify different materials based on their observable physical properties through hands-on testing.",
    duration: "45 minutes",
    imageUrl: "/images/experiments/material-properties.jpg",
    gradeId: 7,
    topicName: "Properties of Materials",
    procedure: `1. Collect various materials (plastic, fabric, metal, etc.).
2. Test flexibility by attempting to bend each material.
3. Test permeability by pouring water onto each material.
4. Test strength by applying weights to each material.
5. Record and categorize results in a data table.`,
    objective: "Classify materials based on observable properties.",
    curriculumAlignment: "NCS: Properties of Materials - Classification by physical properties",
    learningOutcomes: "Students will be able to identify and classify materials based on properties such as flexibility, permeability, and strength.",
    extensionActivities: "Research how these properties make materials suitable for specific uses in everyday life.",
    safetyPrecautions: "Handle sharp materials with care. Wear safety goggles when testing strength with weights.",
    materialsList: "Various material samples (metal, plastic, fabric, wood, paper), Water, Weights or heavy objects, Data recording sheets",
    socialMediaScript: "What makes plastic different from metal? Today we're testing materials to discover their hidden properties! Watch as we bend, pour, and test the strength of everyday materials. #MaterialScience #CAPS #SouthAfricanEducation",
    visualRepresentation: "Split-screen animation showing various materials reacting differently to the same tests, with property labels appearing."
  },
  
  // Grade 8 Experiments
  {
    title: "Separating a Mixture",
    description: "Learn physical separation techniques by separating a mixture of sand, salt, and water using filtration and evaporation.",
    duration: "60 minutes",
    imageUrl: "/images/experiments/separating-mixture.jpg",
    gradeId: 8,
    topicName: "Mixtures",
    procedure: `1. Create a mixture of sand, salt, and water in a beaker.
2. Set up a filtration apparatus with filter paper.
3. Filter the mixture to separate sand from the salt solution.
4. Heat the filtrate carefully to evaporate water.
5. Observe and recover the salt.`,
    objective: "Apply physical separation methods to mixtures.",
    curriculumAlignment: "NCS: Matter and Materials - Separation techniques",
    learningOutcomes: "Students will understand and demonstrate filtration and evaporation as physical separation methods for mixtures.",
    extensionActivities: "Research and discuss industrial applications of separation techniques.",
    safetyPrecautions: "Use heat sources with caution. Wear safety goggles when heating solutions.",
    materialsList: "Sand, Salt, Water, Beaker, Filter paper, Funnel, Evaporating dish, Heat source, Safety goggles",
    socialMediaScript: "Can you separate salt from sand? In this experiment, we're using scientific techniques to separate materials from a mixture. First filtering sand, then evaporating water to recover salt. Watch science in action! #SeparationTechniques #SouthAfricanScience",
    visualRepresentation: "Animated sequence showing particles of sand, salt, and water; followed by filtration process and water evaporation with salt crystals forming."
  },
  {
    title: "Vinegar and Bicarbonate of Soda Reaction",
    description: "Observe and analyze an acid-base reaction between vinegar and baking soda to identify evidence of chemical changes.",
    duration: "30 minutes",
    imageUrl: "/images/experiments/vinegar-bicarb.jpg",
    gradeId: 8,
    topicName: "Chemical Change",
    procedure: `1. Add a spoonful of baking soda to a beaker.
2. Measure 50ml of vinegar in a graduated cylinder.
3. Slowly add vinegar to the baking soda.
4. Observe the bubbling reaction (CO₂ release).
5. Record observations and write the chemical equation.`,
    objective: "Identify evidence of a chemical reaction.",
    curriculumAlignment: "NCS: Chemical Reactions - Evidence of chemical change",
    learningOutcomes: "Students will recognize gas formation as evidence of a chemical reaction and understand the basic chemical equation.",
    extensionActivities: "Design an experiment to measure the amount of gas produced using a balloon.",
    safetyPrecautions: "Keep vinegar away from eyes. Clean any spills immediately.",
    materialsList: "Baking soda (sodium bicarbonate), Vinegar (acetic acid), Beaker, Graduated cylinder, Spoon, Safety goggles",
    socialMediaScript: "What happens when vinegar meets baking soda? Watch the bubbling chemistry in action! This acid-base reaction creates carbon dioxide gas - the same gas in your soda! #ChemistryInAction #SouthAfricanScience #CAPS",
    visualRepresentation: "Close-up animation of bicarbonate and acetic acid molecules combining, forming carbon dioxide bubbles with chemical equation overlay."
  },
  
  // Grade 9 Experiments
  {
    title: "Reaction Between Iron and Sulfur",
    description: "Investigate the difference between a physical mixture and a chemical compound through the reaction of iron and sulfur.",
    duration: "45 minutes",
    imageUrl: "/images/experiments/iron-sulfur.jpg",
    gradeId: 9,
    topicName: "Chemical Reactions",
    procedure: `1. Mix iron filings and sulfur powder in a test tube.
2. Observe the properties of the mixture (color, magnetic properties).
3. Heat the mixture carefully until it glows red.
4. Let it cool and observe the formation of iron sulfide.
5. Test magnetic properties of the product and compare to the original mixture.`,
    objective: "Differentiate between mixtures and compounds.",
    curriculumAlignment: "NCS: Chemical Change - Physical mixtures vs chemical compounds",
    learningOutcomes: "Students will understand that compounds have different properties from the elements they contain.",
    extensionActivities: "Research other examples of compounds with properties different from their constituent elements.",
    safetyPrecautions: "Wear safety goggles and heat-resistant gloves. Work in a well-ventilated area. The reaction produces sulfur dioxide - do not inhale.",
    materialsList: "Iron filings, Sulfur powder, Test tube, Test tube holder, Bunsen burner or spirit lamp, Magnet, Safety goggles, Heat-resistant gloves",
    socialMediaScript: "Is it a mixture or a new compound? Watch as we transform iron and yellow sulfur into something completely new! Before heating - we can separate them with a magnet. After heating - a completely new substance forms! #ChemicalReactions #SouthAfricanScience",
    visualRepresentation: "Split-screen animation comparing physical mixture (particles separately visible) with chemical compound formation (new structure with different properties)."
  },
  {
    title: "Simple Electric Circuit",
    description: "Construct a basic electric circuit and understand the components required for a complete circuit that can light a bulb.",
    duration: "40 minutes",
    imageUrl: "/images/experiments/electric-circuit.jpg",
    gradeId: 9,
    topicName: "Electric Circuits",
    procedure: `1. Connect the battery to one terminal of the bulb using a wire.
2. Connect the other terminal of the bulb to the switch.
3. Connect the switch back to the battery to complete the circuit.
4. Close the switch and observe the bulb lighting up.
5. Add a resistor to the circuit and observe changes in bulb brightness.`,
    objective: "Construct and understand electric circuits.",
    curriculumAlignment: "NCS: Electricity and Magnetism - Circuit components and function",
    learningOutcomes: "Students will understand the basic components of an electric circuit and how current flows in a closed loop.",
    extensionActivities: "Design circuits with multiple bulbs in series and parallel arrangements, comparing brightness.",
    safetyPrecautions: "Use only low-voltage batteries. Never connect battery terminals directly with a wire (short circuit).",
    materialsList: "Battery (1.5V), Light bulb with holder, Connecting wires, Switch, Resistor, Circuit board or breadboard",
    socialMediaScript: "Let there be light! Watch as we build a simple circuit that demonstrates how electricity works. We'll show you the four essential components needed to light a bulb and explain what happens when we add resistance. #ElectricalEngineering #SouthAfricanScience",
    visualRepresentation: "3D interactive model of circuit with animated electrons flowing, showing current flow when switch closes and how resistor affects current."
  },
  
  // Grade 10 Experiments
  {
    title: "Displacement Reactions",
    description: "Investigate the reactivity of metals by observing displacement reactions where a more reactive metal displaces a less reactive one from solution.",
    duration: "40 minutes",
    imageUrl: "/images/experiments/displacement-reaction.jpg",
    gradeId: 10,
    topicName: "Chemical Reactions",
    procedure: `1. Add copper sulfate solution (CuSO₄) to a test tube.
2. Record the initial blue color of the solution.
3. Place a clean piece of zinc metal in the solution.
4. Observe color changes and the formation of copper on the zinc surface.
5. Write a balanced chemical equation for the reaction.`,
    objective: "Investigate chemical reactivity of elements.",
    curriculumAlignment: "NCS: Chemical Change - Reactivity series and displacement reactions",
    learningOutcomes: "Students will understand how to predict displacement reactions based on the reactivity series of metals.",
    extensionActivities: "Test other metal combinations to establish a reactivity series experimentally.",
    safetyPrecautions: "Wear safety goggles and gloves. Copper sulfate is harmful if ingested and can irritate skin and eyes.",
    materialsList: "Copper sulfate solution, Zinc strips or granules, Test tubes, Test tube rack, Tongs, Safety goggles, Gloves",
    socialMediaScript: "Metal vs. metal! Watch this chemical battle as zinc displaces copper from solution. The blue copper sulfate solution changes as copper metal forms right before your eyes. Can you predict which metal will win? #ChemistryInAction #MetalReactivity #SouthAfricanScience",
    visualRepresentation: "Animated visualization of zinc atoms replacing copper atoms in solution, with reactivity series chart appearing alongside the reaction."
  },
  {
    title: "Measuring Speed",
    description: "Apply physics concepts to measure and calculate speed using distance and time measurements.",
    duration: "45 minutes",
    imageUrl: "/images/experiments/measuring-speed.jpg",
    gradeId: 10,
    topicName: "Motion",
    procedure: `1. Mark a 5-meter distance on the floor or ground.
2. Have one student walk the distance while another times them.
3. Record the time taken to travel the distance.
4. Calculate speed using the formula: speed = distance ÷ time.
5. Repeat with running instead of walking.
6. Compare results and discuss sources of error.`,
    objective: "Use formulas in motion calculations.",
    curriculumAlignment: "NCS: Physics - Speed, velocity, and motion calculations",
    learningOutcomes: "Students will be able to measure, calculate, and compare speeds of different moving objects.",
    extensionActivities: "Investigate how to measure average speed vs. instantaneous speed using different methods.",
    safetyPrecautions: "Ensure clear path for walking/running. No pushing or dangerous speeds.",
    materialsList: "Measuring tape or meter stick, Stopwatch, Calculator, Data recording sheets, Chalk or markers for marking distance",
    socialMediaScript: "How fast are you really moving? Today we're turning our schoolyard into a physics lab to measure speed! Using the distance-time formula, we'll calculate exactly how fast objects move. Challenge: can you calculate your own average walking speed? #PhysicsInAction #SouthAfricanScience",
    visualRepresentation: "Split screen showing student walking/running alongside real-time graph plotting position vs. time, with speed calculation animated."
  },
  
  // Grade 11 Experiments
  {
    title: "Titration: HCl and NaOH",
    description: "Perform an acid-base titration to determine the concentration of an acid using a standard base solution and an indicator.",
    duration: "60 minutes",
    imageUrl: "/images/experiments/titration.jpg",
    gradeId: 11,
    topicName: "Acids and Bases",
    procedure: `1. Fill a burette with standardized NaOH solution.
2. Pipette a known volume of HCl into a conical flask.
3. Add 2-3 drops of phenolphthalein indicator.
4. Slowly add NaOH from the burette, swirling the flask.
5. Stop when the solution turns permanently pink.
6. Record the volume of NaOH used and calculate the concentration of HCl.`,
    objective: "Perform acid-base neutralization and concentration calculations.",
    curriculumAlignment: "NCS: Acids and Bases - Titration techniques and calculations",
    learningOutcomes: "Students will learn titration techniques and how to calculate unknown concentrations using the balanced equation and stoichiometry.",
    extensionActivities: "Determine the concentration of acetic acid in various vinegar samples using the same technique.",
    safetyPrecautions: "Wear safety goggles and lab coat. Handle acids and bases with care. Neutralize any spills immediately.",
    materialsList: "Burette, Burette stand, Conical flask, Pipette with bulb, HCl solution, Standardized NaOH solution, Phenolphthalein indicator, Safety goggles, Lab coat, Gloves",
    socialMediaScript: "From colorless to pink in an instant! Watch as we perform a titration to find the exact concentration of an acid. This precise laboratory technique lets us see the exact moment when acid and base neutralize each other. #ChemistryPrecision #SouthAfricanScience",
    visualRepresentation: "3D animation of titration setup with close-up of molecular-level acid-base neutralization, and color change moment highlighted."
  },
  {
    title: "Newton's Second Law Experiment",
    description: "Demonstrate and verify Newton's Second Law of Motion by analyzing the relationship between force, mass and acceleration.",
    duration: "50 minutes",
    imageUrl: "/images/experiments/newtons-law.jpg",
    gradeId: 11,
    topicName: "Newton's Laws",
    procedure: `1. Set up a track with a pulley at one end.
2. Attach a string to a trolley, run it over the pulley, and attach weights to the free end.
3. Measure the time taken for the trolley to travel a set distance.
4. Calculate acceleration using distance and time measurements.
5. Vary the mass or force and repeat measurements.
6. Plot graphs of force vs. acceleration and mass vs. acceleration.`,
    objective: "Demonstrate the relationship between force, mass, and acceleration.",
    curriculumAlignment: "NCS: Mechanics - Newton's Laws of Motion",
    learningOutcomes: "Students will verify that acceleration is directly proportional to force and inversely proportional to mass.",
    extensionActivities: "Include friction analysis by calculating the force of friction in the system.",
    safetyPrecautions: "Secure the track properly. Keep hands clear of moving parts. Secure weights to prevent dropping.",
    materialsList: "Dynamics trolley, Track, Pulley, String, Set of weights, Meter stick, Stopwatch, Graph paper, Calculator",
    socialMediaScript: "Physics in action! We're testing Newton's Second Law (F=ma) using a trolley, weights, and precise measurements. Watch as we change force and mass to see exactly how they affect acceleration. Can you predict what our graph will look like? #NewtonsLaws #PhysicsLab #SouthAfricanScience",
    visualRepresentation: "Split-screen animation showing experiment alongside force diagrams and real-time graphs of force vs. acceleration."
  },
  
  // Grade 12 Experiments
  {
    title: "Reaction Rate (Mg and HCl)",
    description: "Investigate how concentration affects the rate of chemical reactions by measuring gas production over time.",
    duration: "55 minutes",
    imageUrl: "/images/experiments/reaction-rate.jpg",
    gradeId: 12,
    topicName: "Reaction Rates",
    procedure: `1. Set up a gas collection apparatus connected to a reaction vessel.
2. Add a measured volume of HCl solution to the vessel.
3. Add a strip of magnesium metal and quickly seal the system.
4. Measure the volume of hydrogen gas produced at regular time intervals.
5. Repeat with different concentrations of HCl.
6. Plot graphs of gas volume vs. time for each concentration.`,
    objective: "Explore how concentration affects rate of reaction.",
    curriculumAlignment: "NCS: Chemical Change - Reaction rates and collision theory",
    learningOutcomes: "Students will understand how concentration affects reaction rates and be able to analyze rate graphs.",
    extensionActivities: "Investigate the effect of temperature or surface area on this same reaction.",
    safetyPrecautions: "Wear safety goggles and gloves. Hydrogen gas is flammable - no open flames. Proper ventilation required.",
    materialsList: "Magnesium ribbon, Hydrochloric acid solutions of different concentrations, Gas collection apparatus, Stopwatch, Thermometer, Graph paper, Safety goggles, Gloves",
    socialMediaScript: "How fast can a chemical reaction go? We're investigating reaction rates by measuring how quickly magnesium metal reacts with acid. Watch as we collect the hydrogen gas produced and discover how concentration changes everything! #ReactionKinetics #ChemistryMatrics #SouthAfricanScience",
    visualRepresentation: "Time-lapse animation showing three parallel reactions with different concentrations, with animated graphs building in real-time."
  },
  {
    title: "Investigating Ohm's Law",
    description: "Verify Ohm's Law by measuring the relationship between voltage, current, and resistance in an electrical circuit.",
    duration: "45 minutes",
    imageUrl: "/images/experiments/ohms-law.jpg",
    gradeId: 12,
    topicName: "Electromagnetism",
    procedure: `1. Set up a circuit with a power supply, resistor, ammeter, and voltmeter.
2. Begin with low voltage and record the current reading.
3. Gradually increase the voltage and record the corresponding current at each step.
4. Plot a graph of voltage vs. current.
5. Calculate the gradient of the graph to determine resistance.
6. Repeat with different resistors.`,
    objective: "Verify relationship between voltage, current, and resistance.",
    curriculumAlignment: "NCS: Electricity and Magnetism - Ohm's Law and electrical principles",
    learningOutcomes: "Students will verify Ohm's Law experimentally and understand the concept of resistance in electrical circuits.",
    extensionActivities: "Investigate how temperature affects the resistance of different materials.",
    safetyPrecautions: "Use only low-voltage power supplies. Never connect ammeter directly across power supply. Switch off before changing circuit components.",
    materialsList: "Power supply (variable DC), Ammeter, Voltmeter, Resistors of different values, Connecting wires, Switch, Circuit board, Graph paper",
    socialMediaScript: "V=IR in action! We're proving Ohm's Law by building circuits and measuring exactly how current changes with voltage. Watch us create a perfect straight-line graph that reveals everything about resistance. #OhmsLaw #PhysicsMatrics #SouthAfricanScience",
    visualRepresentation: "Interactive circuit diagram with animated current flow, alongside real-time V-I graph plotting, highlighting proportional relationship."
  }
];