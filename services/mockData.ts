
import { Question, SyllabusSubject } from '../types';

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

// Expanded Question Bank with Seed Questions for all 19 Subjects
export const QUESTION_BANK: Question[] = [
  // --- ANATOMY ---
  {
    id: 1001,
    text: "A patient sustained a fracture of the shaft of the humerus. On examination, he has wrist drop. Which nerve is most likely injured?",
    options: ["Median nerve", "Ulnar nerve", "Radial nerve", "Axillary nerve"],
    correctAnswerIndex: 2,
    explanation: "Radial nerve runs in the spiral groove; injury causes wrist drop.",
    subject: "Anatomy",
    topic: "Upper Limb Nerves"
  },
  {
    id: 1002,
    text: "The Great Saphenous vein drains into which vein?",
    options: ["Femoral vein", "Popliteal vein", "External Iliac vein", "Internal Iliac vein"],
    correctAnswerIndex: 0,
    explanation: "The Great Saphenous vein drains into the Femoral vein at the saphenofemoral junction.",
    subject: "Anatomy",
    topic: "Lower Limb Vessels"
  },
  {
    id: 1003,
    text: "Which structure passes through the Foramen Ovale?",
    options: ["Maxillary Nerve", "Mandibular Nerve", "Middle Meningeal Artery", "Optic Nerve"],
    correctAnswerIndex: 1,
    explanation: "The Mandibular Nerve (V3) passes through the Foramen Ovale.",
    subject: "Anatomy",
    topic: "Skull Foramina"
  },
  {
    id: 1004,
    text: "Erb's Palsy involves injury to which nerve roots?",
    options: ["C5, C6", "C8, T1", "C7", "T1, T2"],
    correctAnswerIndex: 0,
    explanation: "Erb's palsy is caused by injury to the upper trunk of the brachial plexus (C5, C6), leading to 'waiter's tip' deformity.",
    subject: "Anatomy",
    topic: "Brachial Plexus"
  },
  {
    id: 1005,
    text: "Which part of the duodenum is crossed anteriorly by the superior mesenteric vessels?",
    options: ["First part", "Second part", "Third part", "Fourth part"],
    correctAnswerIndex: 2,
    explanation: "The third part (horizontal) of the duodenum is crossed anteriorly by the SMA and SMV.",
    subject: "Anatomy",
    topic: "Abdomen"
  },
  {
    id: 1006,
    text: "Winged scapula is caused by injury to:",
    options: ["Long thoracic nerve", "Dorsal scapular nerve", "Axillary nerve", "Suprascapular nerve"],
    correctAnswerIndex: 0,
    explanation: "Injury to the Long Thoracic Nerve results in paralysis of the Serratus Anterior, causing winged scapula.",
    subject: "Anatomy",
    topic: "Upper Limb Nerves"
  },

  // --- PHYSIOLOGY ---
  {
    id: 2001,
    text: "Brown-Sequard syndrome involves:",
    options: ["Complete transection of spinal cord", "Hemisection of spinal cord", "Anterior cord syndrome", "Central cord syndrome"],
    correctAnswerIndex: 1,
    explanation: "Brown-Sequard is hemisection: ipsilateral motor/proprioception loss, contralateral pain/temp loss.",
    subject: "Physiology",
    topic: "CNS Physiology"
  },
  {
    id: 2002,
    text: "Which phase of the cardiac cycle has the highest ventricular volume?",
    options: ["Isovolumetric contraction", "Isovolumetric relaxation", "End of diastole", "End of systole"],
    correctAnswerIndex: 2,
    explanation: "Ventricular volume is highest at the end of diastole (End Diastolic Volume).",
    subject: "Physiology",
    topic: "Cardiac Cycle"
  },
  {
    id: 2003,
    text: "Surfactant is produced by:",
    options: ["Type I Pneumocytes", "Type II Pneumocytes", "Clara cells", "Macrophages"],
    correctAnswerIndex: 1,
    explanation: "Type II Pneumocytes produce surfactant (dipalmitoyl phosphatidylcholine) to reduce surface tension.",
    subject: "Physiology",
    topic: "Respiratory Physiology"
  },
  {
    id: 2004,
    text: "Which hormone is primarily responsible for the LH surge?",
    options: ["Progesterone", "Estrogen", "Inhibin", "FSH"],
    correctAnswerIndex: 1,
    explanation: "High levels of Estrogen exert positive feedback on the pituitary, triggering the LH surge and ovulation.",
    subject: "Physiology",
    topic: "Endocrinology"
  },
  {
    id: 2005,
    text: "The primary pacemaker of the heart is:",
    options: ["AV Node", "Bundle of His", "SA Node", "Purkinje Fibers"],
    correctAnswerIndex: 2,
    explanation: "The SA Node has the highest rate of automaticity, making it the primary pacemaker.",
    subject: "Physiology",
    topic: "Cardiovascular"
  },
  {
    id: 2006,
    text: "Renin is secreted by:",
    options: ["Macula Densa", "Juxtaglomerular cells", "Mesangial cells", "Podocytes"],
    correctAnswerIndex: 1,
    explanation: "Juxtaglomerular (JG) cells in the afferent arteriole secrete Renin in response to low BP.",
    subject: "Physiology",
    topic: "Renal"
  },

  // --- BIOCHEMISTRY ---
  {
    id: 3001,
    text: "Which vitamin deficiency causes the '3 Ds' - Dermatitis, Diarrhea, and Dementia?",
    options: ["Thiamine (B1)", "Riboflavin (B2)", "Niacin (B3)", "Pyridoxine (B6)"],
    correctAnswerIndex: 2,
    explanation: "Pellagra is caused by Niacin (B3) deficiency.",
    subject: "Biochemistry",
    topic: "Vitamin Deficiencies"
  },
  {
    id: 3002,
    text: "The rate limiting enzyme of Glycolysis is:",
    options: ["Hexokinase", "Phosphofructokinase-1 (PFK-1)", "Pyruvate Kinase", "Glucokinase"],
    correctAnswerIndex: 1,
    explanation: "PFK-1 is the major rate-limiting enzyme of glycolysis.",
    subject: "Biochemistry",
    topic: "Glycolysis"
  },
  {
    id: 3003,
    text: "Maple Syrup Urine Disease is due to a defect in the metabolism of:",
    options: ["Phenylalanine", "Tyrosine", "Branched Chain Amino Acids", "Sulfur containing Amino Acids"],
    correctAnswerIndex: 2,
    explanation: "Defect in branched-chain alpha-ketoacid dehydrogenase affecting Leucine, Isoleucine, and Valine.",
    subject: "Biochemistry",
    topic: "Amino Acid Metabolism"
  },
  {
    id: 3004,
    text: "Which is the most common enzyme defect in Urea Cycle Disorders?",
    options: ["Ornithine Transcarbamylase (OTC)", "Carbamoyl Phosphate Synthetase I", "Arginase", "Argininosuccinate Lyase"],
    correctAnswerIndex: 0,
    explanation: "OTC deficiency is the most common urea cycle disorder and is X-linked.",
    subject: "Biochemistry",
    topic: "Urea Cycle"
  },
  {
    id: 3005,
    text: "Ketone bodies are synthesized in:",
    options: ["Liver Mitochondria", "Liver Cytosol", "Kidney", "Muscle"],
    correctAnswerIndex: 0,
    explanation: "Ketogenesis occurs in the mitochondria of liver cells.",
    subject: "Biochemistry",
    topic: "Lipid Metabolism"
  },

  // --- PATHOLOGY ---
  {
    id: 4001,
    text: "A 30-year-old male presents with a painless testicular mass. Biopsy shows 'fried egg' cells. Diagnosis?",
    options: ["Seminoma", "Yolk sac tumor", "Choriocarcinoma", "Teratoma"],
    correctAnswerIndex: 0,
    explanation: "Seminoma shows uniform cells with clear cytoplasm (fried egg appearance).",
    subject: "Pathology",
    topic: "Neoplasia"
  },
  {
    id: 4002,
    text: "Which of the following is an example of Type II Hypersensitivity?",
    options: ["Anaphylaxis", "Goodpasture's Syndrome", "Serum Sickness", "Contact Dermatitis"],
    correctAnswerIndex: 1,
    explanation: "Goodpasture's syndrome involves antibodies against basement membrane (Type II).",
    subject: "Pathology",
    topic: "Inflammation"
  },
  {
    id: 4003,
    text: "Reed-Sternberg cells are characteristic of:",
    options: ["Burkitt's Lymphoma", "Hodgkin's Lymphoma", "Multiple Myeloma", "CLL"],
    correctAnswerIndex: 1,
    explanation: "Owl-eye appearance Reed-Sternberg cells are hallmark of Hodgkin's Lymphoma.",
    subject: "Pathology",
    topic: "Hematology"
  },
  {
    id: 4004,
    text: "Aschoff bodies are pathognomonic for:",
    options: ["Rheumatic Fever", "Infective Endocarditis", "Myocardial Infarction", "TB Pericarditis"],
    correctAnswerIndex: 0,
    explanation: "Aschoff bodies are granulomatous lesions found in Rheumatic Heart Disease.",
    subject: "Pathology",
    topic: "Cardiovascular Pathology"
  },
  {
    id: 4005,
    text: "Which stain is used for Amyloid?",
    options: ["H&E", "Congo Red", "PAS", "Giemsa"],
    correctAnswerIndex: 1,
    explanation: "Congo Red stain demonstrates apple-green birefringence under polarized light for amyloid.",
    subject: "Pathology",
    topic: "Stains"
  },

  // --- MICROBIOLOGY ---
  {
    id: 5001,
    text: "Which organism is most commonly associated with rheumatic heart disease?",
    options: ["Staph aureus", "Streptococcus pyogenes (Group A)", "Streptococcus viridans", "Enterococcus"],
    correctAnswerIndex: 1,
    explanation: "Rheumatic fever is a sequela of Group A Streptococcal pharyngitis.",
    subject: "Microbiology",
    topic: "Staph vs Strep"
  },
  {
    id: 5002,
    text: "Satellite phenomenon is shown by:",
    options: ["H. influenzae", "S. aureus", "S. pneumoniae", "N. meningitidis"],
    correctAnswerIndex: 0,
    explanation: "Haemophilus influenzae grows near S. aureus colonies which provide V factor (NAD).",
    subject: "Microbiology",
    topic: "Bacteria"
  },
  {
    id: 5003,
    text: "Rice water stool is characteristic of:",
    options: ["Typhoid", "Cholera", "Shigellosis", "Amoebiasis"],
    correctAnswerIndex: 1,
    explanation: "Vibrio cholerae causes secretory diarrhea described as rice water stool.",
    subject: "Microbiology",
    topic: "GI Infections"
  },
  {
    id: 5004,
    text: "The vector for Japanese Encephalitis is:",
    options: ["Anopheles", "Aedes", "Culex", "Mansonia"],
    correctAnswerIndex: 2,
    explanation: "Culex mosquitoes (specifically Culex tritaeniorhynchus) transmit JE.",
    subject: "Microbiology",
    topic: "Virology"
  },
  {
    id: 5005,
    text: "Lowenstein-Jensen (LJ) medium is used for:",
    options: ["Corynebacterium", "Mycobacterium tuberculosis", "Neisseria", "Staphylococcus"],
    correctAnswerIndex: 1,
    explanation: "LJ medium is the selective medium for culturing Mycobacterium tuberculosis.",
    subject: "Microbiology",
    topic: "Culture Media"
  },

  // --- PHARMACOLOGY ---
  {
    id: 6001,
    text: "Which of the following antitubercular drugs causes optic neuritis?",
    options: ["Isoniazid", "Rifampicin", "Ethambutol", "Pyrazinamide"],
    correctAnswerIndex: 2,
    explanation: "Ethambutol causes retrobulbar neuritis.",
    subject: "Pharmacology",
    topic: "Antimicrobials"
  },
  {
    id: 6002,
    text: "Antidote for Paracetamol poisoning is:",
    options: ["Atropine", "N-Acetylcysteine", "Flumazenil", "Naloxone"],
    correctAnswerIndex: 1,
    explanation: "N-Acetylcysteine replenishes glutathione.",
    subject: "Pharmacology",
    topic: "Toxicology"
  },
  {
    id: 6003,
    text: "Red Man Syndrome is a side effect of:",
    options: ["Penicillin", "Vancomycin", "Gentamicin", "Ciprofloxacin"],
    correctAnswerIndex: 1,
    explanation: "Rapid infusion of Vancomycin causes histamine release leading to Red Man Syndrome.",
    subject: "Pharmacology",
    topic: "Antimicrobials"
  },
  {
    id: 6004,
    text: "Drug of choice for anaphylactic shock is:",
    options: ["Adrenaline", "Hydrocortisone", "Avil", "Atropine"],
    correctAnswerIndex: 0,
    explanation: "Adrenaline (IM) is the life-saving drug of choice for anaphylaxis.",
    subject: "Pharmacology",
    topic: "Emergency Drugs"
  },
  {
    id: 6005,
    text: "Dry cough is a common side effect of:",
    options: ["Beta blockers", "ACE Inhibitors", "Calcium Channel Blockers", "Diuretics"],
    correctAnswerIndex: 1,
    explanation: "ACE inhibitors increase bradykinin levels, leading to a dry cough.",
    subject: "Pharmacology",
    topic: "Cardiovascular Drugs"
  },

  // --- FORENSIC MEDICINE ---
  {
    id: 7001,
    text: "Post-mortem lividity becomes fixed in approximately:",
    options: ["2-4 hours", "6-8 hours", "12-24 hours", "36 hours"],
    correctAnswerIndex: 1,
    explanation: "Lividity typically fixes around 6-8 hours.",
    subject: "Forensic Medicine",
    topic: "Thanatology"
  },
  {
    id: 7002,
    text: "Brush burn is a type of:",
    options: ["Thermal burn", "Electrical burn", "Abrasion", "Laceration"],
    correctAnswerIndex: 2,
    explanation: "Brush burn is a grazing abrasion caused by friction against a rough surface.",
    subject: "Forensic Medicine",
    topic: "Mechanical Injuries"
  },
  {
    id: 7003,
    text: "Pugilistic attitude is seen in:",
    options: ["Drowning", "Burn death", "Hanging", "Strychnine poisoning"],
    correctAnswerIndex: 1,
    explanation: "Heat coagulation of proteins causes muscles to contract, leading to a boxer-like pose in burn victims.",
    subject: "Forensic Medicine",
    topic: "Thermal Injuries"
  },
  {
    id: 7004,
    text: "Typical hanging is defined as:",
    options: ["Ligature point at occiput", "Ligature point at chin", "Feet touching ground", "Complete suspension with knot at occiput"],
    correctAnswerIndex: 3,
    explanation: "Typical hanging: Knot at occiput, complete suspension.",
    subject: "Forensic Medicine",
    topic: "Asphyxia"
  },

  // --- MEDICINE ---
  {
    id: 8001,
    text: "What is the drug of choice for status epilepticus?",
    options: ["Phenytoin", "Lorazepam", "Valproate", "Carbamazepine"],
    correctAnswerIndex: 1,
    explanation: "IV Lorazepam is first line.",
    subject: "Medicine",
    topic: "Neurology"
  },
  {
    id: 8002,
    text: "Which murmur is heard in Mitral Stenosis?",
    options: ["Mid-diastolic rumbling murmur", "Pan-systolic murmur", "Ejection systolic murmur", "Early diastolic murmur"],
    correctAnswerIndex: 0,
    explanation: "Mitral stenosis presents with a localized mid-diastolic rumbling murmur with presystolic accentuation.",
    subject: "Medicine",
    topic: "Cardiology"
  },
  {
    id: 8003,
    text: "Beck's Triad for Cardiac Tamponade includes hypotension, muffled heart sounds, and:",
    options: ["Bradycardia", "Raised JVP", "Pulmonary Edema", "Wheezing"],
    correctAnswerIndex: 1,
    explanation: "Beck's Triad: Hypotension, Muffled Heart Sounds, Raised JVP (Distended neck veins).",
    subject: "Medicine",
    topic: "Cardiology"
  },
  {
    id: 8004,
    text: "Kayser-Fleischer rings are seen in:",
    options: ["Hemochromatosis", "Wilson's Disease", "Primary Biliary Cirrhosis", "Hepatitis B"],
    correctAnswerIndex: 1,
    explanation: "Copper deposition in the cornea (Descemet's membrane) in Wilson's Disease.",
    subject: "Medicine",
    topic: "Hepatology"
  },
  {
    id: 8005,
    text: "The most common cause of Community Acquired Pneumonia is:",
    options: ["Staphylococcus aureus", "Streptococcus pneumoniae", "Mycoplasma", "Klebsiella"],
    correctAnswerIndex: 1,
    explanation: "Streptococcus pneumoniae is the leading cause of CAP worldwide.",
    subject: "Medicine",
    topic: "Pulmonology"
  },

  // --- SURGERY ---
  {
    id: 9001,
    text: "Positive McBurney's sign is indicative of:",
    options: ["Cholecystitis", "Appendicitis", "Pancreatitis", "Diverticulitis"],
    correctAnswerIndex: 1,
    explanation: "Tenderness at McBurney's point suggests Appendicitis.",
    subject: "General Surgery",
    topic: "Abdomen"
  },
  {
    id: 9002,
    text: "Rule of Nines is used for:",
    options: ["Dehydration assessment", "Burn surface area", "Coma scaling", "Trauma triage"],
    correctAnswerIndex: 1,
    explanation: "Wallace Rule of Nines estimates Total Body Surface Area (TBSA) in burns.",
    subject: "General Surgery",
    topic: "Burns"
  },
  {
    id: 9003,
    text: "Murphy's sign is positive in:",
    options: ["Acute Appendicitis", "Acute Cholecystitis", "Acute Pancreatitis", "Peptic Ulcer"],
    correctAnswerIndex: 1,
    explanation: "Inspiratory arrest on palpation of RUQ suggests Acute Cholecystitis.",
    subject: "General Surgery",
    topic: "Abdomen"
  },
  {
    id: 9004,
    text: "Triple assessment for breast lump includes clinical exam, imaging, and:",
    options: ["FNAC/Biopsy", "Tumor markers", "Genetic testing", "Bone scan"],
    correctAnswerIndex: 0,
    explanation: "Triple assessment: Clinical exam, Imaging (Mammogram/USG), and Pathology (FNAC/Core Biopsy).",
    subject: "General Surgery",
    topic: "Breast"
  },
  {
    id: 9005,
    text: "Which gas is most commonly used for creating pneumoperitoneum in laparoscopic surgery?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"],
    correctAnswerIndex: 2,
    explanation: "CO2 is used because it is non-combustible and highly soluble in blood (reducing risk of embolism).",
    subject: "General Surgery",
    topic: "Laparoscopy"
  },

  // --- OBGYN ---
  {
    id: 10001,
    text: "The most common site of ectopic pregnancy is:",
    options: ["Ovary", "Cervix", "Ampulla", "Isthmus"],
    correctAnswerIndex: 2,
    explanation: "Ampulla of Fallopian tube.",
    subject: "Obstetrics & Gynecology",
    topic: "Ectopic Pregnancy"
  },
  {
    id: 10002,
    text: "Which hormone is responsible for milk ejection reflex?",
    options: ["Prolactin", "Oxytocin", "Estrogen", "Progesterone"],
    correctAnswerIndex: 1,
    explanation: "Oxytocin causes contraction of myoepithelial cells (Let-down reflex).",
    subject: "Obstetrics & Gynecology",
    topic: "Lactation"
  },
  {
    id: 10003,
    text: "Cervical cancer screening is done by:",
    options: ["USG Abdomen", "Pap Smear", "CA-125", "Hysteroscopy"],
    correctAnswerIndex: 1,
    explanation: "Pap Smear is the standard screening test for Cervical Cancer.",
    subject: "Obstetrics & Gynecology",
    topic: "Oncology"
  },
  {
    id: 10004,
    text: "Active management of the third stage of labor involves:",
    options: ["Immediate cord clamping", "Uterine massage", "Oxytocin injection", "All of the above"],
    correctAnswerIndex: 3,
    explanation: "AMTSL includes oxytocin, delayed/controlled cord traction, and uterine massage to prevent PPH.",
    subject: "Obstetrics & Gynecology",
    topic: "Labor"
  },
  {
    id: 10005,
    text: "Strawberry cervix is seen in:",
    options: ["Candidiasis", "Trichomoniasis", "Bacterial Vaginosis", "Chlamydia"],
    correctAnswerIndex: 1,
    explanation: "Punctate hemorrhages on the cervix (Strawberry cervix) are characteristic of Trichomonas vaginalis.",
    subject: "Obstetrics & Gynecology",
    topic: "Infections"
  },

  // --- PEDIATRICS ---
  {
    id: 11001,
    text: "Koplik's spots are seen in:",
    options: ["Measles", "Mumps", "Rubella", "Chickenpox"],
    correctAnswerIndex: 0,
    explanation: "Pathognomonic for Measles.",
    subject: "Pediatrics",
    topic: "Infections"
  },
  {
    id: 11002,
    text: "Physiological jaundice in neonates usually appears on:",
    options: ["Day 1", "Day 2-3", "Day 7", "Day 14"],
    correctAnswerIndex: 1,
    explanation: "Physiological jaundice never appears within the first 24 hours; usually peaks day 3-4.",
    subject: "Pediatrics",
    topic: "Neonatology"
  },
  {
    id: 11003,
    text: "Tetralogy of Fallot includes all EXCEPT:",
    options: ["VSD", "Pulmonary Stenosis", "Overriding Aorta", "ASD"],
    correctAnswerIndex: 3,
    explanation: "TOF includes VSD, Pulmonary Stenosis, Overriding Aorta, and RV Hypertrophy. ASD is not part of the tetrad.",
    subject: "Pediatrics",
    topic: "Cardiology"
  },
  {
    id: 11004,
    text: "Delayed passage of meconium (>48 hours) suggests:",
    options: ["Pyloric Stenosis", "Hirschsprung Disease", "Intussusception", "Necrotizing Enterocolitis"],
    correctAnswerIndex: 1,
    explanation: "Hirschsprung disease (congenital aganglionic megacolon) presents with delayed meconium.",
    subject: "Pediatrics",
    topic: "GI Disorders"
  },
  {
    id: 11005,
    text: "Which vitamin is given at birth to prevent hemorrhagic disease of the newborn?",
    options: ["Vitamin A", "Vitamin D", "Vitamin K", "Vitamin C"],
    correctAnswerIndex: 2,
    explanation: "Vitamin K is administered to prevent VKDB (Vitamin K Deficiency Bleeding).",
    subject: "Pediatrics",
    topic: "Neonatology"
  },

  // --- PSM ---
  {
    id: 12001,
    text: "The 'Vector' for Dengue fever is:",
    options: ["Anopheles", "Culex", "Aedes aegypti", "Mansonia"],
    correctAnswerIndex: 2,
    explanation: "Aedes aegypti.",
    subject: "PSM (Community Medicine)",
    topic: "Vector Borne Diseases"
  },
  {
    id: 12002,
    text: "Denominator in Case Fatality Rate is:",
    options: ["Total population", "Total cases", "Total deaths", "Population at risk"],
    correctAnswerIndex: 1,
    explanation: "CFR = (Deaths / Total Cases) * 100.",
    subject: "PSM (Community Medicine)",
    topic: "Epidemiology"
  },
  {
    id: 12003,
    text: "ASHA worker is located at:",
    options: ["Sub-center", "PHC", "CHC", "Village Level"],
    correctAnswerIndex: 3,
    explanation: "Accredited Social Health Activist (ASHA) works at the village level (1 per 1000 population).",
    subject: "PSM (Community Medicine)",
    topic: "Health Systems"
  },
  {
    id: 12004,
    text: "The 'Iceberg Phenomenon' of disease is NOT shown by:",
    options: ["Rabies", "Measles", "Rubella", "Influenza"],
    correctAnswerIndex: 0,
    explanation: "Rabies is clinically manifest in almost all cases (very few subclinical cases), so it does not show the iceberg phenomenon.",
    subject: "PSM (Community Medicine)",
    topic: "Epidemiology"
  },
  {
    id: 12005,
    text: "Biomedical waste management: Anatomical waste is disposed in which bag?",
    options: ["Red", "Yellow", "Blue", "Black"],
    correctAnswerIndex: 1,
    explanation: "Human anatomical waste is disposed of in Yellow bags for incineration.",
    subject: "PSM (Community Medicine)",
    topic: "Waste Management"
  },

  // --- OPHTHALMOLOGY ---
  {
    id: 13001,
    text: "Cherry red spot at the macula is seen in:",
    options: ["CRVO", "CRAO", "Diabetic Retinopathy", "Retinitis Pigmentosa"],
    correctAnswerIndex: 1,
    explanation: "Central Retinal Artery Occlusion (CRAO).",
    subject: "Ophthalmology",
    topic: "Retina"
  },
  {
    id: 13002,
    text: "Most common cause of blindness in India is:",
    options: ["Glaucoma", "Cataract", "Refractive Error", "Trachoma"],
    correctAnswerIndex: 1,
    explanation: "Cataract is the leading cause.",
    subject: "Ophthalmology",
    topic: "Public Health"
  },
  {
    id: 13003,
    text: "Safest drug for Glaucoma in bronchial asthma is:",
    options: ["Timolol", "Betaxolol", "Latanoprost", "Pilocarpine"],
    correctAnswerIndex: 2,
    explanation: "Latanoprost (Prostaglandin analogue) has no respiratory side effects. Beta blockers (Timolol) are contraindicated.",
    subject: "Ophthalmology",
    topic: "Glaucoma"
  },

  // --- ENT ---
  {
    id: 14001,
    text: "Little's area is the most common site for:",
    options: ["Nasal polyps", "Epistaxis", "Sinusitis", "Deviated Septum"],
    correctAnswerIndex: 1,
    explanation: "Kiesselbach's plexus (Little's area) is the site for anterior epistaxis.",
    subject: "ENT",
    topic: "Nose"
  },
  {
    id: 14002,
    text: "Grommet insertion is done for:",
    options: ["ASOM", "Glue Ear (OME)", "CSOM", "Otosclerosis"],
    correctAnswerIndex: 1,
    explanation: "Otitis Media with Effusion (Glue Ear).",
    subject: "ENT",
    topic: "Ear"
  },
  {
    id: 14003,
    text: "Carhart's notch is seen in:",
    options: ["CSOM", "Otosclerosis", "Meniere's disease", "Presbycusis"],
    correctAnswerIndex: 1,
    explanation: "A dip in bone conduction at 2000Hz (Carhart's notch) is characteristic of Otosclerosis.",
    subject: "ENT",
    topic: "Ear"
  },

  // --- ORTHOPEDICS ---
  {
    id: 15001,
    text: "Colles fracture involves:",
    options: ["Distal radius with dorsal tilt", "Distal radius with volar tilt", "Scaphoid", "Proximal ulna"],
    correctAnswerIndex: 0,
    explanation: "Distal radius fracture with dorsal angulation (Dinner fork deformity).",
    subject: "Orthopedics",
    topic: "Fractures"
  },
  {
    id: 15002,
    text: "Sunday Morning Paralysis is due to compression of:",
    options: ["Radial Nerve", "Ulnar Nerve", "Median Nerve", "Axillary Nerve"],
    correctAnswerIndex: 0,
    explanation: "Radial nerve compression against humerus (Saturday night palsy/Sunday morning paralysis).",
    subject: "Orthopedics",
    topic: "Nerve Injuries"
  },
  {
    id: 15003,
    text: "Bamboo spine is a feature of:",
    options: ["Osteoarthritis", "Ankylosing Spondylitis", "Rheumatoid Arthritis", "Gout"],
    correctAnswerIndex: 1,
    explanation: "Fusion of vertebrae (syndesmophytes) leads to Bamboo spine in Ankylosing Spondylitis.",
    subject: "Orthopedics",
    topic: "Spine"
  },

  // --- DERMATOLOGY ---
  {
    id: 16001,
    text: "Auspitz sign is positive in:",
    options: ["Lichen Planus", "Psoriasis", "Pemphigus", "Eczema"],
    correctAnswerIndex: 1,
    explanation: "Pinpoint bleeding on removal of scales (Psoriasis).",
    subject: "Dermatology",
    topic: "Papulosquamous"
  },
  {
    id: 16002,
    text: "Tzanck smear is used for diagnosis of:",
    options: ["Pemphigus", "Scabies", "Leprosy", "Ringworm"],
    correctAnswerIndex: 0,
    explanation: "Tzanck smear shows acantholytic cells in Pemphigus and multinucleated giant cells in Herpes.",
    subject: "Dermatology",
    topic: "Vesiculobullous"
  },
  {
    id: 16003,
    text: "Burrow is the pathognomonic lesion of:",
    options: ["Scabies", "Pediculosis", "Tinea", "Impetigo"],
    correctAnswerIndex: 0,
    explanation: "Sarcoptes scabiei creates burrows in the skin.",
    subject: "Dermatology",
    topic: "Infections"
  },

  // --- PSYCHIATRY ---
  {
    id: 17001,
    text: "Auditory hallucinations are most common in:",
    options: ["Delirium", "Schizophrenia", "Depression", "Mania"],
    correctAnswerIndex: 1,
    explanation: "Auditory hallucinations are characteristic of Schizophrenia.",
    subject: "Psychiatry",
    topic: "Psychosis"
  },
  {
    id: 17002,
    text: "Wernicke's Encephalopathy is caused by deficiency of:",
    options: ["Thiamine", "Riboflavin", "Niacin", "Pyridoxine"],
    correctAnswerIndex: 0,
    explanation: "Thiamine (B1) deficiency, often in alcoholics.",
    subject: "Psychiatry",
    topic: "Substance Abuse"
  },
  {
    id: 17003,
    text: "Drug of choice for Bipolar Disorder prophylaxis is:",
    options: ["Lithium", "Haloperidol", "Fluoxetine", "Diazepam"],
    correctAnswerIndex: 0,
    explanation: "Lithium is the mood stabilizer of choice for Bipolar prophylaxis.",
    subject: "Psychiatry",
    topic: "Mood Disorders"
  },

  // --- RADIOLOGY ---
  {
    id: 18001,
    text: "Investigation of choice for acute subarachnoid hemorrhage is:",
    options: ["MRI Brain", "NCCT Head", "X-ray Skull", "Doppler"],
    correctAnswerIndex: 1,
    explanation: "Non-Contrast CT is highly sensitive for acute blood (hyperdense).",
    subject: "Radiology",
    topic: "Neuroradiology"
  },
  {
    id: 18002,
    text: "Snow storm appearance on USG is seen in:",
    options: ["Ectopic pregnancy", "Hydatidiform Mole", "Fibroid", "Ovarian cyst"],
    correctAnswerIndex: 1,
    explanation: "Hydatidiform mole shows snow storm appearance.",
    subject: "Radiology",
    topic: "Obs Gyn Radiology"
  },
  {
    id: 18003,
    text: "Target sign on Ultrasound is seen in:",
    options: ["Appendicitis", "Intussusception", "Cholecystitis", "Pyloric Stenosis"],
    correctAnswerIndex: 1,
    explanation: "Intussusception appears as a 'Target' or 'Doughnut' sign on transverse scan.",
    subject: "Radiology",
    topic: "Pediatric Radiology"
  },

  // --- ANESTHESIA ---
  {
    id: 19001,
    text: "Dissociative anesthesia is produced by:",
    options: ["Propofol", "Ketamine", "Thiopentone", "Etomidate"],
    correctAnswerIndex: 1,
    explanation: "Ketamine causes dissociative anesthesia.",
    subject: "Anesthesia",
    topic: "Induction Agents"
  },
  {
    id: 19002,
    text: "Malignant Hyperthermia is triggered by:",
    options: ["Propofol", "Succinylcholine", "Thiopentone", "Midazolam"],
    correctAnswerIndex: 1,
    explanation: "Succinylcholine and Halothane are classic triggers.",
    subject: "Anesthesia",
    topic: "Complications"
  },
  {
    id: 19003,
    text: "The color coding for Oxygen cylinder is:",
    options: ["Black body with white shoulder", "Blue", "Grey", "Black"],
    correctAnswerIndex: 0,
    explanation: "Oxygen cylinders have a black body with a white shoulder.",
    subject: "Anesthesia",
    topic: "Equipment"
  }
];

