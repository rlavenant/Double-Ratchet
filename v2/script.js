/* ================= MODULES & STEPS DATA ================= */

/* Écran de sélection du scénario PCS (module 4) */
const pcsChoiceStep = {
    ratchetLabel: "Sélection du scénario PCS",
    ratchetColor: "#9ca3af",
    render: () => `
        <div class="step-container space-y-4 max-w-full">
            <div class="text-center mb-2">
                <h3 class="text-base font-bold text-white">Quelle clé a été compromise ?</h3>
                <p class="text-xs text-slate-400">La nature de la clé volée détermine si le canal peut s'auto-guérir, et en combien de temps.</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <button onclick="selectPCSScenario('mk')" class="text-left p-4 bg-cyber-panel hover:bg-cyber-card rounded-2xl border border-cyber-neonGreen/50 hover:border-cyber-neonGreen transition-all">
                    <div class="text-xs font-mono font-bold text-cyber-neonGreen uppercase">Message Key (MK)</div>
                    <p class="text-xs text-slate-400 mt-1">Une seule clé de message, à usage unique</p>
                </button>
                <button onclick="selectPCSScenario('ck')" class="text-left p-4 bg-cyber-panel hover:bg-cyber-card rounded-2xl border border-cyber-neonCyan/50 hover:border-cyber-neonCyan transition-all">
                    <div class="text-xs font-mono font-bold text-cyber-neonCyan uppercase">Chain Key (CK)</div>
                    <p class="text-xs text-slate-400 mt-1">La clé de chaîne symétrique en cours</p>
                </button>
                <button onclick="selectPCSScenario('rk')" class="text-left p-4 bg-cyber-panel hover:bg-cyber-card rounded-2xl border border-cyber-neonPurple/50 hover:border-cyber-neonPurple transition-all">
                    <div class="text-xs font-mono font-bold text-cyber-neonPurple uppercase">Root Key (RK)</div>
                    <p class="text-xs text-slate-400 mt-1">La clé racine, seule</p>
                </button>
                <button onclick="selectPCSScenario('dh')" class="text-left p-4 bg-cyber-panel hover:bg-cyber-card rounded-2xl border border-cyber-neonAmber/50 hover:border-cyber-neonAmber transition-all">
                    <div class="text-xs font-mono font-bold text-cyber-neonAmber uppercase">Clé privée DH active (a)</div>
                    <p class="text-xs text-slate-400 mt-1">La paire de ratchet DH en cours d'Alice</p>
                </button>
                <button onclick="selectPCSScenario('persistent')" class="text-left p-4 bg-cyber-panel hover:bg-cyber-card rounded-2xl border border-cyber-neonRose/50 hover:border-cyber-neonRose transition-all md:col-span-2">
                    <div class="text-xs font-mono font-bold text-cyber-neonRose uppercase">Accès persistant (espion actif)</div>
                    <p class="text-xs text-slate-400 mt-1">L'attaquant garde un accès continu au téléphone, pas seulement une copie ponctuelle</p>
                </button>
            </div>
        </div>
    `
};

