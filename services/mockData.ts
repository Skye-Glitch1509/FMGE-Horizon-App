
import { Question, SyllabusSubject } from '../types';

// ---------------------------------------------------------------------------
// SYLLABUS DATA
// ---------------------------------------------------------------------------
export const SYLLABUS_DATA: SyllabusSubject[] = [
  {
    name: "Anatomy",
    weightage: "17 Marks",
    topics: ["Brachial Plexus", "Cranial Nerves", "Coronary Circulation", "Inguinal Canal", "Ureter Constrictions", "Knee Joint", "Pharyngeal Arches", "Circle of Willis"]
  },
  {
    name: "Physiology",
    weightage: "17 Marks",
    topics: ["Cardiac Cycle", "Lung Volumes & Capacities", "GFR Regulation", "Thyroid Hormones", "Menstrual Cycle", "Nerve Action Potential", "Blood Grouping", "Hemoglobin Dissociation Curve"]
  },
  {
    name: "Biochemistry",
    weightage: "17 Marks",
    topics: ["Glycolysis & TCA Cycle", "Vitamin Deficiencies", "Enzyme Kinetics (Km & Vmax)", "Lipoprotein Metabolism", "Amino Acid Disorders", "DNA Replication", "Electron Transport Chain", "Heme Synthesis"]
  },
  {
    name: "Pathology",
    weightage: "13 Marks",
    topics: ["Cell Injury & Necrosis", "Inflammation Mediators", "Neoplasia Markers", "Anemias (Iron, B12)", "Granulomatous Diseases", "Glomerulonephritis Types", "Thyroid Tumors", "Bone Tumors"]
  },
  {
    name: "Microbiology",
    weightage: "13 Marks",
    topics: ["Sterilization Methods", "Staph vs Strep", "Tuberculosis Diagnosis", "Hepatitis Viruses", "HIV Lifecycle", "Malaria Lifecycle", "Dermatophytes", "Culture Media"]
  },
  {
    name: "Pharmacology",
    weightage: "13 Marks",
    topics: ["General Pharmacology (PK/PD)", "Autonomic Drugs", "Antihypertensives", "Diuretics", "Antimicrobial Resistance", "Antidiabetic Drugs", "General Anesthetics", "Opioids"]
  },
  {
    name: "Forensic Medicine",
    weightage: "10 Marks",
    topics: ["Thanatology (Changes after death)", "Mechanical Injuries", "Firearm Injuries", "Toxicology (Snake bite, OP poisoning)", "Sexual Offences", "Identification", "Courts & Legal Procedures"]
  },
  {
    name: "Medicine",
    weightage: "33 Marks",
    topics: ["Myocardial Infarction Management", "Stroke Management", "Diabetes Complications", "TB Treatment Protocols", "Liver Cirrhosis", "Meningitis", "Rheumatoid Arthritis", "Kidney Failure (AKI/CKD)"]
  },
  {
    name: "General Surgery",
    weightage: "32 Marks",
    topics: ["Trauma Management (ATLS)", "Burns Management", "Breast Cancer Staging", "Hernias", "Appendicitis", "Thyroid Swellings", "Intestinal Obstruction", "Gallstones"]
  },
  {
    name: "Obstetrics & Gynecology",
    weightage: "30 Marks",
    topics: ["Antenatal Care", "Stages of Labour", "PPH Management", "Pre-eclampsia/Eclampsia", "Contraception", "Carcinoma Cervix", "PCOS", "Infertility Evaluation"]
  },
  {
    name: "Pediatrics",
    weightage: "15 Marks",
    topics: ["Immunization Schedule", "Milestones of Development", "Neonatal Jaundice", "SAM Management", "Respiratory Distress in Newborn", "Congenital Heart Diseases", "Nephrotic Syndrome"]
  },
  {
    name: "PSM (Community Medicine)",
    weightage: "30 Marks",
    topics: ["Epidemiology Study Designs", "Screening Tests (Sensitivity/Specificity)", "National Health Programs", "Vaccines & Cold Chain", "Biomedical Waste Management", "Demography & Family Planning", "Nutrition & Health"]
  },
  {
    name: "Ophthalmology",
    weightage: "15 Marks",
    topics: ["Cataract", "Glaucoma", "Diabetic Retinopathy", "Corneal Ulcers", "Refractive Errors", "Strabismus", "Uveitis"]
  },
  {
    name: "ENT",
    weightage: "15 Marks",
    topics: ["Otitis Media (ASOM/CSOM)", "Hearing Loss Types", "Tonsillitis", "Epistaxis", "Laryngeal Carcinoma", "Nasal Polyps", "Tracheostomy"]
  },
  {
    name: "Orthopedics",
    weightage: "5 Marks",
    topics: ["Fracture Healing", "Bone Tumors", "Osteomyelitis", "Dislocations (Shoulder/Hip)", "Pott's Spine"]
  },
  {
    name: "Dermatology",
    weightage: "5 Marks",
    topics: ["Psoriasis", "Lichen Planus", "Scabies", "Fungal Infections", "Bullous Disorders", "Leprosy"]
  },
  {
    name: "Psychiatry",
    weightage: "5 Marks",
    topics: ["Schizophrenia", "Depression & Mania", "Anxiety Disorders", "Substance Abuse (Alcohol withdrawal)", "Antipsychotics"]
  },
  {
    name: "Radiology",
    weightage: "5 Marks",
    topics: ["X-ray signs of Chest", "CT Brain basics", "MRI basics", "FAST Scan", "Radiation Safety"]
  },
  {
    name: "Anesthesia",
    weightage: "5 Marks",
    topics: ["Pre-anesthetic Evaluation", "Intubation", "Spinal vs Epidural", "Muscle Relaxants", "Local Anesthetics"]
  }
];

// ---------------------------------------------------------------------------
// QUESTION GENERATOR ENGINE
// ---------------------------------------------------------------------------

interface QuestionTemplate {
  topic: string;
  q: string; // Question Text
  a: string; // Correct Answer
  d: string[]; // Distractors (Wrong answers)
  e: string; // Explanation
}