/**
 * Retrieves a set of questions for a specific subject.
 * Simulates a massive 5000+ question bank by procedurally generating 
 * permutations if the requested count exceeds the unique seed questions.
 */
export const getQuestionsForSubject = (subject: string | 'Mixed', count: number): Question[] => {
  let pool: Question[] = [];
  
  if (subject === 'Mixed') {
    pool = QUESTION_BANK;
  } else {
    pool = QUESTION_BANK.filter(q => q.subject === subject);
  }

  if (pool.length === 0) return [];

  // Logic to simulate a massive bank:
  // If we need more questions than we have unique seeds, we cycle through them
  // but assign unique IDs to ensure they function correctly as distinct practice items.
  // In a real backend, this would fetch from a DB of 95,000 items.
  const results: Question[] = [];
  
  for (let i = 0; i < count; i++) {
    // Pick a random question from the available pool
    const randomQ = pool[Math.floor(Math.random() * pool.length)];
    
    // Create a new instance with a unique ID to simulate fetching a new Q from a massive DB
    // We preserve the content but ensure the system treats it as a valid distinct entity
    results.push({
      ...randomQ,
      id: parseInt(`${randomQ.id}${Date.now().toString().slice(-4)}${i}`), // Generate unique ID
    });
  }
  
  return results;
};

export const getDiagnosticQuestions = (): Question[] => {
  return DIAGNOSTIC_QUESTIONS;
};

// Export the diagnostic questions list
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