const modules = [
    /* MODULE 1: INITIALISATION X3DH */
    {
        title: "1. Initialisation X3DH (Extended Triple Diffie-Hellman)",
        steps: [
            {
                ratchetLabel: "X3DH - Publication des clés (Bob)",
                ratchetColor: "#00e5ff",
                render: () => `
                    <div class="step-container grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-center">
                        <div class="bg-cyber-panel p-4 sm:p-6 rounded-2xl border border-cyber-neonCyan/50 space-y-4">
                            <div class="flex items-center justify-between border-b border-cyber-border pb-3">
                                <span class="font-bold text-cyber-neonCyan text-base">Bob (Hors-Ligne)</span>
                                <span class="text-[10px] font-mono bg-cyber-bg px-2 py-0.5 rounded text-slate-400">Génération des paires</span>
                            </div>
                            <div class="space-y-2 font-mono text-xs">
                                <div class="p-3 bg-cyber-card rounded-xl border border-cyber-border flex justify-between gap-2">
                                    <span class="text-slate-400 truncate">Identity Key (IK_B):</span>
                                    <span class="text-cyber-neonGreen font-bold flex-shrink-0">ik_b_pub</span>
                                </div>
                                <div class="p-3 bg-cyber-card rounded-xl border border-cyber-border flex justify-between gap-2">
                                    <span class="text-slate-400 truncate">Signed Prekey (SPK_B):</span>
                                    <span class="text-cyber-neonCyan font-bold flex-shrink-0">spk_b_pub</span>
                                </div>
                                <div class="p-3 bg-cyber-card rounded-xl border border-cyber-border flex justify-between gap-2">
                                    <span class="text-slate-400 truncate">One-Time Prekey (OPK_B):</span>
                                    <span class="text-cyber-neonAmber font-bold flex-shrink-0">opk_b_pub</span>
                                </div>
                            </div>
                        </div>
                        <div class="bg-cyber-card p-4 sm:p-6 rounded-2xl border border-cyber-border text-center space-y-3">
                            <div class="p-4 bg-cyber-panel rounded-xl border border-cyber-border space-y-2">
                                <div class="text-xs font-mono text-slate-400">Dépôt sur le Serveur Central</div>
                                <div class="text-sm font-bold text-cyber-neonCyan">&rarr; Prekey Bundle de Bob &rarr;</div>
                            </div>
                            <p class="text-xs text-slate-400">Bob pré-dépose son paquet de clés publiques sur le serveur puis peut se déconnecter.</p>
                        </div>
                    </div>
                `
            },
            {
                ratchetLabel: "X3DH - Récupération du Bundle (Alice)",
                ratchetColor: "#00e5ff",
                render: () => `
                    <div class="step-container grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-center">
                        <div class="bg-cyber-panel p-4 sm:p-6 rounded-2xl border border-cyber-neonGreen space-y-4 glow-green">
                            <div class="flex items-center justify-between border-b border-cyber-border pb-3">
                                <span class="font-bold text-cyber-neonGreen text-base">Alice (Initiatrice)</span>
                                <span class="text-[10px] font-mono bg-cyber-bg px-2 py-0.5 rounded text-slate-400">En ligne</span>
                            </div>
                            <div class="p-3 bg-cyber-card rounded-xl border border-cyber-border font-mono text-xs space-y-1">
                                <span class="text-slate-400">Clé Éphémère Générée (EK_A):</span>
                                <div class="text-cyber-neonGreen font-bold break-all">ek_a_priv / EK_A_pub</div>
                            </div>
                            <div class="p-3 bg-cyber-card rounded-xl border border-cyber-neonCyan/40 text-xs font-mono">
                                <span class="text-cyber-neonCyan font-bold">&check; Prekey Bundle de Bob Téléchargé</span>
                            </div>
                        </div>
                        <div class="bg-cyber-card p-4 sm:p-6 rounded-2xl border border-cyber-border space-y-3">
                            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider">Serveur Intermédiaire</h4>
                            <p class="text-xs text-slate-300">Le serveur remet le bundle de Bob à Alice. La clé à usage unique <code class="text-cyber-neonAmber break-all">OPK_B</code> sera consommée et supprimée du serveur.</p>
                        </div>
                    </div>
                `
            },
            {
                ratchetLabel: "X3DH - Échanges Diffie-Hellman",
                ratchetColor: "#a855f7",
                render: () => `
                    <div class="step-container space-y-4 sm:space-y-6">
                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 font-mono text-xs">
                            <div class="p-3 sm:p-4 bg-cyber-card rounded-xl border border-cyber-neonCyan text-center glow-cyan">
                                <div class="text-slate-400 text-[10px]">DH1 (Authentification)</div>
                                <div class="font-bold text-cyber-neonCyan mt-1 break-all">DH(IK_A, SPK_B)</div>
                            </div>
                            <div class="p-3 sm:p-4 bg-cyber-card rounded-xl border border-cyber-neonCyan text-center glow-cyan">
                                <div class="text-slate-400 text-[10px]">DH2 (Identité/Éphémère)</div>
                                <div class="font-bold text-cyber-neonCyan mt-1 break-all">DH(EK_A, IK_B)</div>
                            </div>
                            <div class="p-3 sm:p-4 bg-cyber-card rounded-xl border border-cyber-neonCyan text-center glow-cyan">
                                <div class="text-slate-400 text-[10px]">DH3 (Confidentialité)</div>
                                <div class="font-bold text-cyber-neonCyan mt-1 break-all">DH(EK_A, SPK_B)</div>
                            </div>
                            <div class="p-3 sm:p-4 bg-cyber-card rounded-xl border border-cyber-neonAmber text-center">
                                <div class="text-slate-400 text-[10px]">DH4 (Anti-Replay)</div>
                                <div class="font-bold text-cyber-neonAmber mt-1 break-all">DH(EK_A, OPK_B)</div>
                            </div>
                        </div>
                        <div class="bg-cyber-panel p-4 rounded-xl border border-cyber-border text-center text-xs text-slate-300">
                            Alice combine ses paires de clés avec celles de Bob. Les 4 secrets DH sont concaténés et envoyés dans la fonction KDF.
                        </div>
                    </div>
                `
            },
            {
                ratchetLabel: "X3DH - Clé Racine Initialisée (SK_0)",
                ratchetColor: "#00ff88",
                spin: 'both',
                render: () => `
                    <div class="step-container bg-cyber-panel p-6 sm:p-8 rounded-2xl border border-cyber-neonGreen text-center space-y-4 glow-green">
                        <span class="px-3 py-1 bg-cyber-neonGreen/20 text-cyber-neonGreen rounded-full text-xs font-mono font-bold border border-cyber-neonGreen/40 inline-block">
                            Initialisation Terminée
                        </span>
                        <h3 class="text-lg font-bold text-white">Clé Racine Partagée (SK_0)</h3>
                        <div class="p-4 bg-cyber-bg rounded-xl font-mono text-sm sm:text-base md:text-lg font-bold text-cyber-neonGreen border border-cyber-border break-all">
                            0x7F9B_42E1_098A_3C5D
                        </div>
                        <p class="text-xs text-slate-400">Alice et Bob disposent du même secret initial pour amorcer le Double Ratchet.</p>
                    </div>
                `
            }
        ]
    },

    /* MODULE 2: DOUBLE RATCHET CONVERSATION */
    {
        title: "2. Conversation Simulée & Double Ratchet",
        steps: [
            {
                ratchetLabel: "Ratchet Symétrique - Message 1 (Alice)",
                ratchetColor: "#00ff88",
                spin: 'sym',
                render: () => `
                    <div class="step-container grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-center">
                        <div class="bg-cyber-panel p-4 sm:p-5 rounded-2xl border border-cyber-neonGreen space-y-3">
                            <div class="text-xs font-mono text-cyber-neonGreen font-bold flex justify-between gap-2">
                                <span>Alice &rarr; Message #1</span>
                                <span class="text-slate-400 flex-shrink-0">Ratchet Symétrique</span>
                            </div>
                            <div class="p-3 bg-cyber-card rounded-xl text-sm text-slate-200 border border-cyber-border break-words">"Bonjour Bob, le projet avance ?"</div>
                        </div>
                        <div class="bg-cyber-card p-4 sm:p-5 rounded-2xl border border-cyber-border font-mono text-xs space-y-2.5">
                            <div class="flex justify-between gap-2 text-slate-400"><span class="truncate">Chain Key (CK_0):</span> <span class="text-slate-200 flex-shrink-0">0xA13C88D4</span></div>
                            <div class="flex justify-between gap-2 text-cyber-neonGreen font-bold"><span>&darr; KDF Symétrique</span> <span>Roue +1</span></div>
                            <div class="flex justify-between gap-2 text-cyber-neonCyan font-bold"><span class="truncate">Message Key (MK_1):</span> <span class="text-cyber-neonCyan flex-shrink-0">0x9922EE11</span></div>
                        </div>
                    </div>
                `
            },
            {
                ratchetLabel: "Ratchet Symétrique - Message 2 (Alice)",
                ratchetColor: "#00ff88",
                spin: 'sym',
                render: () => `
                    <div class="step-container grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-center">
                        <div class="bg-cyber-panel p-4 sm:p-5 rounded-2xl border border-cyber-neonGreen space-y-3">
                            <div class="text-xs font-mono text-cyber-neonGreen font-bold flex justify-between gap-2">
                                <span>Alice &rarr; Message #2 (Consécutif)</span>
                                <span class="text-slate-400 flex-shrink-0">Même chaîne KDF</span>
                            </div>
                            <div class="p-3 bg-cyber-card rounded-xl text-sm text-slate-200 border border-cyber-border break-words">"Je t'envoie le document sécurisé."</div>
                        </div>
                        <div class="bg-cyber-card p-4 sm:p-5 rounded-2xl border border-cyber-border font-mono text-xs space-y-2.5">
                            <div class="flex justify-between gap-2 text-slate-400"><span class="truncate">Chain Key (CK_1):</span> <span class="text-slate-200 flex-shrink-0">0xB44D99E2</span></div>
                            <div class="flex justify-between gap-2 text-cyber-neonGreen font-bold"><span>&darr; KDF Symétrique</span> <span>Roue +1</span></div>
                            <div class="flex justify-between gap-2 text-cyber-neonCyan font-bold"><span class="truncate">Message Key (MK_2):</span> <span class="text-cyber-neonCyan flex-shrink-0">0x4488FF33</span></div>
                        </div>
                    </div>
                `
            },
            {
                ratchetLabel: "Ratchet Asymétrique DH - Réponse (Bob)",
                ratchetColor: "#00e5ff",
                spin: 'dh',
                render: () => `
                    <div class="step-container space-y-4 sm:space-y-5">
                        <div class="bg-cyber-panel p-4 sm:p-5 rounded-2xl border border-cyber-neonCyan space-y-3 glow-cyan">
                            <div class="text-xs font-mono text-cyber-neonCyan font-bold flex justify-between gap-2">
                                <span>Bob &rarr; Réponse (Changement de tour)</span>
                                <span class="text-cyber-neonCyan flex-shrink-0">Nouveau Ratchet DH</span>
                            </div>
                            <div class="p-3 bg-cyber-card rounded-xl text-sm text-slate-200 border border-cyber-border break-words">"Bien reçu Alice, je regarde ça immédiatement."</div>
                        </div>
                        <div class="p-4 bg-cyber-bg rounded-2xl border border-cyber-neonCyan font-mono text-xs flex justify-between items-center gap-2">
                            <span class="text-slate-400 truncate">Nouvelle Clé Racine (RK_1):</span>
                            <span class="text-cyber-neonCyan font-bold text-xs sm:text-sm break-all">0xE551_0099_FFAB</span>
                        </div>
                    </div>
                `
            }
        ]
    },

    /* MODULE 3: FORWARD SECRECY DEMO */
    {
        title: "3. Démonstration : Forward Secrecy (Confidentialité Persistante)",
        steps: [
            {
                ratchetLabel: "Évolution du Ratchet Symétrique",
                ratchetColor: "#00ff88",
                render: () => `
                    <div class="step-container grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                        <div class="p-4 bg-cyber-panel rounded-2xl border border-cyber-border text-center space-y-2">
                            <div class="text-cyber-neonGreen font-bold">Message t=1</div>
                            <div class="text-slate-400 text-[10px] break-all">MK_1: 0x1122</div>
                            <div class="text-slate-300 font-sans text-xs break-words">"Rdv à 14h"</div>
                        </div>
                        <div class="p-4 bg-cyber-panel rounded-2xl border border-cyber-border text-center space-y-2">
                            <div class="text-cyber-neonGreen font-bold">Message t=2</div>
                            <div class="text-slate-400 text-[10px] break-all">MK_2: 0x3344</div>
                            <div class="text-slate-300 font-sans text-xs break-words">"Fichier joint"</div>
                        </div>
                        <div class="p-4 bg-cyber-panel rounded-2xl border border-cyber-border text-center space-y-2">
                            <div class="text-cyber-neonGreen font-bold">Message t=3</div>
                            <div class="text-slate-400 text-[10px] break-all">MK_3: 0x5566</div>
                            <div class="text-slate-300 font-sans text-xs break-words">"Code: 9482"</div>
                        </div>
                    </div>
                `
            },
            {
                ratchetLabel: "Compromission de la clé à t=3",
                ratchetColor: "#ff2a85",
                render: () => `
                    <div class="step-container bg-cyber-panel p-6 rounded-2xl border border-cyber-neonRose text-center space-y-4 glow-rose">
                        <span class="px-3 py-1 bg-cyber-neonRose/20 text-cyber-neonRose rounded-full text-xs font-mono font-bold inline-block">
                            Vol de la clé MK_3
                        </span>
                        <div class="text-base font-bold text-white break-words">L'attaquant obtient MK_3 (0x5566)</div>
                        <p class="text-xs text-slate-300">Seul le Message #3 est déchiffrable à cet instant.</p>
                    </div>
                `
            },
            {
                ratchetLabel: "Sens Unique KDF (Rochet Indécrochable)",
                ratchetColor: "#ff2a85",
                render: () => `
                    <div class="step-container space-y-4">
                        <div class="p-4 sm:p-5 bg-cyber-bg rounded-2xl border border-cyber-border font-mono text-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                            <span class="text-cyber-neonGreen font-bold">MK_1 & MK_2 (Passé)</span>
                            <span class="text-cyber-neonRose font-bold">&cross; Fonction Hash Inadmissible &cross;</span>
                            <span class="text-cyber-neonRose font-bold">MK_3 (Compromis)</span>
                        </div>
                        <div class="p-4 bg-cyber-panel rounded-2xl border border-cyber-neonGreen text-center text-xs font-bold text-cyber-neonGreen">
                            &check; Forward Secrecy Validée : Les clés passées restent totalement impossibles à déduire.
                        </div>
                    </div>
                `
            }
        ]
    },

    /* MODULE 4: POST-COMPROMISE SECURITY DEMO */
    {
        title: "4. Démonstration : Post-Compromise Security (Autoguérison)",
        steps: [pcsChoiceStep]
    }
];