const SUBJECT_CONTENT: Record<string, QuestionTemplate[]> = {
  "Anatomy": [
    { topic: "Upper Limb", q: "Which nerve is injured in a fracture of the surgical neck of the humerus?", a: "Axillary nerve", d: ["Radial nerve", "Ulnar nerve", "Median nerve"], e: "The Axillary nerve wraps around the surgical neck of the humerus." },
    { topic: "Upper Limb", q: "Wrist drop is caused by injury to which nerve?", a: "Radial nerve", d: ["Median nerve", "Ulnar nerve", "Axillary nerve"], e: "Radial nerve injury, often at the spiral groove, leads to paralysis of wrist extensors." },
    { topic: "Lower Limb", q: "The Great Saphenous vein drains into which vein?", a: "Femoral vein", d: ["Popliteal vein", "External Iliac vein", "Internal Iliac vein"], e: "Drains into the Femoral vein at the saphenofemoral junction." },
    { topic: "Thorax", q: "Which structure passes through the aortic hiatus of the diaphragm?", a: "Thoracic Duct", d: ["Vagus nerve", "Phrenic nerve", "Esophagus"], e: "Aortic hiatus transmits the Aorta, Thoracic Duct, and Azygos vein." },
    { topic: "Neuroanatomy", q: "Broca's area is located in which lobe?", a: "Frontal Lobe", d: ["Temporal Lobe", "Parietal Lobe", "Occipital Lobe"], e: "Broca's area (motor speech) is in the inferior frontal gyrus." },
    { topic: "Head & Neck", q: "Which muscle causes opening of the mouth?", a: "Lateral Pterygoid", d: ["Medial Pterygoid", "Masseter", "Temporalis"], e: "Lateral Pterygoid is the only muscle of mastication that depresses the mandible (opens mouth)." },
    { topic: "Abdomen", q: "Which part of the duodenum is crossed by the Superior Mesenteric Artery?", a: "Third part", d: ["First part", "Second part", "Fourth part"], e: "The 3rd (horizontal) part is compressed between the Aorta and SMA." },
    { topic: "General", q: "Which type of joint is the Hip joint?", a: "Ball and Socket", d: ["Hinge", "Pivot", "Saddle"], e: "Hip is a synovial ball and socket joint." },
    { topic: "Upper Limb", q: "Claw hand is a feature of injury to:", a: "Ulnar nerve", d: ["Radial nerve", "Median nerve", "Axillary nerve"], e: "Ulnar nerve injury causes paralysis of interossei and lumbricals 3,4." },
    { topic: "Thorax", q: "The SA node is located in:", a: "Right Atrium", d: ["Left Atrium", "Interatrial septum", "Right Ventricle"], e: "Located at the junction of SVC and Right Atrium." },
    { topic: "Head & Neck", q: "Corneal reflex afferent limb is mediated by:", a: "Nasociliary nerve (V1)", d: ["Facial nerve", "Optic nerve", "Maxillary nerve"], e: "Afferent is CN V1, Efferent is CN VII." },
    { topic: "Abdomen", q: "Meckel's diverticulum follows the rule of:", a: "2", d: ["3", "4", "5"], e: "Rule of 2: 2 feet from IC junction, 2 inches long, 2% population." }
  ],
  "Physiology": [
    { topic: "CNS", q: "The primary neurotransmitter at the neuromuscular junction is:", a: "Acetylcholine", d: ["Dopamine", "GABA", "Serotonin"], e: "ACh binds to Nicotinic receptors at the NMJ." },
    { topic: "Renal", q: "Renin is secreted by:", a: "Juxtaglomerular cells", d: ["Macula Densa", "Mesangial cells", "Podocytes"], e: "JG cells secrete renin in response to hypotension." },
    { topic: "Endocrine", q: "Which hormone causes ovulation?", a: "LH", d: ["FSH", "Estrogen", "Progesterone"], e: "LH surge triggers ovulation." },
    { topic: "Respiratory", q: "Surfactant is produced by:", a: "Type II Pneumocytes", d: ["Type I Pneumocytes", "Macrophages", "Clara cells"], e: "Type II cells secrete dipalmitoyl phosphatidylcholine." },
    { topic: "CVS", q: "The first heart sound (S1) is due to closure of:", a: "Mitral and Tricuspid valves", d: ["Aortic and Pulmonary valves", "Mitral valve only", "Aortic valve only"], e: "Closure of AV valves (Mitral/Tricuspid)." },
    { topic: "Blood", q: "Which coagulation factor is deficient in Hemophilia A?", a: "Factor VIII", d: ["Factor IX", "Factor X", "Factor VII"], e: "Hemophilia A is Factor VIII deficiency." },
    { topic: "GIT", q: "Parietal cells of stomach secrete:", a: "HCl and Intrinsic Factor", d: ["Pepsinogen", "Gastrin", "Mucus"], e: "Parietal cells secrete Acid and IF (crucial for B12)." },
    { topic: "Nerve Muscle", q: "Which protein covers the active site on actin?", a: "Tropomyosin", d: ["Troponin C", "Troponin I", "Myosin"], e: "Tropomyosin blocks the myosin binding site at rest." },
    { topic: "Special Senses", q: "Myopia is corrected by:", a: "Concave lens", d: ["Convex lens", "Cylindrical lens", "Bifocals"], e: "Concave (minus) lenses diverge light to move focus back to retina." },
    { topic: "Endocrine", q: "Tetany is caused by:", a: "Hypocalcemia", d: ["Hypercalcemia", "Hyperkalemia", "Hyponatremia"], e: "Low calcium increases neuronal excitability." }
  ],
  "Biochemistry": [
    { topic: "Vitamins", q: "Pellagra is caused by deficiency of:", a: "Niacin (B3)", d: ["Thiamine (B1)", "Riboflavin (B2)", "Pyridoxine (B6)"], e: "3Ds: Dermatitis, Diarrhea, Dementia." },
    { topic: "Enzymes", q: "Rate limiting enzyme of Glycolysis is:", a: "PFK-1", d: ["Hexokinase", "Pyruvate Kinase", "Glucokinase"], e: "Phosphofructokinase-1 is the main control point." },
    { topic: "Metabolism", q: "Ketone bodies are produced in:", a: "Liver mitochondria", d: ["Liver cytosol", "Muscle", "Kidney"], e: "Liver is the primary site of ketogenesis." },
    { topic: "Genetics", q: "Which DNA base is not found in RNA?", a: "Thymine", d: ["Uracil", "Adenine", "Guanine"], e: "RNA contains Uracil instead of Thymine." },
    { topic: "Metabolism", q: "Von Gierke's disease is a deficiency of:", a: "Glucose-6-phosphatase", d: ["Muscle phosphorylase", "Acid maltase", "Branching enzyme"], e: "GSD Type I." },
    { topic: "Vitamins", q: "Bitot's spots are seen in deficiency of:", a: "Vitamin A", d: ["Vitamin D", "Vitamin E", "Vitamin K"], e: "Sign of Xerophthalmia." },
    { topic: "Lipids", q: "Which lipoprotein carries cholesterol from tissues to liver?", a: "HDL", d: ["LDL", "VLDL", "Chylomicrons"], e: "Reverse cholesterol transport." },
    { topic: "Amino Acids", q: "Maple Syrup Urine Disease involves metabolism of:", a: "Branched chain amino acids", d: ["Aromatic amino acids", "Sulfur amino acids", "Basic amino acids"], e: "Leucine, Isoleucine, Valine." }
  ],
  "Pathology": [
    { topic: "Cell Injury", q: "Which necrosis is characteristic of TB?", a: "Caseous necrosis", d: ["Coagulative necrosis", "Liquefactive necrosis", "Fibrinoid necrosis"], e: "Cheesy appearance, typical of Tuberculosis." },
    { topic: "Neoplasia", q: "Reed-Sternberg cells are seen in:", a: "Hodgkin's Lymphoma", d: ["Non-Hodgkin's Lymphoma", "Burkitt's Lymphoma", "Multiple Myeloma"], e: "Owl-eye cells." },
    { topic: "Genetics", q: "Philadelphia chromosome is associated with:", a: "CML", d: ["AML", "CLL", "ALL"], e: "t(9;22) BCR-ABL fusion." },
    { topic: "Inflammation", q: "First cell to migrate to site of acute inflammation:", a: "Neutrophil", d: ["Macrophage", "Lymphocyte", "Eosinophil"], e: "Neutrophils arrive first." },
    { topic: "CVS", q: "Aschoff bodies are seen in:", a: "Rheumatic Heart Disease", d: ["Infective Endocarditis", "MI", "Syphilitic Aortitis"], e: "Pathognomonic granulomatous lesions." },
    { topic: "Amyloid", q: "Stain used for Amyloid:", a: "Congo Red", d: ["H&E", "PAS", "Prussian Blue"], e: "Apple-green birefringence." },
    { topic: "Tumors", q: "Seminoma corresponds to which ovarian tumor?", a: "Dysgerminoma", d: ["Teratoma", "Choriocarcinoma", "Yolk sac tumor"], e: "Both are germ cell tumors with similar histology." },
    { topic: "GIT", q: "Skip lesions are seen in:", a: "Crohn's Disease", d: ["Ulcerative Colitis", "Typhoid", "TB Intestine"], e: "UC is continuous; Crohn's has skip areas." }
  ],
  "Microbiology": [
    { topic: "Bacteriology", q: "Causative agent of Gas Gangrene:", a: "Clostridium perfringens", d: ["Clostridium tetani", "Bacillus anthracis", "Staph aureus"], e: "Anaerobic gram positive rod." },
    { topic: "Virology", q: "Negri bodies are seen in:", a: "Rabies", d: ["Herpes", "Measles", "Pox virus"], e: "Intracytoplasmic inclusions in Rabies." },
    { topic: "Mycology", q: "Germ tube test is positive for:", a: "Candida albicans", d: ["Candida tropicalis", "Cryptococcus", "Aspergillus"], e: "Differentiates Albicans from Non-Albicans." },
    { topic: "Parasitology", q: "Vector for Malaria:", a: "Female Anopheles", d: ["Male Anopheles", "Culex", "Aedes"], e: "Transmits Plasmodium." },
    { topic: "Bacteriology", q: "Rice water stool is seen in:", a: "Cholera", d: ["Typhoid", "Dysentery", "Giardiasis"], e: "Vibrio cholerae." },
    { topic: "Virology", q: "Tzank smear is used for:", a: "Herpes/Varicella", d: ["Leprosy", "Syphilis", "Gonorrhea"], e: "Shows multinucleated giant cells." },
    { topic: "Culture", q: "Lowenstein Jensen medium is used for:", a: "Mycobacterium tuberculosis", d: ["E. coli", "Corynebacterium", "Vibrio"], e: "Selective medium for TB." },
    { topic: "Bacteriology", q: "Satellitism is shown by:", a: "Haemophilus influenzae", d: ["Staph aureus", "Streptococcus", "Pneumococcus"], e: "Grows near Staph streak." }
  ],
  "Pharmacology": [
    { topic: "General", q: "First pass metabolism occurs primarily in:", a: "Liver", d: ["Kidney", "Lungs", "Intestine"], e: "Reduces bioavailability." },
    { topic: "ANS", q: "Drug of choice for Anaphylactic shock:", a: "Adrenaline", d: ["Atropine", "Dopamine", "Noradrenaline"], e: "IM Adrenaline (1:1000)." },
    { topic: "CVS", q: "Dry cough is a side effect of:", a: "ACE Inhibitors", d: ["Beta blockers", "CCBs", "Diuretics"], e: "Due to bradykinin accumulation." },
    { topic: "Anti-TB", q: "Which drug causes Optic Neuritis?", a: "Ethambutol", d: ["Isoniazid", "Rifampicin", "Pyrazinamide"], e: "E for Eye (Ethambutol)." },
    { topic: "Toxicology", q: "Antidote for Paracetamol poisoning:", a: "N-Acetylcysteine", d: ["Atropine", "Flumazenil", "Naloxone"], e: "Replenishes glutathione." },
    { topic: "CNS", q: "Therapeutic index is a measure of:", a: "Drug safety", d: ["Drug potency", "Drug efficacy", "Drug onset"], e: "Ratio of LD50 to ED50." },
    { topic: "Antimicrobial", q: "Red man syndrome is caused by:", a: "Vancomycin", d: ["Penicillin", "Gentamicin", "Ciprofloxacin"], e: "Rapid infusion histamine release." },
    { topic: "Diuretics", q: "Furosemide acts on:", a: "Ascending Loop of Henle", d: ["PCT", "DCT", "Collecting Duct"], e: "Loop diuretic." }
  ],
  "Forensic Medicine": [
    { topic: "Thanatology", q: "Rigor mortis starts first in:", a: "Eyelids", d: ["Heart", "Legs", "Fingers"], e: "Nysten's law: Eye muscles first." },
    { topic: "Injuries", q: "Contusion implies:", a: "Bruise", d: ["Cut", "Scratch", "Stab"], e: "Extravasation of blood." },
    { topic: "Toxicology", q: "Cherry red color of blood is seen in:", a: "Carbon Monoxide", d: ["Cyanide", "Nitrate", "Phosphorus"], e: "Carboxyhemoglobin." },
    { topic: "Identification", q: "Cephalic Index is used for:", a: "Race determination", d: ["Sex determination", "Age determination", "Stature"], e: "Race identification." },
    { topic: "Courts", q: "Hostile witness is declared by:", a: "Judge", d: ["Prosecutor", "Defense lawyer", "Police"], e: "When witness turns against the party calling them." },
    { topic: "Asphyxia", q: "Ligature mark is horizontal in:", a: "Strangulation", d: ["Hanging", "Burking", "Smothering"], e: "Oblique in hanging." },
    { topic: "Toxicology", q: "Gunshot residue on hands indicates:", a: "Person fired a gun", d: ["Person held a gun", "Person cleaned a gun", "None"], e: "Recent firing." }
  ],
  "PSM (Community Medicine)": [
    { topic: "Epidemiology", q: "Denominator in Case Fatality Rate is:", a: "Total cases", d: ["Total population", "Total deaths", "Mid year population"], e: "Measures virulence." },
    { topic: "Vectors", q: "Vector for Dengue:", a: "Aedes aegypti", d: ["Anopheles", "Culex", "Sandfly"], e: "Day biter." },
    { topic: "Programs", q: "DOTS is associated with:", a: "RNTCP / NTEP", d: ["NLEP", "NVBDCP", "NACP"], e: "Tuberculosis control." },
    { topic: "Vaccines", q: "Which vaccine leaves a permanent scar?", a: "BCG", d: ["DPT", "Polio", "Hepatitis B"], e: "Intradermal injection." },
    { topic: "Health", q: "ASHA worker population coverage:", a: "1000", d: ["5000", "3000", "10000"], e: "Village level." },
    { topic: "Waste", q: "Anatomical waste color code:", a: "Yellow", d: ["Red", "Blue", "Black"], e: "Incineration." },
    { topic: "Screening", q: "Pap smear is which level of prevention?", a: "Secondary", d: ["Primary", "Tertiary", "Primordial"], e: "Early diagnosis and treatment." }
  ],
  "Ophthalmology": [
    { topic: "Retina", q: "Cherry red spot is seen in:", a: "CRAO", d: ["CRVO", "Diabetic Retinopathy", "Glaucoma"], e: "Central Retinal Artery Occlusion." },
    { topic: "Lens", q: "Most common cause of blindness in India:", a: "Cataract", d: ["Glaucoma", "Refractive error", "Vitamin A deficiency"], e: "Senile cataract." },
    { topic: "Cornea", q: "Dendritic ulcer is caused by:", a: "Herpes Simplex", d: ["Fungal", "Bacterial", "Acanthamoeba"], e: "Viral keratitis." },
    { topic: "Glaucoma", q: "Drug contraindicated in Glaucoma:", a: "Atropine", d: ["Pilocarpine", "Timolol", "Latanoprost"], e: "Mydriatics precipitate angle closure." },
    { topic: "Eyelid", q: "Chalazion is inflammation of:", a: "Meibomian gland", d: ["Zeis gland", "Moll gland", "Lacrimal gland"], e: "Chronic granulomatous inflammation." },
    { topic: "Optics", q: "Myopia is also known as:", a: "Short sightedness", d: ["Long sightedness", "Old age sight", "Lazy eye"], e: "Near objects clear, far objects blurry." }
  ],
  "ENT": [
    { topic: "Ear", q: "Grommet insertion is done for:", a: "Glue ear (OME)", d: ["CSOM", "ASOM", "Otosclerosis"], e: "Otitis Media with Effusion." },
    { topic: "Nose", q: "Commonest site of Epistaxis:", a: "Little's Area", d: ["Woodruff's area", "Turbinates", "Septum posterior"], e: "Kiesselbach's plexus." },
    { topic: "Throat", q: "Quinsy is:", a: "Peritonsillar abscess", d: ["Retropharyngeal abscess", "Parapharyngeal abscess", "Ludwig's angina"], e: "Collection of pus beside tonsil." },
    { topic: "Ear", q: "Carhart's notch is seen in:", a: "Otosclerosis", d: ["CSOM", "Meniere's", "Presbycusis"], e: "Bone conduction dip at 2000Hz." },
    { topic: "Nose", q: "Saddle nose is caused by:", a: "Syphilis", d: ["TB", "Leprosy", "Rhinoscleroma"], e: "Congenital syphilis." },
    { topic: "Larynx", q: "Singer's nodule is:", a: "Vocal nodule", d: ["Vocal polyp", "Papilloma", "Cyst"], e: "Due to voice abuse." }
  ],
  "Medicine": [
    { topic: "CVS", q: "Murmur of Mitral Stenosis:", a: "Mid-diastolic rumbling", d: ["Pansystolic", "Ejection systolic", "Early diastolic"], e: "With presystolic accentuation." },
    { topic: "Neuro", q: "Drug of choice for Status Epilepticus:", a: "Lorazepam", d: ["Phenytoin", "Valproate", "Carbamazepine"], e: "IV Benzodiazepine." },
    { topic: "Resp", q: "Most common cause of Community Acquired Pneumonia:", a: "Streptococcus pneumoniae", d: ["Staph aureus", "Klebsiella", "Mycoplasma"], e: "Pneumococcus." },
    { topic: "Endocrine", q: "Graves disease is associated with:", a: "Hyperthyroidism", d: ["Hypothyroidism", "Addison's", "Cushing's"], e: "Autoimmune thyrotoxicosis." },
    { topic: "GIT", q: "H. pylori is associated with:", a: "Peptic Ulcer", d: ["Crohn's", "UC", "Achalasia"], e: "Gastritis and Ulcers." },
    { topic: "Rheumatology", q: "Pannus formation is seen in:", a: "Rheumatoid Arthritis", d: ["Osteoarthritis", "Gout", "SLE"], e: "Synovial proliferation." },
    { topic: "Renal", q: "Most common cause of Nephrotic syndrome in children:", a: "Minimal Change Disease", d: ["Membranous", "FSGS", "IgA Nephropathy"], e: "Responds well to steroids." },
    { topic: "Blood", q: "Auer rods are seen in:", a: "AML", d: ["CML", "ALL", "CLL"], e: "Acute Myeloid Leukemia." }
  ],
  "General Surgery": [
    { topic: "Abdomen", q: "Murphy's sign is positive in:", a: "Acute Cholecystitis", d: ["Acute Appendicitis", "Pancreatitis", "Gastritis"], e: "Inspiratory arrest on RUQ palpation." },
    { topic: "Burns", q: "Rule of Nines is used for:", a: "Burn Surface Area", d: ["Burn Depth", "Dehydration", "Consciousness"], e: "Wallace Rule of 9s." },
    { topic: "Breast", q: "Most common benign breast lump:", a: "Fibroadenoma", d: ["Cyst", "Abscess", "Phyllodes"], e: "Mouse in the breast." },
    { topic: "Abdomen", q: "McBurney's point tenderness indicates:", a: "Appendicitis", d: ["Cholecystitis", "Diverticulitis", "Hernia"], e: "RLQ tenderness." },
    { topic: "Thyroid", q: "Most common thyroid malignancy:", a: "Papillary carcinoma", d: ["Follicular", "Medullary", "Anaplastic"], e: "Best prognosis." },
    { topic: "Trauma", q: "FAST scan is used for:", a: "Abdominal trauma", d: ["Head injury", "Chest pain", "Fractures"], e: "Focused Assessment with Sonography for Trauma." },
    { topic: "Hernia", q: "Hesselbach's triangle is site for:", a: "Direct Inguinal Hernia", d: ["Indirect Inguinal Hernia", "Femoral Hernia", "Umbilical Hernia"], e: "Medial to inferior epigastric vessels." }
  ],
  "Obstetrics & Gynecology": [
    { topic: "Obs", q: "Most common site of Ectopic Pregnancy:", a: "Ampulla", d: ["Isthmus", "Fimbria", "Ovary"], e: "Fallopian tube ampulla." },
    { topic: "Gynae", q: "Screening test for Cervical Cancer:", a: "Pap Smear", d: ["USG", "CA-125", "Colposcopy"], e: "Cytology." },
    { topic: "Obs", q: "Drug of choice for Eclampsia:", a: "Magnesium Sulfate", d: ["Diazepam", "Phenytoin", "Labetalol"], e: "Prevents seizures." },
    { topic: "Gynae", q: "Strawberry cervix is seen in:", a: "Trichomonas", d: ["Candida", "Gardnerella", "Chlamydia"], e: "Punctate hemorrhages." },
    { topic: "Obs", q: "Active management of 3rd stage of labor prevents:", a: "PPH", d: ["Inversion", "Sepsis", "Tears"], e: "Post Partum Hemorrhage." },
    { topic: "Gynae", q: "Chocolate cyst is seen in:", a: "Endometriosis", d: ["PCOS", "Dermoid", "Fibroid"], e: "Ovarian endometriosis." },
    { topic: "Obs", q: "Physiological anemia of pregnancy is due to:", a: "Hemodilution", d: ["Iron deficiency", "Blood loss", "Hemolysis"], e: "Plasma volume increases > RBC mass." }
  ],
  "Pediatrics": [
    { topic: "Infections", q: "Koplik spots are seen in:", a: "Measles", d: ["Mumps", "Rubella", "Chickenpox"], e: "Pathognomonic enanthem." },
    { topic: "Development", q: "Social smile appears at:", a: "2 months", d: ["4 months", "6 months", "1 month"], e: "Milestone." },
    { topic: "Neonatology", q: "Vitamin K is given at birth to prevent:", a: "Hemorrhagic disease of newborn", d: ["Jaundice", "Rickets", "Scurvy"], e: "Clotting factor deficiency." },
    { topic: "Cardio", q: "Tetralogy of Fallot includes:", a: "VSD, PS, Overriding Aorta, RVH", d: ["ASD, PS, RVH", "VSD, AS, LVH", "PDA, VSD"], e: "Cyanotic heart disease." },
    { topic: "Nutrition", q: "Flag sign of hair is seen in:", a: "Kwashiorkor", d: ["Marasmus", "Scurvy", "Rickets"], e: "Protein deficiency." },
    { topic: "GI", q: "Projectile vomiting is seen in:", a: "Pyloric Stenosis", d: ["Intussusception", "GERD", "Atresia"], e: "Hypertrophic Pyloric Stenosis." },
    { topic: "Genetics", q: "Trisomy 21 is:", a: "Down Syndrome", d: ["Edward", "Patau", "Turner"], e: "Mongolism." }
  ],
  "Orthopedics": [
    { topic: "Fractures", q: "Colles fracture is fracture of:", a: "Distal end of radius", d: ["Scaphoid", "Humerus", "Ulna"], e: "Dinner fork deformity." },
    { topic: "Bone", q: "Bamboo spine is seen in:", a: "Ankylosing Spondylitis", d: ["RA", "OA", "Gout"], e: "Fusion of vertebrae." },
    { topic: "Infection", q: "Sequestrum is seen in:", a: "Chronic Osteomyelitis", d: ["Acute Osteomyelitis", "TB", "Tumor"], e: "Dead bone." },
    { topic: "Tumor", q: "Sunburst appearance is seen in:", a: "Osteosarcoma", d: ["Ewing's", "Giant Cell Tumor", "Chondrosarcoma"], e: "Aggressive periosteal reaction." },
    { topic: "Nerve", q: "Wrist drop is due to:", a: "Radial nerve injury", d: ["Ulnar nerve", "Median nerve", "Axillary nerve"], e: "Extensor paralysis." }
  ],
  "Dermatology": [
    { topic: "Signs", q: "Auspitz sign is positive in:", a: "Psoriasis", d: ["Lichen Planus", "Eczema", "Pemphigus"], e: "Pinpoint bleeding." },
    { topic: "Infections", q: "Burrow is pathognomonic of:", a: "Scabies", d: ["Lice", "Ticks", "Mites"], e: "Sarcoptes scabiei." },
    { topic: "Bullous", q: "Tzanck smear is used for:", a: "Pemphigus", d: ["Psoriasis", "Acne", "Vitiligo"], e: "Acantholytic cells." },
    { topic: "Papulosquamous", q: "Wickham's striae are seen in:", a: "Lichen Planus", d: ["Psoriasis", "Pityriasis Rosea", "Eczema"], e: "White lacy pattern." },
    { topic: "Infections", q: "Honey colored crust is seen in:", a: "Impetigo", d: ["Ecthyma", "Furuncle", "Carbuncle"], e: "Staph/Strep infection." }
  ],
  "Psychiatry": [
    { topic: "Psychosis", q: "Auditory hallucinations are common in:", a: "Schizophrenia", d: ["Depression", "Mania", "Delirium"], e: "First rank symptom." },
    { topic: "Therapy", q: "ECT is most effective in:", a: "Severe Depression", d: ["Anxiety", "OCD", "Phobia"], e: "Suicidal depression." },
    { topic: "Addiction", q: "Delirium tremens is seen in withdrawal of:", a: "Alcohol", d: ["Opioids", "Cannabis", "Cocaine"], e: "Visual hallucinations/tremors." },
    { topic: "Drugs", q: "Lithium is used for:", a: "Bipolar Disorder", d: ["Schizophrenia", "Anxiety", "Sleep"], e: "Mood stabilizer." },
    { topic: "Signs", q: "Waxy flexibility is seen in:", a: "Catatonia", d: ["Mania", "Depression", "Delusion"], e: "Schizophrenia subtype." }
  ],
  "Radiology": [
    { topic: "Chest", q: "Silhouette sign is seen in:", a: "Pneumonia/Consolidation", d: ["Pneumothorax", "Effusion", "Fibrosis"], e: "Loss of heart border." },
    { topic: "Head", q: "Best investigation for acute hemorrhage:", a: "NCCT Head", d: ["MRI", "X-ray", "USG"], e: "Blood appears hyperdense." },
    { topic: "Obs", q: "Snow storm appearance on USG:", a: "Hydatidiform Mole", d: ["Ectopic", "Fibroid", "Cyst"], e: "Vesicular pattern." },
    { topic: "GI", q: "Bird beak appearance is seen in:", a: "Achalasia Cardia", d: ["Ca Esophagus", "Stricture", "Hernia"], e: "Barium swallow." },
    { topic: "Bone", q: "Onion peel appearance is seen in:", a: "Ewing's Sarcoma", d: ["Osteosarcoma", "Osteoclastoma", "Chondroma"], e: "Periosteal reaction." }
  ],
  "Anesthesia": [
    { topic: "Drugs", q: "Ketamine causes:", a: "Dissociative Anesthesia", d: ["Sleep", "Paralysis", "Analgesia only"], e: "Hallucinogenic." },
    { topic: "Equipment", q: "Color of Oxygen cylinder:", a: "Black body white shoulder", d: ["Blue", "Gray", "Black"], e: "Standard code." },
    { topic: "Relaxants", q: "Succinylcholine is a:", a: "Depolarizing muscle relaxant", d: ["Non-depolarizing", "Local anesthetic", "Sedative"], e: "Short acting." },
    { topic: "Spinal", q: "Landmark for spinal anesthesia:", a: "Tuffier's line (L4)", d: ["T10", "L1", "S1"], e: "Iliac crests." },
    { topic: "Complications", q: "Malignant hyperthermia is triggered by:", a: "Halothane/Scoline", d: ["Propofol", "Ketamine", "Nitrous oxide"], e: "Dantrolene is antidote." }
  ]
};