/* Scénarios PCS détaillés selon la clé compromise */
const pcsScenarios = {
    mk: {
        steps: [
            {
                ratchetLabel: "Vol d'une clé de message (MK_3)",
                ratchetColor: "#ff2a85",
                render: () => `
                    <div class="step-container bg-cyber-panel p-6 rounded-2xl border border-cyber-neonRose text-center space-y-4 glow-rose">
                        <span class="px-3 py-1 bg-cyber-neonRose/20 text-cyber-neonRose rounded-full text-xs font-mono font-bold inline-block">Vol de MK_3</span>
                        <div class="text-base font-bold text-white">L'attaquant obtient uniquement MK_3</div>
                        <p class="text-xs text-slate-300">CK, RK et les clés DH en cours restent hors de sa portée.</p>
                    </div>
                `
            },
            {
                ratchetLabel: "Rien à guérir",
                ratchetColor: "#00ff88",
                render: () => `
                    <div class="step-container bg-cyber-panel p-6 rounded-2xl border border-cyber-neonGreen text-center space-y-4 glow-green">
                        <span class="px-3 py-1 bg-cyber-neonGreen/20 text-cyber-neonGreen rounded-full text-xs font-mono font-bold inline-block">PCS trivialement respectée</span>
                        <h3 class="text-base font-bold text-white">Message #4 déjà protégé</h3>
                        <p class="text-xs text-slate-300">MK_3 est jetée après usage et ne permet pas de dériver CK_3 ni MK_4 (fonction à sens unique). L'attaquant n'a jamais eu accès à l'état de la chaîne : il n'y a rien à réparer.</p>
                    </div>
                `
            }
        ]
    },
    ck: {
        steps: [
            {
                ratchetLabel: "Vol de la clé de chaîne (CK_3)",
                ratchetColor: "#ff2a85",
                render: () => `
                    <div class="step-container bg-cyber-panel p-6 rounded-2xl border border-cyber-neonRose space-y-3 glow-rose">
                        <div class="text-xs font-mono text-cyber-neonRose font-bold uppercase">Compromission de la chaîne d'envoi</div>
                        <div class="text-sm text-slate-200">L'attaquant obtient <code class="text-cyber-neonRose break-all">CK_3</code> : il peut désormais dériver lui-même <code class="text-cyber-neonRose break-all">MK_4, MK_5, ...</code> tant que la chaîne ne change pas.</div>
                        <p class="text-xs text-slate-400">Contrairement au vol d'une simple MK, tous les messages futurs de cette chaîne sont ici menacés.</p>
                    </div>
                `
            },
            {
                ratchetLabel: "Tour DH suivant",
                ratchetColor: "#00e5ff",
                spin: 'dh',
                render: () => `
                    <div class="step-container bg-cyber-panel p-6 rounded-2xl border border-cyber-neonCyan space-y-3 glow-cyan">
                        <div class="text-xs font-mono text-cyber-neonCyan font-bold uppercase">Changement de tour d'écriture</div>
                        <div class="text-sm text-slate-200">Dès que Bob répond, une nouvelle paire DH est générée et une nouvelle <code class="text-cyber-neonCyan break-all">RK</code> est dérivée à partir de secrets jamais vus par l'attaquant.</div>
                        <p class="text-xs text-slate-400">CK_3 devient inutile : elle n'appartenait qu'à l'ancienne chaîne, abandonnée.</p>
                    </div>
                `
            },
            {
                ratchetLabel: "Guérison immédiate",
                ratchetColor: "#00ff88",
                render: () => `
                    <div class="step-container bg-cyber-panel p-6 rounded-2xl border border-cyber-neonGreen text-center space-y-4 glow-green">
                        <span class="px-3 py-1 bg-cyber-neonGreen/20 text-cyber-neonGreen rounded-full text-xs font-mono font-bold inline-block">PCS Active</span>
                        <h3 class="text-base font-bold text-white">Sécurité restaurée dès le tour suivant</h3>
                        <p class="text-xs text-slate-300">Les clés DH d'Alice et de Bob n'ayant jamais été compromises, l'attaquant ne peut pas suivre le nouveau tour de ratchet. Un seul changement de sens suffit à l'exclure.</p>
                    </div>
                `
            }
        ]
    },
    rk: {
        steps: [
            {
                ratchetLabel: "Vol de la clé racine seule (RK_2)",
                ratchetColor: "#a855f7",
                render: () => `
                    <div class="step-container bg-cyber-panel p-6 rounded-2xl border border-cyber-neonPurple space-y-3">
                        <div class="text-xs font-mono text-cyber-neonPurple font-bold uppercase">Compromission de RK_2</div>
                        <div class="text-sm text-slate-200">L'attaquant obtient <code class="text-cyber-neonPurple break-all">RK_2</code>, mais ni une <code class="text-cyber-neonPurple break-all">CK</code> active, ni une clé privée DH.</div>
                        <p class="text-xs text-slate-400">RK seule ne donne accès à aucune clé de message : elle ne sert qu'à dériver la prochaine RK, et seulement si on connaît aussi le futur secret DH.</p>
                    </div>
                `
            },
            {
                ratchetLabel: "Tour DH suivant",
                ratchetColor: "#00e5ff",
                spin: 'dh',
                render: () => `
                    <div class="step-container bg-cyber-panel p-6 rounded-2xl border border-cyber-neonCyan space-y-3 glow-cyan">
                        <div class="text-xs font-mono text-cyber-neonCyan font-bold uppercase">Nouveau secret DH</div>
                        <div class="text-sm text-slate-200 break-words">RK_3 = KDF(RK_2, DH(a, b_nouveau)) : ce calcul exige une des deux clés privées DH, qu'il ne possède pas.</div>
                        <p class="text-xs text-slate-400">RK_2 seule est donc insuffisante pour suivre la suite de la conversation.</p>
                    </div>
                `
            },
            {
                ratchetLabel: "Guérison immédiate",
                ratchetColor: "#00ff88",
                render: () => `
                    <div class="step-container bg-cyber-panel p-6 rounded-2xl border border-cyber-neonGreen text-center space-y-4 glow-green">
                        <span class="px-3 py-1 bg-cyber-neonGreen/20 text-cyber-neonGreen rounded-full text-xs font-mono font-bold inline-block">PCS Active</span>
                        <h3 class="text-base font-bold text-white">Sécurité restaurée dès le tour suivant</h3>
                        <p class="text-xs text-slate-300">Comme pour CK, une clé racine sans clé DH associée ne suffit jamais à suivre la conversation au-delà du prochain tour.</p>
                    </div>
                `
            }
        ]
    },
    dh: {
        steps: [
            {
                ratchetLabel: "Vol de la clé privée DH active (a)",
                ratchetColor: "#f59e0b",
                render: () => `
                    <div class="step-container bg-cyber-panel p-6 rounded-2xl border border-cyber-neonAmber space-y-3">
                        <div class="text-xs font-mono text-cyber-neonAmber font-bold uppercase">Compromission de la clé DH en cours</div>
                        <div class="text-sm text-slate-200">L'attaquant pirate le téléphone d'Alice et copie sa clé privée DH active <code class="text-cyber-neonAmber">a</code>, en plus de <code class="text-cyber-neonAmber">RK_0, CK_0</code>.</div>
                        <p class="text-xs text-slate-400">C'est le cas le plus grave : contrairement à CK ou RK seules, cette clé sert directement aux futurs calculs DH.</p>
                    </div>
                `
            },
            {
                ratchetLabel: "Échange DH — pas encore guéri",
                ratchetColor: "#00e5ff",
                spin: 'dh',
                render: () => `
                    <div class="step-container bg-cyber-panel p-6 rounded-2xl border border-cyber-neonCyan space-y-3 glow-cyan">
                        <div class="text-xs font-mono text-cyber-neonCyan font-bold uppercase">Bob renouvelle sa clé</div>
                        <div class="text-sm text-slate-200 break-words">Bob injecte une nouvelle éphémère <code class="text-cyber-neonCyan">b_nouveau</code>. RK_1 = KDF(RK_0, DH(a, b_nouveau)).</div>
                        <p class="text-xs text-slate-400">Problème : <code class="text-cyber-neonRose">b_nouveau_pub</code> circule en clair, et l'attaquant possède déjà <code class="text-cyber-neonRose">a</code>. Il peut recalculer RK_1 lui-même : le canal n'est pas encore guéri.</p>
                    </div>
                `
            },
            {
                ratchetLabel: "Alice renouvelle sa clé à son tour",
                ratchetColor: "#00e5ff",
                spin: 'dh',
                render: () => `
                    <div class="step-container bg-cyber-panel p-6 rounded-2xl border border-cyber-neonCyan space-y-3 glow-cyan">
                        <div class="text-xs font-mono text-cyber-neonCyan font-bold uppercase">Second tour de ratchet</div>
                        <div class="text-sm text-slate-200 break-words">Au tour suivant, Alice génère sa propre nouvelle paire <code class="text-cyber-neonCyan">a_nouveau</code>. RK_2 = KDF(RK_1, DH(a_nouveau, b_nouveau)).</div>
                        <p class="text-xs text-slate-400">Cette fois, l'attaquant ne possède ni a_nouveau ni b_nouveau : il ne peut plus suivre.</p>
                    </div>
                `
            },
            {
                ratchetLabel: "Autoguérison accomplie",
                ratchetColor: "#00ff88",
                render: () => `
                    <div class="step-container bg-cyber-panel p-6 rounded-2xl border border-cyber-neonGreen text-center space-y-4 glow-green">
                        <span class="px-3 py-1 bg-cyber-neonGreen/20 text-cyber-neonGreen rounded-full text-xs font-mono font-bold inline-block">PCS Active - Canal Réparé</span>
                        <h3 class="text-base font-bold text-white">Sécurité restaurée après l'aller-retour complet</h3>
                        <p class="text-xs text-slate-300">Voler la clé DH active exige que <strong>les deux parties</strong> renouvellent leur propre paire avant que l'attaquant soit totalement exclu — soit un message dans chaque sens, pas un seul échange.</p>
                    </div>
                `
            }
        ]
    },
    persistent: {
        steps: [
            {
                ratchetLabel: "Accès persistant au téléphone d'Alice",
                ratchetColor: "#ff2a85",
                render: () => `
                    <div class="step-container bg-cyber-panel p-6 rounded-2xl border border-cyber-neonRose space-y-3 glow-rose">
                        <div class="text-xs font-mono text-cyber-neonRose font-bold uppercase">Espion actif, pas une copie ponctuelle</div>
                        <div class="text-sm text-slate-200">L'attaquant installe un logiciel espion : il lit en continu la mémoire du téléphone, y compris chaque nouvelle clé générée.</div>
                        <p class="text-xs text-slate-400">Ce n'est plus un vol instantané d'état, mais une surveillance permanente.</p>
                    </div>
                `
            },
            {
                ratchetLabel: "Aucune auto-guérison possible",
                ratchetColor: "#ff2a85",
                render: () => `
                    <div class="step-container bg-cyber-panel p-6 rounded-2xl border border-cyber-neonRose text-center space-y-4 glow-rose">
                        <span class="px-3 py-1 bg-cyber-neonRose/20 text-cyber-neonRose rounded-full text-xs font-mono font-bold inline-block">Limite fondamentale du PCS</span>
                        <h3 class="text-base font-bold text-white">Le Double Ratchet ne peut rien faire seul</h3>
                        <p class="text-xs text-slate-300">Dès qu'Alice génère a_nouveau, l'espion le lit immédiatement, avant même qu'il ne serve. Le PCS suppose une compromission ponctuelle (un instantané) ; un accès persistant demande une détection et un nettoyage externes (réinstallation, vérification du numéro de sécurité) — la cryptographie seule ne suffit pas.</p>
                    </div>
                `
            }
        ]
    }
};

function resetModule4() {
    modules[3].steps = [pcsChoiceStep];
}

function selectPCSScenario(key) {
    modules[3].steps = [pcsChoiceStep, ...pcsScenarios[key].steps];
    currentStepIndex = 1;
    renderCurrentStep();
}

/* ================= STATE & RENDER LOGIC ================= */
let currentModuleIndex = 0;
let currentStepIndex = 0;

function renderCurrentStep() {
    const mod = modules[currentModuleIndex];
    const step = mod.steps[currentStepIndex];

    // Render view canvas
    const viewport = document.getElementById('presentation-viewport');
    viewport.innerHTML = `
        ${step.render()}
    `;

    // Update HUD
    document.getElementById('ratchet-status-label').innerText = step.ratchetLabel;
    document.getElementById('ratchet-status-label').style.color = step.ratchetColor;
    document.getElementById('step-indicator').innerText = `${currentStepIndex + 1} / ${mod.steps.length}`;

    const spinning = step.spin === 'both' ? ['sym', 'dh'] : (step.spin ? [step.spin] : []);
    spinning.forEach(triggerWheelAnimation);
    updateRatchetHud(spinning);

    // Update Header Tabs
    for (let i = 0; i < 4; i++) {
        const tab = document.getElementById(`mod-tab-${i}`);
        if (i === currentModuleIndex) {
            tab.className = "px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all bg-cyber-neonCyan/20 text-cyber-neonCyan border border-cyber-neonCyan/50 tab-active";
        } else {
            tab.className = "px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all text-slate-400 hover:text-white";
        }
    }

    // Update Dots
    const dotsContainer = document.getElementById('slide-dots');
    dotsContainer.innerHTML = mod.steps.map((_, idx) => `
        <span class="w-2 h-2 rounded-full transition-all ${idx === currentStepIndex ? 'bg-cyber-neonCyan w-5 glow-cyan' : 'bg-cyber-border'}"></span>
    `).join('');

    // Button States
    const btnPrev = document.getElementById('btn-prev');
    btnPrev.disabled = (currentModuleIndex === 0 && currentStepIndex === 0);
    btnPrev.style.opacity = (currentModuleIndex === 0 && currentStepIndex === 0) ? '0.4' : '1';
}