// ---------------------------------------------------------------------------
// GENERATION LOGIC
// ---------------------------------------------------------------------------

/**
 * Generates the full Question bank by expanding the template data.
 * This allows us to have hundreds of unique questions without massive code files.
 */
const generateBank = (): Question[] => {
  const bank: Question[] = [];
  let idCounter = 1000;

  Object.entries(SUBJECT_CONTENT).forEach(([subject, templates]) => {
    templates.forEach(t => {
      bank.push({
        id: idCounter++,
        text: t.q,
        options: [t.a, ...t.d].sort(() => Math.random() - 0.5), // Shuffle options
        correctAnswerIndex: 0, // We need to find the index after shuffle
        explanation: t.e,
        subject: subject,
        topic: t.topic
      });
    });
  });

  // Fix correct answer index after shuffle
  return bank.map(q => {
    const originalAnswer = SUBJECT_CONTENT[q.subject]
        .find(t => t.q === q.text)?.a;
    
    return {
      ...q,
      correctAnswerIndex: q.options.indexOf(originalAnswer || "")
    };
  });
};

// Initialize the bank once
const FULL_QUESTION_BANK = generateBank();

/**
 * Retrieves questions for a subject.
 * Simulates "infinite" questions by recycling content with unique IDs if requested count is high.
 */