function setModule(idx) {
    currentModuleIndex = idx;
    currentStepIndex = 0;
    if (idx === 3) resetModule4();
    renderCurrentStep();
}

function nextStep() {
    const mod = modules[currentModuleIndex];
    if (currentStepIndex < mod.steps.length - 1) {
        currentStepIndex++;
    } else if (currentModuleIndex < modules.length - 1) {
        currentModuleIndex++;
        currentStepIndex = 0;
        if (currentModuleIndex === 3) resetModule4();
    }
    renderCurrentStep();
}

function prevStep() {
    if (currentStepIndex > 0) {
        currentStepIndex--;
    } else if (currentModuleIndex > 0) {
        currentModuleIndex--;
        currentStepIndex = modules[currentModuleIndex].steps.length - 1;
    }
    renderCurrentStep();
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
        nextStep();
    } else if (e.key === 'ArrowLeft') {
        prevStep();
    }
});

window.onload = () => {
    renderRatchetTeeth(10);
    renderCurrentStep();
};

/* ================= ROUE À ROCHET + CLIQUET (géométrie exacte) ================= */
const RATCHET = {
    cx: 45, cy: 50,            // centre de la roue
    rOuter: 32, rInner: 24,    // sommet / creux des dents
    teeth: 10,
    pivot: { x: 88, y: 10 },   // axe fixe du cliquet
    armLen: 36,                // longueur du bras
    clawH: 11, clawFwd: 1.5,   // profondeur / inclinaison du bec
    wheelStroke: 1.6, pawlStroke: 1.4,
    thetaOpen: 70, thetaMax: 175,   // plage d'angle du cliquet (°)
    overshoot: 2.5,            // la roue dépasse la dent de x° puis recule jusqu'au cliquet
    restOffset: 0.2,           // position de repos juste après la chute du cliquet (°)
    closeSpeed: 360            // vitesse de chute du cliquet (°/s)
};
RATCHET.step = 360 / RATCHET.teeth;
RATCHET.gap = (RATCHET.wheelStroke + RATCHET.pawlStroke) / 2 + 0.15;