export const getQuestionsForSubject = (subject: string | 'Mixed', count: number): Question[] => {
  let pool = subject === 'Mixed' 
    ? FULL_QUESTION_BANK 
    : FULL_QUESTION_BANK.filter(q => q.subject === subject);

  if (pool.length === 0) return [];

  const results: Question[] = [];
  
  // Logic to fill the requested count
  for (let i = 0; i < count; i++) {
    // Pick a question (cyclically if count > pool size)
    const baseQ = pool[i % pool.length];
    
    // Create a unique instance
    // If we are looping (i >= pool.length), we are effectively "practicing again"
    // but the system treats it as a new entry.
    results.push({
      ...baseQ,
      id: parseInt(`${baseQ.id}${i}${Date.now().toString().slice(-4)}`), // Unique ID for React keys
      options: [...baseQ.options].sort(() => Math.random() - 0.5) // Reshuffle options for variety
    });

    // Re-calculate correct index for the new instance
    const newQ = results[results.length - 1];
    const originalAnswer = SUBJECT_CONTENT[newQ.subject]?.find(t => t.q === newQ.text)?.a || baseQ.options[baseQ.correctAnswerIndex];
    newQ.correctAnswerIndex = newQ.options.indexOf(originalAnswer);
  }
  
  return results;
};