const rDeg = d => d * Math.PI / 180;

function ratchetWheelPoints(alpha) {
    const R = RATCHET, pts = [];
    for (let i = 0; i < R.teeth; i++) {
        const aTip = rDeg(R.phase + alpha + i * R.step);
        const aBase = rDeg(R.phase + alpha + (i + 1) * R.step);
        pts.push({ x: R.cx + R.rOuter * Math.cos(aTip),  y: R.cy + R.rOuter * Math.sin(aTip) });
        pts.push({ x: R.cx + R.rInner * Math.cos(aBase), y: R.cy + R.rInner * Math.sin(aBase) });
    }
    return pts;
}

function ratchetPawlLocal() {
    const L = RATCHET.armLen, h = RATCHET.clawH, f = RATCHET.clawFwd;
    return [
        { x: 0, y: -2.2 }, { x: L, y: -1.3 },
        { x: L + f + 0.5, y: h - 0.4 }, { x: L + f - 0.3, y: h },
        { x: L - 6.5, y: 1.3 }, { x: 0, y: 2.2 }
    ];
}

function ratchetPawlPoints(theta) {
    const c = Math.cos(rDeg(theta)), s = Math.sin(rDeg(theta)), P = RATCHET.pivot;
    return ratchetPawlLocal().map(p => ({ x: P.x + p.x * c - p.y * s, y: P.y + p.x * s + p.y * c }));
}

function segPointDist(p, a, b) {
    const dx = b.x - a.x, dy = b.y - a.y, l2 = dx * dx + dy * dy;
    let t = l2 ? ((p.x - a.x) * dx + (p.y - a.y) * dy) / l2 : 0;
    t = Math.max(0, Math.min(1, t));
    return Math.hypot(p.x - (a.x + t * dx), p.y - (a.y + t * dy));
}

function segCross(a, b, c, d) {
    const o = (p, q, r) => (q.x - p.x) * (r.y - p.y) - (q.y - p.y) * (r.x - p.x);
    return o(a, b, c) * o(a, b, d) < 0 && o(c, d, a) * o(c, d, b) < 0;
}

function pointInPoly(p, poly) {
    let inside = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
        const a = poly[i], b = poly[j];
        if ((a.y > p.y) !== (b.y > p.y) && p.x < (b.x - a.x) * (p.y - a.y) / (b.y - a.y) + a.x) inside = !inside;
    }
    return inside;
}

function polyDistance(A, B) {
    if (pointInPoly(A[0], B) || pointInPoly(B[0], A)) return -1;
    let m = Infinity;
    for (let i = 0; i < A.length; i++) {
        const a1 = A[i], a2 = A[(i + 1) % A.length];
        for (let j = 0; j < B.length; j++) {
            const b1 = B[j], b2 = B[(j + 1) % B.length];
            if (segCross(a1, a2, b1, b2)) return -1;
            m = Math.min(m, segPointDist(a1, b1, b2), segPointDist(a2, b1, b2),
                            segPointDist(b1, a1, a2), segPointDist(b2, a1, a2));
        }
    }
    return m;
}

function solvePawlAngle(alpha) {
    const R = RATCHET, W = ratchetWheelPoints(alpha);
    const isFree = th => polyDistance(ratchetPawlPoints(th), W) >= R.gap;
    if (!isFree(R.thetaOpen)) return null;
    let lo = R.thetaOpen, hi = null;
    for (let th = R.thetaOpen + 1; th <= R.thetaMax; th += 1) {
        if (isFree(th)) lo = th; else { hi = th; break; }
    }
    if (hi === null) return lo;
    for (let i = 0; i < 14; i++) {
        const m = (lo + hi) / 2;
        if (isFree(m)) lo = m; else hi = m;
    }
    return lo;
}