export const getDiagnosticQuestions = (): Question[] => {
  return DIAGNOSTIC_QUESTIONS;
};

// ---------------------------------------------------------------------------
// DIAGNOSTIC DATA (Static 20 Integrated Questions)
// ---------------------------------------------------------------------------
export const DIAGNOSTIC_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "A 60-year-old hypertensive diabetic presents with sudden right-sided weakness and aphasia. CT shows left MCA infarct. What is the most likely pathophysiological mechanism?",
    options: ["Thromboembolism/atherothrombosis", "Rupture of berry aneurysm", "Venous sinus thrombosis", "Lacunar infarct"],
    correctAnswerIndex: 0,
    explanation: "Sudden focal deficit (right hemiparesis + aphasia) maps to the MCA territory. In a hypertensive-diabetic, atherothrombotic occlusion or thromboembolism is the primary mechanism.",
    subject: "Medicine",
    relatedSubjects: ["Medicine", "Pathology", "Anatomy"],
    topic: "Stroke"
  },
  {
    id: 2,
    text: "A child has a fever, barking cough, stridor, and a steeple sign on X-ray. Best initial treatment?",
    options: ["Intravenous Antibiotics", "Nebulized epinephrine and steroids", "Immediate Intubation", "Bronchodilators"],
    correctAnswerIndex: 1,
    explanation: "This is Croup (Laryngotracheobronchitis). The first line management for significant stridor is nebulized epinephrine (racemic) and corticosteroids (dexamethasone).",
    subject: "Pediatrics",
    relatedSubjects: ["Pediatrics", "ENT", "Pharmacology"],
    topic: "Respiratory Infections"
  },
  {
    id: 3,
    text: "A young woman on OCPs develops right calf swelling and pain, Doppler positive for DVT. What vitamin is affected by her therapy?",
    options: ["Vitamin C", "Vitamin D", "Vitamin K", "Vitamin B12"],
    correctAnswerIndex: 2,
    explanation: "OCPs increase the risk of thrombosis. Vitamin K is the key factor in the coagulation cascade (Factors II, VII, IX, X). While OCPs don't cause Vit K deficiency, the clotting mechanism involving Vit K is central to the pathology.",
    subject: "Medicine",
    relatedSubjects: ["Medicine", "Pharmacology", "Biochemistry"],
    topic: "Thrombosis"
  },
  {
    id: 4,
    text: "Man with chest pain radiating to the left arm, ECG shows ST elevation in V2-V4, Troponin I elevated. Next best step?",
    options: ["Oral Aspirin and wait", "Immediate reperfusion (PCI)", "Echo", "Coronary artery bypass graft"],
    correctAnswerIndex: 1,
    explanation: "This is an acute Anterior Wall MI (STEMI). The standard of care is immediate reperfusion therapy, preferably Percutaneous Coronary Intervention (PCI).",
    subject: "Medicine",
    relatedSubjects: ["Medicine", "Physiology", "Pathology"],
    topic: "Ischemic Heart Disease"
  },
  {
    id: 5,
    text: "Patient with polyuria, polydipsia, hyperosmolar plasma, but urine is not concentrated after ADH administration. Diagnosis?",
    options: ["Central Diabetes Insipidus", "Nephrogenic Diabetes Insipidus", "Psychogenic Polydipsia", "Diabetes Mellitus"],
    correctAnswerIndex: 1,
    explanation: "In Nephrogenic DI, the kidneys do not respond to ADH. Thus, administering exogenous ADH (Desmopressin) fails to concentrate the urine, unlike Central DI.",
    subject: "Medicine",
    relatedSubjects: ["Medicine", "Physiology", "Biochemistry"],
    topic: "Endocrinology"
  },
  {
    id: 6,
    text: "Woman with fatigue, pallor, RBCs showing macrocytosis, hypersegmented neutrophils. What is the most specific diagnostic test?",
    options: ["Serum Ferritin", "Serum Methylmalonic acid", "Serum Iron", "Hb Electrophoresis"],
    correctAnswerIndex: 1,
    explanation: "Megaloblastic anemia (B12/Folate def). Elevated Methylmalonic acid is specific for Vitamin B12 deficiency (distinguishing it from Folate deficiency).",
    subject: "Pathology",
    relatedSubjects: ["Pathology", "Medicine", "Biochemistry"],
    topic: "Anemia"
  },
  {
    id: 7,
    text: "Child with fever, Koplik spots, coryza, confluent rash over face and trunk. Most likely etiology?",
    options: ["Measles (Paramyxovirus)", "Rubella (Togavirus)", "Chickenpox (VZV)", "Roseola (HHV-6)"],
    correctAnswerIndex: 0,
    explanation: "Koplik spots are pathognomonic for Measles. The prodrome of Cough, Coryza, Conjunctivitis followed by a rash is classic.",
    subject: "Pediatrics",
    relatedSubjects: ["Pediatrics", "Microbiology", "Dermatology"],
    topic: "Exanthematous Fevers"
  },
  {
    id: 8,
    text: "Post-op patient develops dyspnea, tachycardia, chest pain; CXR is normal. Most probable diagnosis?",
    options: ["Pneumonia", "Pulmonary Embolism", "Atelectasis", "Pneumothorax"],
    correctAnswerIndex: 1,
    explanation: "Sudden onset dyspnea and tachycardia in a post-op patient with a normal Chest X-ray is highly suggestive of Pulmonary Embolism.",
    subject: "General Surgery",
    relatedSubjects: ["General Surgery", "Medicine", "Pathology"],
    topic: "Post-op Complications"
  },
  {
    id: 9,
    text: "Neonate with bilious vomiting, scaphoid abdomen, air-fluid levels on X-ray. What’s the diagnosis?",
    options: ["Pyloric Stenosis", "Intestinal Atresia", "Hirschsprung Disease", "Intussusception"],
    correctAnswerIndex: 1,
    explanation: "Bilious vomiting implies obstruction distal to the ampulla of Vater. Scaphoid abdomen suggests high obstruction. Air-fluid levels confirm obstruction (Duodenal/Jejunal atresia).",
    subject: "Pediatrics",
    relatedSubjects: ["Pediatrics", "Radiology", "General Surgery"],
    topic: "Neonatal Surgery"
  },
  {
    id: 10,
    text: "Febrile patient with petechial rash, hypotension, Waterhouse-Friderichsen syndrome. Which organism?",
    options: ["Staphylococcus aureus", "Neisseria meningitidis", "Streptococcus pneumoniae", "Haemophilus influenzae"],
    correctAnswerIndex: 1,
    explanation: "Waterhouse-Friderichsen syndrome (adrenal hemorrhage) is a fulminant complication of meningococcemia caused by Neisseria meningitidis.",
    subject: "Microbiology",
    relatedSubjects: ["Microbiology", "Medicine", "Pathology"],
    topic: "CNS Infections"
  },
  {
    id: 11,
    text: "Young man has sudden painless vision loss; fundus: cherry red spot. What’s occluded?",
    options: ["Central Retinal Vein", "Central Retinal Artery", "Ophthalmic Artery", "Posterior Ciliary Artery"],
    correctAnswerIndex: 1,
    explanation: "A Cherry Red Spot at the macula with a pale retina is the hallmark of Central Retinal Artery Occlusion (CRAO).",
    subject: "Ophthalmology",
    relatedSubjects: ["Ophthalmology", "Anatomy", "Medicine"],
    topic: "Retina"
  },
  {
    id: 12,
    text: "Child with 15% burns (anterior torso, one arm). Next best management?",
    options: ["Antibiotic ointment", "Fluid resuscitation", "Skin grafting", "Tetanus toxoid only"],
    correctAnswerIndex: 1,
    explanation: "Burns >10% TBSA in children require immediate systemic fluid resuscitation (Parkland formula) to prevent hypovolemic shock.",
    subject: "General Surgery",
    relatedSubjects: ["General Surgery", "Pediatrics", "Physiology"],
    topic: "Burns"
  },
  {
    id: 13,
    text: "Carotid sinus stimulation causes which physiological effect?",
    options: ["Tachycardia and Hypertension", "Bradycardia and Hypotension", "Tachycardia and Hypotension", "Bradycardia and Hypertension"],
    correctAnswerIndex: 1,
    explanation: "Carotid sinus stimulation activates baroreceptors, increasing parasympathetic discharge (Vagus) and decreasing sympathetic tone, causing bradycardia and hypotension.",
    subject: "Physiology",
    relatedSubjects: ["Physiology", "Pharmacology"],
    topic: "Cardiovascular Regulation"
  },
  {
    id: 14,
    text: "Man on anti-tubercular therapy with orange urine, visual changes. Which drug responsible?",
    options: ["Isoniazid", "Rifampicin", "Pyrazinamide", "Ethambutol"],
    correctAnswerIndex: 1,
    explanation: "Rifampicin typically causes orange/red discoloration of body fluids (urine, tears). (Note: Ethambutol causes visual changes, but the orange urine points specifically to Rifampicin in this combined option set, or Rifampicin is the primary answer for the color change).",
    subject: "Pharmacology",
    relatedSubjects: ["Pharmacology", "Microbiology"],
    topic: "Antimicrobials"
  },
  {
    id: 15,
    text: "Girl with malar rash, oral ulcers, proteinuria, positive ANA. Next investigation?",
    options: ["Anti-dsDNA antibodies", "Rheumatoid Factor", "Anti-CCP", "ASO Titer"],
    correctAnswerIndex: 0,
    explanation: "The presentation is classic for Systemic Lupus Erythematosus (SLE). Anti-dsDNA is highly specific for SLE and correlates with disease activity (especially renal).",
    subject: "Medicine",
    relatedSubjects: ["Medicine", "Pathology", "Immunology"],
    topic: "Autoimmune Diseases"
  },
  {
    id: 16,
    text: "Patient with abdominal pain, bloody diarrhea, lead pipe colon on barium enema. Diagnosis?",
    options: ["Crohn's Disease", "Ulcerative Colitis", "Colorectal Cancer", "Diverticulitis"],
    correctAnswerIndex: 1,
    explanation: "Lead pipe appearance (loss of haustra) and bloody diarrhea are classic features of Ulcerative Colitis.",
    subject: "Medicine",
    relatedSubjects: ["Medicine", "Pathology", "Radiology"],
    topic: "GI Pathology"
  },
  {
    id: 17,
    text: "Pregnant woman, no prior pregnancies, Rh-negative. Husband Rh-positive. Next step?",
    options: ["Give Anti-D immediately", "Indirect Coombs test", "Direct Coombs test", "Amniocentesis"],
    correctAnswerIndex: 1,
    explanation: "First step is to check for sensitization using the Indirect Coombs Test (ICT). If negative, Anti-D is given at 28 weeks and after delivery.",
    subject: "Obstetrics & Gynecology",
    relatedSubjects: ["Obstetrics & Gynecology", "Medicine", "Immunology"],
    topic: "Pregnancy Complications"
  },
  {
    id: 18,
    text: "Man with projectile vomiting, visible peristalsis, palpable olive. What’s the electrolyte finding?",
    options: ["Hyperchloremic metabolic acidosis", "Hypochloremic metabolic alkalosis", "Hyperkalemic metabolic acidosis", "Respiratory alkalosis"],
    correctAnswerIndex: 1,
    explanation: "Congenital Hypertrophic Pyloric Stenosis causes loss of gastric acid (HCl) via vomiting, leading to Hypochloremic Metabolic Alkalosis.",
    subject: "Pediatrics",
    relatedSubjects: ["Pediatrics", "General Surgery", "Biochemistry"],
    topic: "GI Disorders"
  },
  {
    id: 19,
    text: "Woman with bone pain, hypercalcemia, raised PTH. What’s most specific test?",
    options: ["Serum Calcium", "Sestamibi scan", "Thyroid ultrasound", "Bone scan"],
    correctAnswerIndex: 1,
    explanation: "Primary Hyperparathyroidism. A Sestamibi (Technetium-99m) scan is the specific nuclear medicine scan used to localize a parathyroid adenoma.",
    subject: "Medicine",
    relatedSubjects: ["Medicine", "Biochemistry", "Pathology"],
    topic: "Endocrine Disorders"
  },
  {
    id: 20,
    text: "Patient with cough, hemoptysis, apical cavitation on CXR, AFB positive. What is the 1st line drug?",
    options: ["Ciprofloxacin", "Isoniazid", "Azithromycin", "Doxycycline"],
    correctAnswerIndex: 1,
    explanation: "Pulmonary Tuberculosis. Isoniazid (along with Rifampicin, Pyrazinamide, Ethambutol) is the first-line cornerstone therapy.",
    subject: "Medicine",
    relatedSubjects: ["Medicine", "Microbiology", "Pharmacology"],
    topic: "Respiratory Infections"
  }
];