function calibrateRatchetPhase() {
    const R = RATCHET;
    R.phase = 0;
    let prev = solvePawlAngle(-R.step), lo = null, hi = null, a;
    for (a = -R.step + 0.5; a <= R.step; a += 0.5) {
        const t = solvePawlAngle(a);
        if (t !== null && prev !== null && t - prev > 3) { lo = a - 0.5; hi = a; break; }
        prev = t;
    }
    if (lo === null) return;
    const high = solvePawlAngle(lo), low = solvePawlAngle(hi), mid = (high + low) / 2;
    for (let i = 0; i < 24; i++) {
        const m = (lo + hi) / 2;
        if (solvePawlAngle(m) > mid) hi = m; else lo = m;
    }
    R.phase = hi;
}

const ratchetWheels = {
    sym: {
        color: '#00ff88', rotation: 0,
        ids: { wheel: 'ratchet-wheel-group', teeth: 'ratchet-teeth', pawl: 'ratchet-pawl' },
        anim: { alpha: 0, theta: null, segments: [], raf: null, last: 0, rest: 0 }
    },
    dh: {
        color: '#00e5ff', rotation: 0,
        ids: { wheel: 'ratchet-wheel-group-dh', teeth: 'ratchet-teeth-dh', pawl: 'ratchet-pawl-dh' },
        anim: { alpha: 0, theta: null, segments: [], raf: null, last: 0, rest: 0 }
    }
};

function drawRatchet(W) {
    const R = RATCHET, A = W.anim;
    const wheel = document.getElementById(W.ids.wheel);
    const pawl = document.getElementById(W.ids.pawl);
    if (wheel) wheel.setAttribute('transform', `rotate(${A.alpha.toFixed(3)} ${R.cx} ${R.cy})`);
    if (pawl && A.theta !== null) {
        pawl.setAttribute('transform', `translate(${R.pivot.x} ${R.pivot.y}) rotate(${A.theta.toFixed(3)})`);
    }
}

const easeInOutCubic = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeInQuad = t => t * t;

function ratchetFrame(W, now) {
    const A = W.anim;
    const dt = Math.min((now - A.last) / 1000, 0.05);
    A.last = now;

    const seg = A.segments[0];
    if (seg) {
        seg.t += dt * 1000;
        const k = Math.min(seg.t / seg.dur, 1);
        A.alpha = seg.from + (seg.to - seg.from) * seg.ease(k);
        if (k >= 1) { A.alpha = seg.to; A.segments.shift(); }
    }

    const solved = solvePawlAngle(A.alpha);
    if (solved !== null) {
        if (A.theta === null || solved < A.theta) A.theta = solved;
        else A.theta = Math.min(solved, A.theta + RATCHET.closeSpeed * dt);
    }
    drawRatchet(W);

    const settled = solved === null || (A.theta !== null && Math.abs(A.theta - solved) < 0.01);
    if (A.segments.length || !settled) {
        A.raf = requestAnimationFrame(t => ratchetFrame(W, t));
    } else {
        A.raf = null;
    }
}

function triggerWheelAnimation(key) {
    const W = ratchetWheels[key], R = RATCHET, A = W.anim;
    W.rotation += R.step;
    const target = W.rotation + R.restOffset;
    const from = A.alpha;
    const dist = Math.max(target + R.overshoot - from, 1);
    const dur = Math.max(160, Math.min(560, 560 * dist / (R.step + R.overshoot)));
    A.segments = [
        { from, to: target + R.overshoot, dur, t: 0, ease: easeInOutCubic },
        { from: target + R.overshoot, to: target, dur: 90, t: 0, ease: easeInQuad }
    ];
    if (!A.raf) { A.last = performance.now(); A.raf = requestAnimationFrame(t => ratchetFrame(W, t)); }
}

function renderRatchetTeeth(numTeeth = 10) {
    const R = RATCHET;
    R.teeth = numTeeth;
    R.step = 360 / numTeeth;
    calibrateRatchetPhase();

    const pts = ratchetWheelPoints(0).map(p => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ');
    const pawlPts = ratchetPawlLocal().map(p => `${p.x},${p.y}`).join(' ');

    Object.values(ratchetWheels).forEach(W => {
        const container = document.getElementById(W.ids.teeth);
        if (!container) return;
        container.innerHTML = `<polygon points="${pts}" fill="#111827" stroke="${W.color}" stroke-width="${R.wheelStroke}" stroke-linejoin="round"/>`;

        const pawl = document.getElementById(W.ids.pawl);
        if (pawl) {
            pawl.setAttribute('points', pawlPts);
            pawl.setAttribute('stroke-width', R.pawlStroke);
        }

        W.rotation = 0;
        W.anim.alpha = R.restOffset;
        W.anim.theta = solvePawlAngle(W.anim.alpha);
        drawRatchet(W);
    });
}

function updateRatchetHud(spinning) {
    const anyActive = spinning.length > 0;
    Object.keys(ratchetWheels).forEach(key => {
        const box = document.getElementById(`ratchet-box-${key}`);
        const state = document.getElementById(`ratchet-state-${key}`);
        if (!box) return;
        const active = spinning.includes(key);
        box.classList.toggle('ratchet-active', active);
        box.classList.toggle('ratchet-idle', anyActive && !active);
        if (state) state.textContent = active ? 'Avance d\u2019un cran' : 'Au repos';
    });
}