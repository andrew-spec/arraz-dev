// GUN DEFINITIONS
const combineStats = function(arr) {
    try {
    // Build a blank array of the appropiate length
    let data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    arr.forEach(function(component) {
        for (let i=0; i<data.length; i++) {
            data[i] = data[i] * component[i];
        }
    });
    return {
        reload:     data[0],
        recoil:     data[1],
        shudder:    data[2], 
        size:       data[3],
        health:     data[4],
        damage:     data[5],
        pen:        data[6],
        speed:      data[7],
        maxSpeed:   data[8],
        range:      data[9],
        density:    data[10],
        spray:      data[11],
        resist:     data[12],
    };
    } catch(err) {
        console.log(err);
        console.log(JSON.stringify(arr));
    }
};
const skillSet = (() => {
    let config = require('../config.json');
    let skcnv = {
        rld: 0,
        pen: 1,
        str: 2,
        dam: 3,
        spd: 4,
    
        shi: 5,
        atk: 6,
        hlt: 7,
        rgn: 8,
        mob: 9,
    };
    return args => {
        let skills = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let s in args) {
            if (!args.hasOwnProperty(s)) continue;
            skills[skcnv[s]] = Math.round(config.MAX_SKILL * args[s]);
        }
        return skills;
    };
})();

const g = { // Gun info here
    trap:               [40,    1,     0.1,    0.6,    1,      0.2,    1.1,    5,      1,      1,      1,      15,     3],
    swarm:              [36,    0.25,  0.05,   0.4,    1.2,    0.175,  1,      3.5,    1,      1,      1.4,    5,      1.3],
    drone:              [66,    0.25,  0.1,    0.6,    3.6,    0.4,    1,      2.5,    1,      1,      1,      0.1,    1],
    factory:            [72,    1,     0.1,    0.7,    2,      0.2,    1,      3,      1,      1,      1,      0.1,    1],
    basic:              [16,    1.4,   0.1,    1,      2,      0.2,    1,      4.5,    1,      1,      1,      15,     1],
   ak47:              [10,    0,   0.1,    1,      3,      3,    3,      5,    1,      1,      1,      1,     1],
     SMG:              [25,    0,   0.1,    1,      3,      3,    3,      5,    1,      5,      1,      1,     1],
   magnum_rifle:              [50,    0,   0.1,    1,      3,      1,    5,      10,    1,      1,      1,      1,     1],
    basicH:              [12.5,    1.4,   0.1,    1,      2,      -0.4,    1,      6,    1,      1,      1,      15,     1],
    heal:               [16,    1.4,   0.1,    1,      1.5,   -0.1,    1,      4.5,    1,      1,      1,      15,     1],
    frag:               [100,1.4,   0.25,   1,      0.75,   0.50,   1,      1,    1,      1,      1,      15,     1],
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */
    blank:              [1,     1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
        spam:           [1.1,   1,     1,      1.05,   1,      1.1,    1,      0.9,    0.7,    1,      1,      1,      1.05],
        minion:         [1,     1,     2,      1,      0.4,    0.4,    1.2,    1,      1,      0.75,   1,      2,      1],
        single:         [1.05,  1,     1,      1,      1.5,      1.5,      1.5,      1.05,   1,      1,      1,      1,      1],
    sniper:             [1.3,   1,     0.25,   1,      1,      1,      1,      1.2,    1.2,    1,      1.2,    0.25,   1.2],
        rifle:          [0.85,  0.8,   1.5,    1,      0.95,   0.9,    0.9,    1,      1,      1,      1,      1.5,    1],
        assass:         [1.5,   1,     0.25,   1,      1,      1,      1,      1.1,    1.1,    1,      1.1,    0.5,    1.1],
        hunter:         [1.5,   0.7,   1,      0.95,   0.9,    0.8,    1,      1.05,   0.8,    1,      1.2,    1,      1.15],
            hunter2:    [1,     1,     1,      0.9,    0.9,    0.85,   0.9,    1,      1,      1,      0.9,    1,      1],
            preda:      [1.3,   1,     1,      0.8,    1.35,   0.9,    1.2,    0.9,    0.9,    1,      1,      1,      1],
            snake:      [0.4,   1,     4,      1,      1.5,    0.9,    1.2,    0.2,    0.35,   1,      3,      6,      0.5],
            sidewind:   [1.5,   2,     1,      1,      1.8,    1.4,    1.2,    0.2,    0.6,    1,      1,      1,      1],
     sidewind2:   [3.5,   2,     1,      1,      2,    2,    2,    0.4,    0.6,    1,      1,      1,      1],
            snakeskin:  [0.6,   1,     2,      1,      0.5,    0.5,    1,      1,      0.2,    0.4,    1,      5,      1],
    mach:               [0.5,   0.8,   1.7,    1,      0.7,    0.75,   1,      1,      0.8,    1,      1,      2.5,    1],
        mini:           [1.25,  0.6,   1,      0.8,    0.55,   1,    1.3,    1.33,   1,      1,      1.25,   0.5,    1.1],
   uzi:           [0.75,  0.6,   1,      0.8,    0.55,   1,    1.3,    1.33,   1,      1,      1.25,   0.5,    1.1],
            stream:     [1.1,   0.6,   1,      1,      1,      1.3,   1,      1.24,   1,      1,      1,      1,      1],
            barricade:  [0.475, 1,     1,      1,      0.9,    1,      0.9,    1.1,    1,      1,    1,      1,      1],
   elitetrapper:  [0.75, 1,     1,      1,      0.9,    0.9,      0.9,    1.1,    1,      0.5,    1,      1,      1],
        shotgun:        [8,     0.2,   1,      1.5,    1,      0.4,    0.7,    1.8,    0.6,    1,      1.2,    1.2,    1],
        vulc:           [1.1,   0.01,  1,      0.8,    0.75,    0.35,    0.75,   1.3,    1,      1,      1,      0.4,    1],
    flank:              [1,     1.2,   1,      1,      1.02,   0.81,   0.9,    1,      0.85,   1,      1.2,    1,      1],
        tri:            [1,     0.9,   1,      1,      1,      1,      1,      0.9,    0.9,    0.7,    1,      1,      1],
            trifront:   [1,     0.2,   1,      1,      1,      1,      1,      1.3,    1.1,    1.5,    1,      1,      1],
            thruster:   [1,     1.25,  2,      1,      0.5,    0.5,    0.7,    1,      1,      1,      1,      0.5,    0.7],
        auto: /*pure*/  [1.8,   0.75,  0.5,    0.8,    0.9,    0.6,    1.2,    1.1,    1,      0.8,    1.3,    1,      1.25],
            five:       [1.15,  1,     1,      1,      1,      1,      1,      1.05,   1.05,   1.1,    2,      1,      1],
            heavy3:     [0.92,  1,     1,      1,      1.085,  1.085,  1,      1,      1,      1,      1,      1,      1],
            autosnipe:  [2.73,  0.833, 0.25,   1.4,    0.86,   1.09,   1.06,   1.38,   1.62,   1,      2,      0.25,   1.56],
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */
    pound:              [2,     1.75,  1,      1,      1,      1.6,    1,      0.85,   0.8,    1,      1.6,    1,      1.15],
        destroy:        [2.1,   1.75,  0.5,    1,      1.7,    1.7,    1.2,    0.75,   0.5,    1,      1.6,    1,      3],
            anni:       [0.85,  1.2,   1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
            hive:       [0.75,  0.3,   1,      0.8,    0.85,   0.5,    1.25,   1.05,   0.6,    1,      1,      1,      1],
            bees:       [1.8,   1,     1,      1.4,    1.3,    0.75,   0.6,    3,      1.5,    1,      0.25,   1,      1],
        arty:           [1.2,   0.75,  1,      0.9,    1,      1,      1,      1.15,   1.1,    1,      1.5,    1,      1],
            spreadmain: [25/32, 0.25,  0.5,    1,      0.7,    1,      1,      1.58,   0.95,   1,      1,      1,      1],
            spread:     [1.5,   1,     0.25,   1,      1.1,    1.1,    1,      0.85,   0.85,   1,      1,      0.25,   1],
            skim:       [1.325, 0.8,   0.8,    0.9,    1.33,   1,      1.8,    0.4,    0.4,    1.3,    1,      1,      1.1],
    twin:               [1,     0.5,   0.9,    1,      0.8,    0.875,  1,      1,      1,      1,      1,      1.2,    1],
        bent:           [1,     1,     0.8,    1,      0.8,    1,      0.8,    1,      1,      1,      0.8,    0.5,    1],
            bentdouble: [1,     1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
        triple:         [1.2,   0.667, 0.9,    1,      0.8,    0.8,    0.91,   1,      1,      1,      1.1,    0.9,    0.95],
            quint:      [1.5,   0.667, 0.9,    1,      1,      1,      0.9,    1,      1,      1,      1.1,    0.9,    0.95],
            dual:       [3,     1,     0.8,    1,      1.35,   1,      1,      1.3,    1.1,    1,      1,      1,      1.25],
            penta:      [1,     1,     1,      1,      0.9,    0.81,   1,      1,      1,      1,      1,      1,      1],
        double:         [1,     1,     1,      1,      0.8,    0.8,    0.8,    1,      1,      1,      1,      1,      1],
            hewn:       [1.25,  1.5,   1,      1,      0.85,   0.85,   1,      1,      0.9,    1,      1,      1,      1],
        puregunner:     [1,     0.25,  1.5,    1.2,    1.4,    0.25,   1.25,   0.8,    0.65,   1,      1.5,    1.5,    1.2],
            machgun:    [0.6,   0.8,   2,      1,      1,      0.9,    1,      1.2,    0.8,    1,      1,      2.5,    1],
   lance: [0.75, 0, 0.1, 1, 0.05, 4, 0.9, 0.7, 1, 0.05, 1, 180, 1],          
  hurricane:  [1,     1,     1,      1,      1.3,    1.3,    1.1,    1.5,    1.15,   1,      1,      1,      1],
    gunner:             [1.25,  0.25,  1.5,    1.1,    1,      0.35,   1.35,   0.9,    0.8,    1,      1.5,    1.5,    1.2],
        power:          [1,     1,     0.6,    1.2,    1,      1,      1.25,   2,      1.7,    1,      2,      0.5,    1.5],
            nail:       [0.85,  2.5,   1,      0.8,    1,      0.75,   1.1,    1,      1,      1,      2,      1,      1],
        fast:           [1,     1,     1,      1,      1,      1,      1,      1.2,    1,      1,      1,      1,      1],
    turret:             [2,     1,     1,      1,      0.6,    0.5,    0.5,    0.9,    0.9,    1,      0.1,    1,      1],
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */
    battle:             [1,     1,     1,      1,      1.2,    1.2,    1.1,    1,      0.85,   1,      1,      1,      1.1],
        carrier:        [1.1,   1,     1,      1,      1,      0.9,    1,      1.1,    1.1,    1.1,    1,      1,      1],
    hexatrap:           [1.2,   1,     1.25,   1,      1,      1,      1,      0.8,    1,      0.5,    1,      1,      1],
    block:              [1.1,   2,     0.2,    1.5,    2,      1,      1.135,  1.5,    2.5,    1.25,   1,      1,      1.25],
        construct:      [1.3,   1,     1,      0.9,    1,      1.45,   1,      0.87,   0.95,   1,      1,      1,      1],
        boomerang:      [0.8,   1,     1,      1,      1.1,    0.6,    1.5,    0.75,   0.75,   1.35,   1,      1,      1],
        quadtrap:       [1.1,   1,     1,      1,      0.9,    0.8,    0.9,    1.2,    1,      1,      1,      1,      1.1],
    over:               [1.25,  1,     1,      0.85,   0.7,    0.8,    1,      1,      0.9,    1,      2,      1,      1],
    over2: [1.25, 1, 1, 0.85, 1.3, 1.8, 2, 1.8, 0.9, 1, 2, 1, 1],
    master: [1, 1, 1, 0.7, 1.25, 1.25, 1.25, 1, 1, 0.1, 0.5, 1, 1],
        meta:           [1,     1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
        overdrive:      [1,     1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
        weak:           [2,     1,     1,      1,      0.6,    0.6,    0.8,    0.5,    0.7,    0.25,   0.3,    1,      1],
        commander:      [3,     1,     1,      0.7,    0.4,    0.4,    0.5,    1,      1,      0.1,    0.5,    1,      1],
        sunchip:        [4,     1,     1,      1.4,    0.4,    0.35,   0.5,    0.8,    1,      1,      0.6,    1,      1],
            male:       [0.5,   1,     1,      1.05,   1.15,   1.15,   1.15,   0.8,    0.8,    1,      1.15,   1,      1],
    babyfactory:        [1.5,   1,     1,      1,      1,      1,      1,      1,      1.35,   1,      1,      1,      1],
    stronger:           [1,     1,     1,      1,      1.05,   1.05,   1,      1.1,    1,      1,      1,      1,      1],
    bitweak:            [1,     1,     1,      1,      0.95,   0.9,    1,      1,      1,      1,      1,      1,      1],
    lowpower:           [1,     1,     2,      1,      0.5,    0.5,    0.7,    1,      1,      1,      1,      0.5,    0.7],
    halfrecoil:         [1,     0.5,   1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
   norecoil:         [1,     0,   1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    morerecoil:         [1,     1.15,  1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    muchmorerecoil:     [1,     1.35,  1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    lotsmorrecoil:      [1,     1.8,   1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    tonsmorrecoil:      [1,     4,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    opreload:           [0.1,   1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    doublereload:       [0.5,   1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    morereload:         [0.75,  1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    bitmorereload:      [0.875, 1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    fifthreload:        [5,     1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    thirdreload:        [3,     1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    halfreload:         [2,     1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    lessreload:         [1.5,   1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    threequartersrof:   [1.333, 1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    bitlessreload:      [1.05,  1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    morespeed:          [1,     1,     1,      1,      1,      1,      1,      1.3,    1.3,    1,      1,      1,      1],
    bitmorespeed:       [1,     1,     1,      1,      1,      1,      1,      1.1,    1.1,    1,      1,      1,      1],
    slow:               [1,     1,     1,      1,      1,      1,      1,      0.7,    0.7,    1,      1,      1,      1],
    notdense:           [1,     1,     1,      1,      1,      1,      1,      1,      1,      1,      0.1,    1,      1],
    halfrange:          [1,     1,     1,      1,      1,      1,      1,      1,      1,      0.5,    1,      1,      1],
    morerange:          [1,     1,     1,      1,      1,      1,      1,      1.75,   1.75,   1.25,   1,      1,      1],
    fake:               [1,     1,     1,   0.00001, 0.0001,   1,      1,   0.00001,   2,      0,      1,      1,      1],
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */
    bitop:              [1,     1,     1,      1.1,    3,      1.5,    1.5,    1.3,    1.3,   1.3,     1.3,    0.2,    1],
    op:                 [1,     1.1,   1,      1.1,   20,     20,     20,      5,      2,     1.4,     4,      0.1,    1],
  ac:  [1, 0, 1, 1, 3, 3, 3, 2.5, 2, 1, 5, 2, 1],
    moreop:             [0.5,   0.5,   1,      1,    100,    100,    100,      1.5,    1.5,   1,       1,      0.5,    1],
    protectorswarm:     [2.5,   0,     1,      1,    500,      2,      1,      1,      1,     0.4,     10,     1,     10],
    protectordrone:     [0.5,   0,     1,      1,  75000,      5,      1,      1,      1,     1,       10,     0.1,   10],
    destroyDominator:   [6,  0,     1,      1,    10,    10,      10,    0.5,   1,     1,     1,      1.25,   1],
   rainbow:   [2,  0,     1,      1,    1,    1,      1,    1,   1,     1,     1,      1.25,   1],
    heavycannon:        [3,  0,     1,      1,    3,    3,      3,    0.75,   1,     1,     1,      1.25,   1],
    gunnerDominator:    [0.65,  0,     1,      0.5,    1,    2,      1.6,    2.5,   1,     1.5,     1,      1.25,   1],
    trapperDominator:   [2.5,  0,     1,      0.8,    2,    2.5,      1,    0.5,   1,     0.8,     1,      1.25,   1],
    mothership:         [0.75,     1,     1,      1,      1.2,    1.2,    1.2,    0.75,    0.6,   15,      1,      1,      1.25],
    skimboss:           [1,     0.5,   1,      0.9,    1,      1,      1,      1,      1,     0.7,     1,      1,      1],
    summoner:           [0.35,  1,     1,      1.125,  0.25,   0.25,   0.15,   1,      1,     1,       0.8,    1,      1],
  summoner2:           [0.35,  0,     1,      1.125,  0.75,   0.75,   0.75,   1,      1,     1,       0.8,    1,      1],
   bighive: [1, 1, 1, 2, 0.5, 0.5, 0.5, 0.1, 0.5, 1, 1, 1, 1],
    boom: [50, 1, 1, 100, 0.5, 0.5, 0.5, 0, 0.5, 1, 1, 1, 1],
     poison: [50, 1, 1, 5, 5, 0.75, 0.5, 0, 0.5, 5, 1, 1, 1],
   
   poisonGun:              [50,    1.4,   0.1,    1,      2,      1,    1,      4.5,    1,      1,      1,      15,     1],
   poison2: [50, 1, 1, 5, 5, 0.75, 0.5, 1.5, 0.5, 5, 1, 1, 1],
   fire: [40, 1, 1, 5, 2.5, 0.75, 0.5, 0, 0.5, 5, 1, 1, 1],
   fireGun:              [25,    1.4,   0.1,    1,      2,      0.2,    1,      4.5,    1,      1,      1,      15,     1],
   fire2: [40, 1, 1, 5, 2.5, 0.75, 0.5, 1.5, 0.5, 5, 1, 1, 1],
   nuke: [300, 1, 1, 1, 5, 0.75, 0.5, 3, 1, 5, 1, 1, 1],
  smashhive: [1, 1, 1, 2, 1, 1, 1, 0.1, 0.5, 1, 1, 1, 1],
    biggerhive: [1, 1, 1, 5, 2, 2, 2, 1, 1, 1, 1, 1, 1],
};

const dfltskl = 9;

// NAMES
const statnames = {
    smasher: 1,
    drone: 2,
    necro: 3,
    swarm: 4,
    trap: 5,
    generic: 6,
};
const gunCalcNames = {
    default: 0,
    bullet: 1,
    drone: 2,
    swarm: 3,
    fixedReload: 4,
    thruster: 5,
    sustained: 6,
    necro: 7,
    trap: 8,
};

// ENTITY DEFINITIONS
exports.genericEntity = {
    NAME: '',
    LABEL: 'Unknown Entity',
    TYPE: 'unknown',
    DAMAGE_CLASS: 0, // 0: def, 1: food, 2: tanks, 3: obstacles
    DANGER: 0,
    VALUE: 0,
    SHAPE: 0,
    COLOR: 16,    
    INDEPENDENT: false,
    CONTROLLERS: ['doNothing'],    
    HAS_NO_MASTER: false,
    MOTION_TYPE: 'glide', // motor, swarm, chase
    FACING_TYPE: 'toTarget', // turnWithSpeed, withMotion, looseWithMotion, toTarget, looseToTarget
    DRAW_HEALTH: false,
    DRAW_SELF: true,
    DAMAGE_EFFECTS: true,
    RATEFFECTS: true,
    MOTION_EFFECTS: true,
    INTANGIBLE: false,
    PASSIVE: false,
    ACCEPTS_SCORE: true,
    GIVE_KILL_MESSAGE: false,
    CAN_GO_OUTSIDE_ROOM: false,
    HITS_OWN_TYPE: 'normal', // hard, repel, never, hardWithBuffer
    DIE_AT_LOW_SPEED: false,
    DIE_AT_RANGE: false,
   POISON_TO_APPLY: 0,
  POISON: false,
  SHOW_POISON: false,
   ICE: false,
    ICE_TO_APPLY: 0,
    SHOWICE: false,
    SHOCK: false,
    SHOCK_TO_APPLY: 100000,
    SHOWSHOCK: false,
   BURN: false,
    BURN_TO_APPLY: 0,
    SHOWBURN: false,
    CLEAR_ON_MASTER_UPGRADE: false,
    PERSISTS_AFTER_DEATH: false,
    VARIES_IN_SIZE: false,
    HEALTH_WITH_LEVEL: true,
    CAN_BE_ON_LEADERBOARD: true,
    HAS_NO_RECOIL: false,
    AUTO_UPGRADE: 'none',
    BUFF_VS_FOOD: false,
    OBSTACLE: false,
    CRAVES_ATTENTION: false,
    NECRO: false,
    UPGRADES_TIER_1: [],
    UPGRADES_TIER_2: [],
    UPGRADES_TIER_3: [],
    SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    LEVEL: 0,
    SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl],
    GUNS: [],
    MAX_CHILDREN: 0,
    BODY: {
        ACCELERATION: 1,
        SPEED: 0,
        HEALTH: 1,
        RESIST: 1,
        SHIELD: 0,
        REGEN: 0,
        DAMAGE: 1,
        PENETRATION: 1,

        RANGE: 0,
        FOV: 1,
        DENSITY: 1,
        STEALTH: 1,
        PUSHABILITY: 1,        
        HETERO: 2,
    },    
    FOOD: {
        LEVEL: -1,
    },
};

// FOOD
exports.food = {
    TYPE: 'food',
    DAMAGE_CLASS: 1,
    CONTROLLERS: ['moveInCircles'],
    HITS_OWN_TYPE: 'repel',
    MOTION_TYPE: 'drift',
    FACING_TYPE: 'turnWithSpeed',
    VARIES_IN_SIZE: true,
    BODY: {
        STEALTH: 30,
        PUSHABILITY: 1,
    },
    DAMAGE_EFFECTS: false,
    RATEFFECTS: false,
    HEALTH_WITH_LEVEL: false,
};
exports.poisonEffect2 = {
    PARENT: [exports.food],
    
    COLOR: 11,
    SIZE: 5,
   
PASSIVE: true,
    // DIE_AT_LOW_SPEED: true,
   // DIE_AT_RANGE: true,
};

const basePolygonDamage = 1;
const basePolygonHealth = 2;
exports.hugePentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 5,
    },
    LABEL: 'Alpha Pentagon',
    VALUE: 15000,
    SHAPE: -5,
    SIZE: 58,
    COLOR: 14,
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 80,
        HEALTH: 300 * basePolygonHealth,
        RESIST: Math.pow(1.25, 3),
        SHIELD: 40 * basePolygonHealth,
        REGEN: 0.6,
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
exports.bigPentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 4,
    },
    LABEL: 'Beta Pentagon',
    VALUE: 2500,
    SHAPE: 5,
    SIZE: 30,
    COLOR: 14,
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 30,
        HEALTH: 50 * basePolygonHealth,
        RESIST: Math.pow(1.25, 2),
        SHIELD: 20 * basePolygonHealth,
        REGEN: 0.2,
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
exports.pentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 3,
    },
    LABEL: 'Pentagon',
    VALUE: 400,
    SHAPE: 5,
    SIZE: 16,
    COLOR: 14,
    BODY: {
        DAMAGE: 1.5 * basePolygonDamage,
        DENSITY: 8,
        HEALTH: 10 * basePolygonHealth,
        RESIST: 1.25,
        PENETRATION: 1.1,
    },
    DRAW_HEALTH: true,
};
exports.triangle = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 2,
    },
    LABEL: 'Triangle',
    VALUE: 120,
    SHAPE: 3,
    SIZE: 9,
    COLOR: 2,
    BODY: {
        DAMAGE: basePolygonDamage,
        DENSITY: 6,
        HEALTH: 3 * basePolygonHealth,
        RESIST: 1.15,
        PENETRATION: 1.5,
    },
    DRAW_HEALTH: true,
};
exports.square = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 1,
    },
    LABEL: 'Square',
    VALUE: 30,
    SHAPE: 4,
    SIZE: 10,
    COLOR: 13,
    BODY: {
        DAMAGE: basePolygonDamage,
        DENSITY: 4,
        HEALTH: basePolygonHealth,
        PENETRATION: 2,
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
};
exports.egg = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 0,
    },
    LABEL: 'Egg',
    VALUE: 10,
    SHAPE: 0,
    SIZE: 5,
    COLOR: 6,
    INTANGIBLE: true,
    BODY: {
        DAMAGE: 0,
        DENSITY: 2,
        HEALTH: 0.0011,
        PUSHABILITY: 0,
    },
    DRAW_HEALTH: false,
};

exports.greenpentagon = {
    PARENT: [exports.food],
    LABEL: 'Pentagon',
    VALUE: 30000,
    SHAPE: 5,
    SIZE: 16,
    COLOR: 1,
    BODY: {
        DAMAGE: 3,
        DENSITY: 8,
        HEALTH: 200,
        RESIST: 1.25,
        PENETRATION: 1.1,
    },
    DRAW_HEALTH: true,
};
exports.greentriangle = {
    PARENT: [exports.food],
    LABEL: 'Triangle',
    VALUE: 7000,
    SHAPE: 3,
    SIZE: 9,
    COLOR: 1,
    BODY: {
        DAMAGE: 1,
        DENSITY: 6,
        HEALTH: 60,
        RESIST: 1.15,
        PENETRATION: 1.5,
    },
    DRAW_HEALTH: true,
};
exports.greensquare = {
    PARENT: [exports.food],
    LABEL: 'Square',
    VALUE: 2000,
    SHAPE: 4,
    SIZE: 10,
    COLOR: 1,
    BODY: {
        DAMAGE: 0.5,
        DENSITY: 4,
        HEALTH: 20,
        PENETRATION: 2,
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
};

exports.gem = {
    PARENT: [exports.food],
    LABEL: 'Gem',
    VALUE: 2000,
    SHAPE: 6,
    SIZE: 5,
    COLOR: 0,
    BODY: {
        DAMAGE: basePolygonDamage/4,
        DENSITY: 4,
        HEALTH: 10,
        PENETRATION: 2,
        RESIST: 2,
        PUSHABILITY: 0.25,
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
};
exports.obstacle = {
    TYPE: 'wall',
    DAMAGE_CLASS: 1,
    LABEL: 'Rock',
    FACING_TYPE: 'turnWithSpeed',
    SHAPE: -9,
    BODY: {
        PUSHABILITY: 0,
        HEALTH: 10000,
        SHIELD: 10000,
        REGEN: 1000,
        DAMAGE: 1,
        RESIST: 100,
        STEALTH: 1,
    },
    VALUE: 0,
    SIZE: 60,
    COLOR: 16,
    VARIES_IN_SIZE: true,
    GIVE_KILL_MESSAGE: true,
    ACCEPTS_SCORE: false,
};
    exports.babyObstacle = {
        PARENT: [exports.obstacle],
        SIZE: 25,
        SHAPE: -7,
        LABEL: "Gravel",
    };
exports.mazewall = {
    TYPE: 'wall',
    DAMAGE_CLASS: 1,
    LABEL: 'Rock',
   HITS_OWN_TYPE: 'never', // hard, repel, never, hardWithBuffer, normal
  
    SHAPE: 4,
    BODY: {
        PUSHABILITY: 0,
        HEALTH: 10000,
        SHIELD: 10000,
        REGEN: 1000,
        DAMAGE: 1,
        SPEED: 0,
        RESIST: 100,
        STEALTH: 1,
        DENSITY: 1000000000000000000000,
    },
    VALUE: 0,
    SIZE: 109,
    COLOR: 16,
    VARIES_IN_SIZE: false,
    GIVE_KILL_MESSAGE: false,
    ACCEPTS_SCORE: false,
        };
// WEAPONS
const wepHealthFactor = 0.5;
const wepDamageFactor = 1.5;
exports.bullet = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.shard = {
        PARENT: [exports.bullet],
        LABEL: 'Shard',
        SHAPE: 208,
    };
    exports.explosion = {
        PARENT: [exports.bullet],
        LABEL: 'Explosion',
        MOTION_TYPE: 'explode',
    BODY: {
        RANGE: 30,
        PUSHABILITY: 0,
    },
    };
exports.poisonEffect = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    COLOR: 11,
    SIZE: 5,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 10,
        DENSITY: 1.25,
        HEALTH: 1,
        DAMAGE: 0,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.poison = {
    LABEL: 'Bullet',
  PARENT: [exports.bullet],
  POISON_TO_APPLY: 0,
  POISON: true,
  POISONED: true,
  SHOW_POISON:true,
};
exports.iceEffect = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    COLOR: 22,
    SIZE: 5,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 10,
        DENSITY: 1.25,
        HEALTH: 1,
        DAMAGE: 0,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.icebullet = {
  PARENT: [exports.bullet],
    ACCEPTS_SCORE: false,
    ICE: true,
    ICE_TO_APPLY: 1,
    SHOWICE: true,
   
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.burnEffect = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    COLOR: 12,
    SIZE: 5,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 10,
        DENSITY: 1.25,
        HEALTH: 1,
        DAMAGE: 0,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};

exports.burnbullet = {
    PARENT: [exports.bullet],
    ACCEPTS_SCORE: false,
    BURN: true,
    BURN_TO_APPLY: 1,
    SHOWBURN: true,
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.shockEffect = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    COLOR: 3,
    SIZE: 5,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 10,
        DENSITY: 1.25,
        HEALTH: 1,
        DAMAGE: 0,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.shockBullet = {
    LABEL: 'Beem',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    SHAPE: -1,
  SHOCK: true,
    SHOCK_TO_APPLY: 3,
    SHOWSHOCK: true,
    BODY: {
        PENETRATION: 10,
        SPEED: 4,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.infernobullet = {
    LABEL: 'Flame',
    TYPE: 'bullet',
  SHAPE: 228,
    ACCEPTS_SCORE: false,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 80,
        DENSITY: 1.25,
        HEALTH: 0.4 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
    exports.casing = {
        PARENT: [exports.bullet],
        LABEL: 'Shell',
        TYPE: 'swarm',
    };
exports.nader4 = {
        PARENT: [exports.bullet],
        LABEL: 'Grenade (4)',
        BODY: {
            RANGE: 90,
            FOV: 0.5,
        },  
        SHAPE: 0,
        //FACING_TYPE: 'turnWithSpeed',
        INDEPENDENT: true,
        CONTROLLERS: ['alwaysFire'],
        AI: { NO_LEAD: true, },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   1,    5,      1,      0,      0,      120,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.frag]),
                    TYPE: [exports.bullet],
                    PERSISTS_AFTER_DEATH: false,
                    AUTOFIRE: true,
            }, }, {
            POSITION: [   1,    5,      1,      0,      0,     240,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.frag]),
                    TYPE: [exports.bullet],
                    PERSISTS_AFTER_DEATH: false,
                    AUTOFIRE: true,
            }, }, {
            POSITION: [   1,    5,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.frag]),
                    TYPE: [exports.bullet],
                     PERSISTS_AFTER_DEATH: false,
                    AUTOFIRE: true,
            }, }, 
        ],
    };
exports.nade4 = {
        PARENT: [exports.bullet],
        LABEL: 'Grenade (4)',
        BODY: {
            RANGE: 90,
            FOV: 0.5,
        },  
        SHAPE: 0,
        //FACING_TYPE: 'turnWithSpeed',
        INDEPENDENT: true,
        CONTROLLERS: ['alwaysFire'],
        AI: { NO_LEAD: true, },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   1,    10,      1,      0,      0,      120,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.frag]),
                    TYPE: [exports.nader4],
                    PERSISTS_AFTER_DEATH: false,
                  AUTOFIRE: true,
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,     240,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.frag]),
                    TYPE: [exports.nader4],
                    PERSISTS_AFTER_DEATH: false,
                    AUTOFIRE: true,
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.frag]),
                    TYPE: [exports.nader4],
                    PERSISTS_AFTER_DEATH: false,
                    AUTOFIRE: true,
            }, }, 
        ],
    };
exports.swarm = {
    LABEL: 'Swarm Drone',
    TYPE: 'swarm',
    ACCEPTS_SCORE: false,
    SHAPE: 3,
    MOTION_TYPE: 'swarm',
    FACING_TYPE: 'smoothWithMotion',
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    CRAVES_ATTENTION: true,
    BODY: {
        ACCELERATION: 3,
        PENETRATION: 1.5,
        HEALTH: 0.35 * wepHealthFactor,
        DAMAGE: 1.5 * wepDamageFactor,
        SPEED: 4.5,
        RESIST: 1.6,
        RANGE: 225,
        DENSITY: 12,
        PUSHABILITY: 0.5,
        FOV: 1.5,
    },
    DIE_AT_RANGE: true,
    BUFF_VS_FOOD: true,
};
    exports.bee = {
        PARENT: [exports.swarm],
        PERSISTS_AFTER_DEATH: true, 
        SHAPE: 4, 
        LABEL: 'Drone',
        HITS_OWN_TYPE: 'hardWithBuffer',
    };
    exports.autoswarm = {
        PARENT: [exports.swarm],
        AI: { FARMER: true, },
        INDEPENDENT: true,
    };

exports.trap = {
    LABEL: 'Thrown Trap',
    TYPE: 'trap',
    ACCEPTS_SCORE: false,
    SHAPE: -3, 
    MOTION_TYPE: 'glide', // def
    FACING_TYPE: 'turnWithSpeed',
    HITS_OWN_TYPE: 'push',
    DIE_AT_RANGE: true,
    BODY: {
        HEALTH: 1 * wepHealthFactor,
        DAMAGE: 2 * wepDamageFactor,
        RANGE: 450,
        DENSITY: 2.5,
        RESIST: 2.5,
        SPEED: 0,
    },
};
    exports.block = {
        LABEL: 'Set Trap',
        PARENT: [exports.trap],
        SHAPE: -4,
        MOTION_TYPE: 'motor',    
        CONTROLLERS: ['goToMasterTarget'],
        BODY: {
            SPEED: 1,
            DENSITY: 5,
        },
    };
 exports.xyvtrap = {
        LABEL: 'Set Trap',
        PARENT: [exports.trap],
        SHAPE: -4,
        MOTION_TYPE: 'xyv2',    
        CONTROLLERS: ['goToMasterTarget'],
        BODY: {
            SPEED: 1,
            DENSITY: 5,
        },
    };
    exports.boomerang = {
        LABEL: 'Boomerang',
        PARENT: [exports.trap],
        CONTROLLERS: ['boomerang'],
        MOTION_TYPE: 'motor',  
        HITS_OWN_TYPE: 'never',
        SHAPE: -5,
        BODY: {
            SPEED: 1.25,
            RANGE: 120,
        },
    };

exports.drone = {
    LABEL: 'Drone',
    TYPE: 'drone',
    ACCEPTS_SCORE: false,
    DANGER: 2,
    CONTROL_RANGE: 0,
    SHAPE: 3,
    MOTION_TYPE: 'chase',
    FACING_TYPE: 'smoothToTarget',
    CONTROLLERS: [
        'nearestDifferentMaster',
        'canRepel',
        'mapTargetToGoal',
        'hangOutNearMaster'
    ],
    AI: {
        BLIND: true,
    },
    BODY: {
        PENETRATION: 1.2,
        PUSHABILITY: 0.6,
        ACCELERATION: 0.05,
        HEALTH: 0.4 * wepHealthFactor,
        DAMAGE: 2 * wepDamageFactor,
        SPEED: 5,
        RANGE: 200,
        DENSITY: 0.03,
        RESIST: 1,
        FOV: 0.9,
    },
    HITS_OWN_TYPE: 'hard',
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    BUFF_VS_FOOD: true,
};
exports.poisonDrone = {
    LABEL: 'Drone',
  PARENT: [exports.drone],
  POISON_TO_APPLY: 0,
  POISON: true,
  POISONED: true,
  SHOW_POISON:true,
};
exports.aquadrone = {
    LABEL: 'Drone',
    TYPE: 'drone',
    ACCEPTS_SCORE: false,
    DANGER: 2,
    COLOR: 10,
    CONTROL_RANGE: 0,
    SHAPE: 'm -0.74832,-0.74832 a 1.05832,1.05832 0 0 1 1.15332,-0.229412 1.05832,1.05832 0 0 1 0.65332,0.97776 1.05832,1.05832 0 0 1 -0.65332,0.97776 1.05832,1.05832 0 0 1 -1.15332,-0.229412 l 0.74832,-0.74832 z',
    MOTION_TYPE: 'chase',
    FACING_TYPE: 'smoothToTarget',
    CONTROLLERS: [
        'nearestDifferentMaster',
        'canRepel',
        'mapTargetToGoal',
        'hangOutNearMaster'
    ],
    AI: { BLIND: true, },
    BODY: {
        PENETRATION: 1.2,
        PUSHABILITY: 0.6,
        ACCELERATION: 0.05,
        HEALTH: 0.6 * wepHealthFactor,
        DAMAGE: 1.25 * wepDamageFactor,
        SPEED: 3.8,
        RANGE: 200,
        DENSITY: 0.03,
        RESIST: 1.5,
        FOV: 0.8,
    },
    HITS_OWN_TYPE: 'hard',
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    BUFF_VS_FOOD: true,
};
exports.dronej = {
    LABEL: 'Drone',
    TYPE: 'drone',
    ACCEPTS_SCORE: false,
    DANGER: 2,
    CONTROL_RANGE: 0,
    SHAPE: 'm-0.85496,-1.1037 0.29259,0.72561 -0.76957,0.39528 0.76674,0.39393 -0.28976,0.71867 1.1037,-0.26177 0.42502,-0.85501 -0.42502,-0.85496z',
    MOTION_TYPE: 'chase',
    FACING_TYPE: 'smoothToTarget',
    CONTROLLERS: [
        'nearestDifferentMaster',
        'canRepel',
        'mapTargetToGoal',
        'hangOutNearMaster'
    ],
    AI: { BLIND: true, },
    BODY: {
        PENETRATION: 1.2,
        PUSHABILITY: 0.6,
        ACCELERATION: 0.05,
        HEALTH: 0.6 * wepHealthFactor,
        DAMAGE: 1.25 * wepDamageFactor,
        SPEED: 3.8,
        RANGE: 200,
        DENSITY: 0.03,
        RESIST: 1.5,
        FOV: 0.8,
    },
    HITS_OWN_TYPE: 'hard',
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    BUFF_VS_FOOD: true,
};
exports.VisDrone = {
    LABEL: 'Drone',
    TYPE: 'drone',
    ACCEPTS_SCORE: false,
    DANGER: 2,
    CONTROL_RANGE: 0,
    SHAPE: [[-0.1,0.3],[-0.43,0.95],[0.92,0.275],[0.934,-0.28],[-0.435,-0.974],[-0.1,-0.3],[0.43,-0.01]],
    MOTION_TYPE: 'chase',
    FACING_TYPE: 'smoothToTarget',
    CONTROLLERS: [
        'nearestDifferentMaster',
        'canRepel',
        'mapTargetToGoal',
        'hangOutNearMaster'
    ],
    AI: { BLIND: true, },
    BODY: {
        PENETRATION: 2,
        PUSHABILITY: 0,
        ACCELERATION: 0.05,
        HEALTH: 1 * wepHealthFactor,
        DAMAGE: 2 * wepDamageFactor,
        SPEED: 3.8,
        RANGE: 200,
        DENSITY: 0.03,
        RESIST: 1.5,
        FOV: 0.8,
    },
    HITS_OWN_TYPE: 'hard',
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    BUFF_VS_FOOD: true,
};
exports.destroyerD = {
    LABEL: 'Drone',
    TYPE: 'drone',
    SHAPE: [ //destroyer/gunship/BEST ONE EVERRRR
      [1, 0],
                                [0, 1],
                                [-0.58019, 1],
                                [-1.24193, 0.38417],
                                [-0.21257, 0.36801],
                                [-0.21257, -0.36801],
                                [-1.24193, -0.38417],
                                [-0.58019, -1],
                                [0, -1],
                      ],
    SIZE: 10,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        SPEED: 5,
        ACCEL: 0.01,
        HEALTH: 1,
        DAMAGE: 10,
        PENETRATION: 2,
        PUSHABILITY: 0,
        DENSITY: 10,
        RESIST: 2,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothWithMotion',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
};
exports.adrone = {
    PARENT: [exports.drone],

     AI: {
        BLIND: true,
        FARMER: true,
    },
    INDEPENDENT: true,
};

    exports.sunchip = {
        PARENT: [exports.drone],
        SHAPE: 4,
        NECRO: true,
        HITS_OWN_TYPE: 'hard',
        BODY: {
            FOV: 0.5,
        },
        AI: {
            BLIND: true,
            FARMER: true,
        },
        DRAW_HEALTH: false,
    };
exports.necroblock = {
    PARENT: [exports.block],
    SHAPE: 4, 
    NECRO: true,
};

    exports.autosunchip = {
        PARENT: [exports.sunchip],
        AI: {
            BLIND: true,
            FARMER: true,
        },
        INDEPENDENT: true,
    };
    exports.gunchip = {
        PARENT: [exports.drone],
        SHAPE: -2,
        NECRO: true,
        HITS_OWN_TYPE: 'hard',
        BODY: {
            FOV: 0.5,
        },
        AI: {
            BLIND: true,
            FARMER: true,
        },
        DRAW_HEALTH: false,
    };

exports.missile = {
    PARENT: [exports.bullet],
    LABEL: 'Missile',
    INDEPENDENT: true,
    BODY: {
        RANGE: 120,
    },  
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  14,     6,      1,      0,     -2,     130,     0,   ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                STAT_CALCULATOR: gunCalcNames.thruster,
            }, }, {
        POSITION: [  14,     6,      1,      0,      2,     230,     0,  ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                STAT_CALCULATOR: gunCalcNames.thruster,    
            }, }, 
    ],
};
    exports.hypermissile = {
        PARENT: [exports.missile],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  14,     6,      1,      0,     -2,     150,     0,   ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                    STAT_CALCULATOR: gunCalcNames.thruster,
                }, }, {
            POSITION: [  14,     6,      1,      0,      2,     210,     0,   ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                    STAT_CALCULATOR: gunCalcNames.thruster,
                }, }, {        
            POSITION: [  14,     6,      1,      0,     -2,      90,    0.5,  ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, }, {
            POSITION: [  14,     6,      1,      0,      2,     270,    0.5,  ],  
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, },
        ],
    };
    exports.snake = {
        PARENT: [exports.bullet],
        LABEL: 'Snake',
        INDEPENDENT: true,
        BODY: {
            RANGE: 120,
        },  
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,    12,     1.4,     8,      0,     180,    0,   ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    STAT_CALCULATOR: gunCalcNames.thruster,
                    SHOOT_SETTINGS: combineStats([
                        g.basic, g.sniper, g.hunter, g.hunter2, g.snake, g.snakeskin,
                    ]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, }, {
            POSITION: [  10,    12,     0.8,     8,      0,     180,   0.5,  ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    NEGATIVE_RECOIL: true,
                    STAT_CALCULATOR: gunCalcNames.thruster,
                    SHOOT_SETTINGS: combineStats([
                        g.basic, g.sniper, g.hunter, g.hunter2, g.snake,
                    ]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, },
        ],
    };
    exports.hive = {
        PARENT: [exports.bullet],
        LABEL: 'Hive',
        BODY: {
            RANGE: 90,
            FOV: 0.5,
        },  
        FACING_TYPE: 'turnWithSpeed',
        INDEPENDENT: true,
        CONTROLLERS: ['alwaysFire', 'nearestDifferentMaster', 'targetSelf',],
        AI: { NO_LEAD: true, },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   7,    9.5,    0.6,     7,      0,      108,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,    
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      180,    0.2,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      252,    0.4,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm, 
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      324,    0.6,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm, 
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      36,     0.8,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, 
        ],
    };

// TANK CLASSES
const base = {
    ACCEL: 1.6,
    SPEED: 5.25,
    HEALTH: 20,
    DAMAGE: 3,
    RESIST: 1,
    PENETRATION: 1.05,
    SHIELD: 8,
    REGEN: 0.025,
    FOV: 1,
    DENSITY: 0.5,
};
exports.genericTank = {
    LABEL: 'Unknown Class',
    TYPE: 'tank',
    DAMAGE_CLASS: 2,
    DANGER: 5,
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'toTarget',
   POISON_TO_APPLY: 0,
  POISON: false,
  SHOW_POISON: false,
   ICE: false,
    ICE_TO_APPLY: 0,
    SHOWICE: false,
    SHOCK: false,
    SHOCK_TO_APPLY: 0,
    SHOWSHOCK: false,
   BURN: false,
    BURN_TO_APPLY: 0,
    SHOWBURN: false,
    SIZE: 12,
    MAX_CHILDREN: 0,   
    DAMAGE_EFFECTS: false,
    BODY: { // def
        ACCELERATION: base.ACCEL,
        SPEED: base.SPEED,
        HEALTH: base.HEALTH, 
        DAMAGE: base.DAMAGE, 
        PENETRATION: base.PENETRATION, 
        SHIELD: base.SHIELD,
        REGEN: base.REGEN,
        FOV: base.FOV,
        DENSITY: base.DENSITY,
        PUSHABILITY: 0.9,
        HETERO: 3,
    },
    GUNS: [],
    TURRETS: [],
    TRIGGERS: {},
    GIVE_KILL_MESSAGE: true,
    DRAW_HEALTH: true,
};

let gun = { };
exports.VisTurret = {
                PARENT: [exports.genericTank],
                LABEL: 'VisTurret',
                CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  18,     4,      1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.single, g.sniper]),
                            TYPE: exports.bullet,
                        }, },  {
            POSITION: [  12,    4,    -1.8,      0,     5.5,     0,      0,   ], 
                                                  },  {

            POSITION: [  18,     4,      1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.single, g.sniper]),
                            TYPE: exports.bullet,
                        }, },  {
            POSITION: [  12,    4,    -1.8,      0,    -5.5,     0,     0.5,  ], 
                    }
                ],
            };
exports.bowTurret = {
                PARENT: [exports.genericTank],
                LABEL: 'Gun',
                CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  30,     10,      1,      0,     0,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.single, g.sniper, g.halfreload, g.halfreload]),
                            TYPE: exports.bullet,
                        }, },  {
            POSITION: [  20,    10,    -1.8,      0,     0,     0,      0,   ], 
                                                  }
                ],
            };
exports.eggBossCircleProp = {
    SHAPE: 0,
  PARENT: [exports.genericTank]
    
};
exports.droneoverride = {
    LABEL: 'Drone',
    TYPE: 'drone',
    ACCEPTS_SCORE: false,
    DANGER: 2,
    CONTROL_RANGE: 0,
    SHAPE: 0,
    MOTION_TYPE: 'chase',
    FACING_TYPE: 'smoothToTarget',
    CONTROLLERS: [
        'nearestDifferentMaster',
        'canRepel',
        'mapTargetToGoal',
        'hangOutNearMaster'
    ],
    AI: {
        BLIND: true,
    },
    BODY: {
        PENETRATION: 1.2,
        PUSHABILITY: 0.6,
        ACCELERATION: 0.05,
        HEALTH: 1.5 * wepHealthFactor,
        DAMAGE: 2.5 * wepDamageFactor,
        SPEED: 5.5,
        RANGE: 200,
        DENSITY: 0.03,
        RESIST: 1.5,
        FOV: 0.8,
    },
    HITS_OWN_TYPE: 'hard',
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    BUFF_VS_FOOD: true,
   TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
     
        
        POSITION: [10, 0, 0, 0, 360, 1, ],
        TYPE: exports.eggBossCircleProp, 
    },],
};
exports.autoTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 2.5
    },
    COLOR: 16,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    10,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret]),
                TYPE: exports.bullet,
            }, },
    ],
};
    exports.machineAutoTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Turret',
        COLOR: 16,
        //CONTROLLERS: ['nearestDifferentMaster'],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  14,    11,     1.3,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.gunner]),
                    TYPE: exports.bullet,
                }, },
        ],
    };
exports.batteryTurret = {
            PARENT: [exports.genericTank],
            LABEL: 'Battery',
            DANGER: 6,
   BODY: {
        FOV: 2.4
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
    COLOR: 16,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  12,    3.5,     1,      0,     7.25,    0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  12,    3.5,     1,      0,    -7.25,    0,     0.5, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,     3.75,    0,      0.25,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,    -3.75,    0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                      }, }, 
                   { 
                POSITION: [  20,    3.5,     1,      0,    0,    0,     0, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, 
            ],
        };
exports.battery = {
            PARENT: [exports.genericTank],
            LABEL: 'Battery',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  12,    3.5,     1,      0,     7.25,    0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  12,    3.5,     1,      0,    -7.25,    0,     0.5, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,     3.75,    0,      0.25,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,    -3.75,    0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                      }, }, 
                   { 
                POSITION: [  20,    3.5,     1,      0,    0,    0,     0, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, 
            ],
        };
    exports.autoSmasherTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Turret',
        COLOR: 16,
        //CONTROLLERS: ['nearestDifferentMaster'],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     6,      1,      0,      5,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, g.fast, g.mach, g.pound, g.morereload, g.morereload]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, }, {
            POSITION: [  20,     6,      1,      0,     -5,      0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, g.fast, g.mach, g.pound, g.morereload, g.morereload]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, },
        ],
    };
    exports.oldAutoSmasherTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Turret',
        COLOR: 16,
        //CONTROLLERS: ['nearestDifferentMaster'],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     7,      1,      0,    -5.75,    0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.lotsmorrecoil, g.morereload]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, }, {            
            POSITION: [  20,     7,      1,      0,     5.75,    0,     0.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.lotsmorrecoil, g.morereload]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, },
        ],
    };
exports.auto2gun = {
    LABEL: '',
    BODY: {
        FOV: 2.4
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
    COLOR: 16,
    GUNS: [{
        POSITION: [21, 10, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto,]),
            TYPE: exports.bullet
        }
    }]
};
exports.auto3gun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 3,
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    COLOR: 16,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    10,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto]),
                TYPE: exports.bullet,
            }, }
    ],
};
    exports.auto5gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 3,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    11,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto, g.five]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
  exports.singlegun = {
                PARENT: [exports.genericTank],
                LABEL: 'Cannon',
                //CONTROLLERS: ['nearestDifferentMaster'],
      BODY: {
            FOV: 3,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.heavycannon]),
                            TYPE: exports.bullet,
                        }, },  {
                    POSITION: [  5.5,    8,    -1.8,    6.5,     0,      0,      0,   ],                         
                    }
                ],
            }; 
 exports.buildergun = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Trapper',
            STAT_NAMES: statnames.trap,
          
    BODY: {
            FOV: 3,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  15,     7,      1,      0,      0,      0,      0,   ],
                }, {
            POSITION: [   3,     7,     1.7,    15,      0,      0,      0,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                        TYPE: exports.trap,
                      AUTOFIRE: true,
                    }, },
            ],
        };
    exports.heavy3gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 2,
            SPEED: 0.9,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  22,    14,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.auto]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
    exports.masterGun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 3,
        },
        CONTROLLERS: ['nearestDifferentMaster'], 
        COLOR: 16,
        MAX_CHILDREN: 7,
        AI: {
            NO_LEAD: true,
            SKYNET: true,
            FULL_VIEW: true,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   8,     14,    1.3,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.master]),
                    TYPE: exports.drone,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, },
        ],
    };
    exports.sniper3gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 5,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  27,     9,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.auto, g.assass, g.autosnipe]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [   5,     9,     -1.5,    8,      0,      0,      0,   ], 
            },
        ],
    };
    exports.bansheegun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        INDEPENDENT: true,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  26,    10,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto, g.lessreload]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
    exports.auto4gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 2,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  16,     4,      1,      0,    -3.5,     0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     4,      1,      0,     3.5,     0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
    exports.bigauto4gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  14,     5,      1,      0,    -4.5,     0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  14,     5,      1,      0,     4.5,     0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     5,      1,      0,      0,      0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }
        ],
    };

exports.tritrapgun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  20,    16,      1,      0,      0,      0,      0,   ], 
        }, {
        POSITION: [   2,    16,     1.1,     20,     0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block, g.auto]),
                TYPE: exports.block,
            }, },
    ],
};
exports.smasherBody = {
    LABEL: '',
    CONTROLLERS: ['spin'], 
    COLOR: 9,
    SHAPE: 6,
    INDEPENDENT: true,
};
exports.spikeBody = {
    LABEL: '',
    CONTROLLERS: ['spin'],
    COLOR: 9,
    SHAPE: -4,
    INDEPENDENT: true,
};
    exports.spikeBody1 = {
        LABEL: '',
        CONTROLLERS: ['fastspin'], 
        COLOR: 9,
        SHAPE: 3,
        INDEPENDENT: true,
    };
    exports.spikeBody2 = {
        LABEL: '',
        CONTROLLERS: ['reversespin'], 
        COLOR: 9,
        SHAPE: 3,
        INDEPENDENT: true,
    };
exports.megasmashBody = {
    LABEL: '',
    CONTROLLERS: ['spin'], 
    COLOR: 9,
    SHAPE: -6,
    INDEPENDENT: true,
};
exports.dominationBody = {
    LABEL: '',
    CONTROLLERS: ['dontTurn'], 
    COLOR: 9,
    SHAPE: 135,
    INDEPENDENT: true,
};
exports.bb_squ2 = {
    PARENT: [exports.genericTank],
    LABEL: '',
    AUTOFIRE: true,
    SHAPE: 4,
    COLOR: 26,
  
};
exports.mod_ring = {
    PARENT: [exports.genericTank],
    LABEL: '',
    AUTOFIRE: true,
    SHAPE: 0,
    SIZE: 0.2,
    TURRETS: [ { /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  0.01,     100,      0,     0,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     0,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     0,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     0,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     2,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     2,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     2,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     2,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     4,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     4,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     4,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     4,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     6,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     6,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     6,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     6,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     8,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     8,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     8,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     8,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     10,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     10,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     10,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     10,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     12,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     12,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     12,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     12,    0,  0], //
            TYPE: exports.bb_squ2,
          }, {
          POSITION: [  0.01,     100,      0,     14,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     14,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     14,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     14,    0,  0], //
            TYPE: exports.bb_squ2,
           }, {
          POSITION: [  0.10,     100,      0,     16,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     16,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     16,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     16,    0,  0], //
            TYPE: exports.bb_squ2,
           }, {
          POSITION: [  0.01,     100,      0,     18,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     18,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     18,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     18,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     20,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     20,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     20,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     20,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     22,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     22,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     22,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,    22,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     24,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     24,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     24,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     24,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     26,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     26,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     26,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     26,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     28,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     28,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     28,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     28,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     30,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     30,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     30,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     30,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     32,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,    32,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,    32,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,    32,    0,  0], //
            TYPE: exports.bb_squ2,
          }, {
          POSITION: [  0.01,     100,      0,     34,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     34,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     34,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     34,    0,  0], //
            TYPE: exports.bb_squ2,
           }, {
          POSITION: [  0.01,     100,      0,     36,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     36,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     36,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     36,    0,  0], //
            TYPE: exports.bb_squ2,
           }, {
          POSITION: [  0.10,     100,      0,     38,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     38,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     38,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     38,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     40,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     40,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     40,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     40,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     42,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     42,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     42,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     42,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     44,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     44,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     44,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     44,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.10,     100,      0,     46,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     46,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     46,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     46,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,    48,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     48,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     48,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     48,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     50,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     50,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     50,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     50,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     52,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     52,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     52,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     52,    0,  0], //
            TYPE: exports.bb_squ2,
          }, {
          POSITION: [  0.01,     100,      0,     54,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     54,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     54,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     54,    0,  0], //
            TYPE: exports.bb_squ2,
           }, {
          POSITION: [  0.01,     100,      0,     56,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     56,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     56,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     56,    0,  0], //
            TYPE: exports.bb_squ2,
           }, {
        POSITION: [  0.01,     100,      0,     58,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     58,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     58,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     58,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     60,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     60,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     60,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     60,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     62,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     62,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     62,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     62,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     64,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     64,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     64,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     64,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     66,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     66,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     66,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     66,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     68,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     68,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     68,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     68,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     70,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     70,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     70,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     70,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.10,     100,      0,     72,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     72,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     72,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     72,    0,  0], //
            TYPE: exports.bb_squ2,
          }, {
          POSITION: [  0.01,     100,      0,     74,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     74,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     74,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     74,    0,  0], //
            TYPE: exports.bb_squ2,
           }, {
          POSITION: [  0.01,     100,      0,     76,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     76,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     76,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     76,    0,  0], //
            TYPE: exports.bb_squ2,
           }, {
          POSITION: [  0.01,     100,      0,     78,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     -100,      0,     78,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,    78,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     78,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     80,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     80,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     80,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     80,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     82,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     82,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     82,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     82,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     84,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     84,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     84,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     84,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     86,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     86,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     86,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     86,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     88,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     88,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     88,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     88,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     90,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     90,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     90,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     90,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          //odd number parts
          POSITION: [  0.01,     100,      0,     1,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     1,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     1,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     1,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     3,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     3,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     3,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     3,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     5,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     5,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     5,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     5,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     7,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     7,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     7,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     7,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     9,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     9,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     9,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     9,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     11,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     11,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     11,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     11,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     13,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     13,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     13,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     13,    0,  0], //
            TYPE: exports.bb_squ2,
          }, {
          POSITION: [  0.01,     100,      0,     15,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     15,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     15,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     15,    0,  0], //
            TYPE: exports.bb_squ2,
           }, {
          POSITION: [  0.10,     100,      0,     17,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     17,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     17,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     17,    0,  0], //
            TYPE: exports.bb_squ2,
           }, {
          POSITION: [  0.01,     100,      0,     19,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     19,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     19,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     19,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     21,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     21,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     21,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     21,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     23,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     23,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     23,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,    23,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     25,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     25,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     25,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     25,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     27,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     27,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     27,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     27,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     29,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     29,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     29,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     29,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     31,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     31,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     31,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     31,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     33,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,    33,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,    33,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,    33,    0,  0], //
            TYPE: exports.bb_squ2,
          }, {
          POSITION: [  0.01,     100,      0,     35,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     35,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     35,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     35,    0,  0], //
            TYPE: exports.bb_squ2,
           }, {
          POSITION: [  0.01,     100,      0,     37,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     37,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     37,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     37,    0,  0], //
            TYPE: exports.bb_squ2,
           }, {
          POSITION: [  0.10,     100,      0,     39,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     39,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     39,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     39,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     41,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     41,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     41,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     41,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     43,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     43,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     43,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     43,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     45,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     45,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     45,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     45,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.10,     100,      0,     47,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     47,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     47,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     47,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,    49,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     49,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     49,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     49,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     51,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     51,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     51,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     51,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     53,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     53,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     53,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     53,    0,  0], //
            TYPE: exports.bb_squ2,
          }, {
          POSITION: [  0.01,     100,      0,     55,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     55,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     55,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     55,    0,  0], //
            TYPE: exports.bb_squ2,
           }, {
          POSITION: [  0.01,     100,      0,     57,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     57,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     57,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     57,    0,  0], //
            TYPE: exports.bb_squ2,
           }, {
        POSITION: [  0.01,     100,      0,     59,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     59,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     59,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     59,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     61,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     61,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     61,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     61,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     63,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     63,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     63,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     63,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     65,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     65,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     65,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     65,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     67,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     67,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     67,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     67,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     69,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     69,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     69,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     69,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     71,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     71,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     71,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     71,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.10,     100,      0,     73,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     73,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     73,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     73,    0,  0], //
            TYPE: exports.bb_squ2,
          }, {
          POSITION: [  0.01,     100,      0,     75,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     75,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     75,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     75,    0,  0], //
            TYPE: exports.bb_squ2,
           }, {
          POSITION: [  0.01,     100,      0,     77,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     77,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     77,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     77,    0,  0], //
            TYPE: exports.bb_squ2,
           }, {
          POSITION: [  0.01,     100,      0,     79,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     -100,      0,     79,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,    79,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     79,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     81,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     81,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     81,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     81,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     83,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     83,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     83,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     83,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     85,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     85,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     85,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     85,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     87,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     87,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     87,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     87,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     89,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     89,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     89,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     89,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
          POSITION: [  0.01,     100,      0,     91,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     -100,      0,     91,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [  0.01,     0,      100,     91,    0,  0], //
            TYPE: exports.bb_squ2,
        }, {
        POSITION: [ 0.01,     0,      -100,     91,    0,  0], //
            TYPE: exports.bb_squ2,
        },
    ],
};
    exports.baseSwarmTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Protector',
        COLOR: 16,
        BODY: {
            FOV: 2,
        },
        CONTROLLERS: ['nearestDifferentMaster'], 
        AI: {
            NO_LEAD: true,
            LIKES_SHAPES: true,
        },
        INDEPENDENT: true,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   5,    4.5,    0.6,     7,      2,      0,     0.15, ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.protectorswarm]),
                    TYPE: exports.swarm,
                    STAT_CALCULATOR: gunCalcNames.swarm,          
                }, }, {
            POSITION: [   5,    4.5,    0.6,     7,     -2,      0,     0.15, ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.protectorswarm]),
                    TYPE: exports.swarm,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, {
            POSITION: [   5,    4.5,    0.6,    7.5,     0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.protectorswarm]),
                    TYPE: [exports.swarm, { INDEPENDENT: true, AI: { LIKES_SHAPES: true, }, }, ],
                    STAT_CALCULATOR: gunCalcNames.swarm,  
            }, }
        ],
    };
    exports.baseGunTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Protector',
        BODY: {
            FOV: 5,
        },
        ACCEPTS_SCORE: false,
        CONTROLLERS: ['nearestDifferentMaster'], 
        INDEPENDENT: true,
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  12,    12,     1,       6,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.destroy]),
                    TYPE: exports.bullet,          
                }, }, {
            POSITION: [  11,    13,     1,       6,      0,      0,     0.1,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.destroy]),
                    TYPE: exports.bullet,          
                }, }, {
            POSITION: [   7,    13,    -1.3,     6,      0,      0,      0,   ],
                }
        ],
    };
        exports.baseProtector = {
            PARENT: [exports.genericTank],
            LABEL: 'Base',
            SIZE: 64,
            DAMAGE_CLASS: 0,
            ACCEPTS_SCORE: false,
            SKILL: skillSet({ 
                rld: 1,
                dam: 1,
                pen: 1,
                spd: 1,
                str: 1,
            }),
            BODY: { // def
                SPEED: 0,
                HEALTH: 10000, 
                DAMAGE: 10, 
                PENETRATION: 0.25, 
                SHIELD: 1000,
                REGEN: 100,
                FOV: 1,
                PUSHABILITY: 0,
                HETERO: 0,
            },
            //CONTROLLERS: ['nearestDifferentMaster'],
            FACING_TYPE: 'autospin',
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  25,     0,      0,      0,     360,  0], 
                    TYPE: exports.dominationBody,
                        }, {
                POSITION: [  12,     7,      0,      45,     100,  0], 
                    TYPE: exports.baseSwarmTurret,
                        }, {
                POSITION: [  12,     7,      0,     135,    100,  0], 
                    TYPE: exports.baseSwarmTurret,
                        }, {
                POSITION: [  12,     7,      0,     225,    100,  0], 
                    TYPE: exports.baseSwarmTurret,
                        }, {
                POSITION: [  12,     7,      0,     315,    100,  0], 
                    TYPE: exports.baseSwarmTurret,
                        },
            ],
            GUNS: [ /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,      45,     0,   ], }, {   
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,     135,     0,   ], }, {   
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,     225,     0,   ], }, {   
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,     315,     0,   ], }, {
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,      45,     0,   ], }, {   
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,     135,     0,   ], }, {   
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,     225,     0,   ], }, {   
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,     315,     0,   ], }, 
            ],
        };

exports.minion = {
    PARENT: [exports.genericTank],
    LABEL: 'Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.5,
        SPEED: 3,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     9,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.minion]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        }, }, 
    ],
};
exports.pillboxTurret = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    BODY: {
        FOV: 2,
    },
    HAS_NO_RECOIL: true,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    11,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minion, g.turret, g.power, g.auto, g.notdense]),
                TYPE: exports.bullet,
            }, },
    ],
};
exports.pillbox = {
    LABEL: 'Pillbox',
    PARENT: [exports.trap],
    SHAPE: -4,
    MOTION_TYPE: 'motor',    
    CONTROLLERS: ['goToMasterTarget', 'nearestDifferentMaster'],
    INDEPENDENT: true,
    BODY: {
        SPEED: 1,
        DENSITY: 5,
    },
    DIE_AT_RANGE: true, 
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11,     0,      0,      0,     360,  1], 
            TYPE: exports.pillboxTurret,
        }
    ]
};
exports.skimturret = {
    PARENT: [exports.genericTank],
    BODY: {
        FOV: base.FOV * 2,
    },
    COLOR: 2,
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    LABEL: '',
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  10,    14,    -0.5,     9,      0,      0,      0,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim]),
                TYPE: exports.hypermissile,
            }, }, {
        POSITION: [  17,    15,      1,      0,      0,      0,      0,  ], 
            },
    ],
};
  exports.turretedexplosion = {
    PARENT: [exports.explosion],
    INDEPENDENT: true,
    FACING_TYPE: 'autospin',
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [  9,     7,      0,     0,     170, 0], 
                TYPE: exports.pillboxTurret,
                    }, {
            POSITION: [  9,     7,      0,     60,    170, 0], 
                TYPE: exports.pillboxTurret,
                    }, {
            POSITION: [  9,     7,      0,     120,    170, 0], 
                TYPE: exports.pillboxTurret,
                    }, {
            POSITION: [  9,     7,      0,     180,    170, 0], 
                TYPE: exports.pillboxTurret,
                    }, {
            POSITION: [  9,     7,      0,     240,    170, 0], 
                TYPE: exports.pillboxTurret,
                    }, {
            POSITION: [  9,     7,      0,     300,    170, 0], 
                TYPE: exports.pillboxTurret,
                    },
        ],
};  

function makeAuto(type, name = -1, options = {}) {
    let turret = { type: exports.autoTurret, size: 10, independent: true, };
    if (options.type != null) { turret.type = options.type; }
    if (options.size != null) { turret.size = options.size; }
    if (options.independent != null) { turret.independent = options.independent; }
    
    let output = JSON.parse(JSON.stringify(type));
    let autogun = {
        /*********  SIZE               X       Y     ANGLE    ARC */
        POSITION: [  turret.size,     0,      0,     180,    360,  1,], 
        TYPE: [turret.type, { CONTROLLERS: ['nearestDifferentMaster'], INDEPENDENT: turret.independent, }],
    };
    if (type.GUNS != null) { output.GUNS = type.GUNS; }
    if (type.TURRETS == null) { output.TURRETS = [autogun]; }
    else { output.TURRETS = [...type.TURRETS, autogun]; }
    if (name == -1) { output.LABEL = 'Auto-' + type.LABEL; } else { output.LABEL = name; }
    output.DANGER = type.DANGER + 1;
    return output;
}
function makeOP(type, name = -1, options = {}) {
    let turret = { type: exports.arenacloser, size: 10, independent: true, };
    if (options.type != null) { turret.type = options.type; }
    if (options.size != null) { turret.size = options.size; }
    if (options.independent != null) { turret.independent = options.independent; }
    
    let output = JSON.parse(JSON.stringify(type));
    output.BODY = {
        ACCELERATION: base.ACCEL * 5.25,
      
        FOV: 1.5,
        HEALTH: 1000
    };
    let autogun = {
        /*********  SIZE               X       Y     ANGLE    ARC */
        POSITION: [  turret.size,     0,      0,     180,    360,  1,], 
        TYPE: [turret.type, { CONTROLLERS: ['nearestDifferentMaster'], INDEPENDENT: turret.independent, }],
    };
   let spawner = { 
        /********* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [   7,     12,    1.2,     8,      0,     180,     0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: [exports.drone, { INDEPENDENT: true, }],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: false,    
            MAX_CHILDREN: 3,
        }, };
    if (type.GUNS == null) { output.GUNS = [spawner]; }
    else { output.GUNS = [...type.GUNS, spawner]; }
    if (type.TURRETS == null) { output.TURRETS = [autogun]; }
    else { output.TURRETS = [...type.TURRETS, autogun]; }
    if (name == -1) { output.LABEL = 'OP-' + type.LABEL; } else { output.LABEL = name; }
    output.DANGER = type.DANGER + 1;
    return output;
}
function makeHybrid(type, name = -1) {
    let output = JSON.parse(JSON.stringify(type));
    let spawner = { 
        /********* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [   7,     12,    1.2,     8,      0,     180,     0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.weak]),
            TYPE: [exports.drone, { INDEPENDENT: true, }],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: false,    
            MAX_CHILDREN: 3,
        }, };
    if (type.TURRETS != null) { output.TURRETS = type.TURRETS; }
    if (type.GUNS == null) { output.GUNS = [spawner]; }
    else { output.GUNS = [...type.GUNS, spawner]; }
    if (name == -1) { output.LABEL = 'Hybrid ' + type.LABEL; } else { output.LABEL = name; }
    return output;
}
let burstBulletGuns = blob => {
  return [{
    POSITION: [0, 10.5, 1.2, 7, 0, blob, 1.5],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([
        [40, 0, 0.001, 1, 0.5, 3, 0.3, 8, 1, 3, 1, 0.00001, 2]
      ]),
      SYNCS_SKILLS: false,
      TYPE: [exports.shard, {
        PERSISTS_AFTER_DEATH: true,
      }],
      SHOOT_ON_DEATH: true,
      STAT_CALCULATOR: gunCalcNames.swarm,
      AUTOFIRE: true
    }
  }];
};
let burstBulletGuns2 = blob => {
  return [{
    POSITION: [0, 10.5, 1.2, 7, 0, blob, 1.5],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([
        [40, 0, 0.001, 1, 0.5, 3, 0.3, 8, 1, 3, 1, 0.00001, 2]
      ]),
      SYNCS_SKILLS: false,
      TYPE: [exports.shard, {
        PERSISTS_AFTER_DEATH: true,
      }],
      SHOOT_ON_DEATH: true,
      STAT_CALCULATOR: gunCalcNames.swarm,
      AUTOFIRE: true
    }
  }];
};
let burstBulletGunsKOKO = blob => {
  return [{
    POSITION: [0, 10.5, 1.2, 7, 0, blob, 1.5],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([
        [40, 0, 0.001, 1, 1.5, 1.5, 0.3, 8, 1, 3, 1, 0.00001, 2]
      ]),
      SYNCS_SKILLS: false,
      TYPE: [exports.shard, {
        PERSISTS_AFTER_DEATH: true,
      }],
      SHOOT_ON_DEATH: true,
      STAT_CALCULATOR: gunCalcNames.swarm,
      AUTOFIRE: true
    }
  }];
};
let burstBulletGunsTrap = blob => {
  return [{
    POSITION: [0, 10.5, 1.2, 7, 0, blob, 1.5],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([
        [40, 0, 0.001, 1, 0.5, 3, 0.3, 8, 1, 1, 1, 0.00001, 2]
      ]),
      SYNCS_SKILLS: false,
      TYPE: [exports.trap, {
        PERSISTS_AFTER_DEATH: true,
      }],
      SHOOT_ON_DEATH: true,
      STAT_CALCULATOR: gunCalcNames.swarm,
      AUTOFIRE: true
    }
  }];
};
let boomBulletGuns = blob => {
  return [{
    POSITION: [0, 10.5, 1.2, 7, 0, blob, 1.5],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([
        [50, 0, 0.001, 1, 5, 5, 5, 0, 1, 3, 1, 0.00001, 2]
      ]),
      SYNCS_SKILLS: false,
      TYPE: [exports.explosion, {
        PERSISTS_AFTER_DEATH: true,
      }],
      SHOOT_ON_DEATH: true,
      STAT_CALCULATOR: gunCalcNames.swarm,
      AUTOFIRE: true
    }
  }];
};
let boomBulletGuns2 = blob => {
  return [{
    POSITION: [0, 10.5, 1.2, 7, 0, blob, 1.5],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([
        [50, 0, 0.001, 1, 5, 5, 5, 0, 1, 3, 1, 0.00001, 2]
      ]),
      SYNCS_SKILLS: false,
      TYPE: [exports.turretedexplosion, {
        PERSISTS_AFTER_DEATH: true,
      }],
      SHOOT_ON_DEATH: true,
      STAT_CALCULATOR: gunCalcNames.swarm,
      AUTOFIRE: true
    }
  }];
};
let boomBulletGuns3 = blob => {
  return [{
    POSITION: [0, 0.1, 1.2, 11, 0, blob, 1.5],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([
         [50, 0, 0.001, 1, 5, 5, 5, 0, 1, 3, 1, 0.00001, 2]
      ]),
      SYNCS_SKILLS: false,
      TYPE: [exports.explosion, {
        PERSISTS_AFTER_DEATH: true,
      }],
      SHOOT_ON_DEATH: true,
      STAT_CALCULATOR: gunCalcNames.swarm,
      AUTOFIRE: true
    }
  }];
};
exports.rectangleShape = {
  PARENT: [exports.genericTank],
  SHAPE: 146,
  COLOR: 0,
};
exports.basic = {
    PARENT: [exports.genericTank],
    LABEL: 'Basic',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
          COLOR: 12,
        }, }, 
    ],
};
exports.autobasic = {
    PARENT: [exports.genericTank],
    LABEL: 'Auto-Basic',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
          COLOR: 12,
        }, }, 
    ],
   TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
               
                POSITION: [  11,     0,      0,     0,    360,   0, ],  
                    TYPE: [exports.genericTank]
                    }, {
                POSITION: [  11,     0,      0,       0,    360,   1, ],  
                    TYPE: [exports.auto3gun, { INDEPENDENT: true,}]
                    },
            ],
};
exports.acid = {
    PARENT: [exports.genericTank],
    LABEL: 'Acid',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1.2,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.poison,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
          COLOR: 12,
        }, }, 
    ],
   TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  8,     0,      15,      90,     1,  1], 
            TYPE: [exports.rectangleShape, { COLOR: 11,}]
        }
    ],
};
 exports.poisondronetank = {
                PARENT: [exports.genericTank],
                LABEL: 'Poisones Drones :)',
   // ALPHA: 0.00001,
                DANGER: 7,
                STAT_NAMES: statnames.drone,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.6,
                    SPEED: base.SPEED * 0.85,
                    FOV: base.FOV * 1.1,
                },
                //INVISIBLE: [0.08, 0.03],
                MAX_CHILDREN: 8,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.doublereload, g.doublereload]),
                            TYPE: exports.poisonDrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                        }, },
                ],
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  8,     0,      15,      90,     1,  1], 
            TYPE: [exports.rectangleShape, { COLOR: 11,}]
        }
    ],
            };
exports.radiation = {
    PARENT: [exports.genericTank],
    LABEL: 'Radiation',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1.2,      0,      -5.5,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
            TYPE: exports.poison,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
          COLOR: 12,
        }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1.2,      0,      5.5,      0,      0.5,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
            TYPE: exports.poison,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
          COLOR: 12,
        }, },
    ],
 TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  10,     0,      15,      90,     1,  1], 
            TYPE: [exports.rectangleShape, { COLOR: 11,}]
        }
    ],
};
exports.poisonthing = {
    PARENT: [exports.genericTank],
    LABEL: 'Poison',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  20,     12,      1.5,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
            TYPE: exports.poison,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
          COLOR: 12,
        }, }, 
    ],
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  8,     0,      15,      90,     1,  1], 
            TYPE: [exports.rectangleShape, { COLOR: 11,}]
        }
    ],
};
exports.venom = {
    PARENT: [exports.genericTank],
    LABEL: 'Venom',
  BODY: {
                    ACCELERATION: base.ACCEL * 0.5,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.5,
                },
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  25,     7,      -1.5,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
            TYPE: exports.poison,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
          COLOR: 12,
        }, }, 
    ],
   TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  12,     0,      15,      90,     1,  1], 
            TYPE: [exports.rectangleShape, { COLOR: 11,}]
        }
    ],
};
exports.icegun = {
        PARENT: [exports.genericTank],
        LABEL: 'Ice',
        BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    8.5,     1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                TYPE: exports.icebullet,
            }, },
        ],
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  10,     0,      -15,      90,     1,  1], 
            TYPE: exports.rectangleShape,
        }
    ],
    };
exports.hail = {
        PARENT: [exports.genericTank],
        LABEL: 'Hail',
        BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    8.5,     1.5,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.mach]),
                TYPE: exports.icebullet,
            }, },
        ],
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  10,     0,      -15,      90,     1,  1], 
            TYPE: exports.rectangleShape,
        }
    ],
    };
exports.firegun = {
        PARENT: [exports.genericTank],
        LABEL: 'Fire',
        BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  18,    12,     1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                TYPE: exports.burnbullet,
            }, },
        ],
   TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  12,     0,      15,      90,     1,  1], 
            TYPE: [exports.rectangleShape, { COLOR: 12,}]
        }
    ],
    };
exports.shockgun = {
        PARENT: [exports.genericTank],
        LABEL: 'Lightning',
        BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,    8.5,     1.8,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.shockBullet,
            }, },
        ],
   TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  12,     0,      15,      90,     1,  1], 
            TYPE: [exports.rectangleShape, { COLOR: 3,}]
        }
    ],
    };
let bomb = 3;
exports.burstBullet = {
  PARENT: [exports.bullet],
  LABEL: 'Nuke',
  SHAPE: 205,
    BODY: {
    RANGE: 60,
    SPEED: 10
  },
  SKILL: skillSet({
        rld: 0,
        dam: 1,
        pen: 1,
        str: 1,
        spd: 1,
        
    }),
  //SKILL_CAP: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  GUNS: [],
};
var amount = 1;
for (let i = 0; i < 360; i += 360 / 1) {
  exports.burstBullet.GUNS = exports.burstBullet.GUNS.concat(boomBulletGuns(i));
};
exports.explodingBullet = {
  PARENT: [exports.bullet],
  LABEL: 'Bullet',
   BODY: {
    RANGE: 60,
    SPEED: 10
  },
  SKILL: skillSet({
        rld: 0,
        dam: 1,
        pen: 1,
        str: 1,
        spd: 1,
        
    }),
  //SKILL_CAP: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  GUNS: [],
};
var amount = 1;
for (let i = 0; i < 360; i += 360 / 1) {
  exports.explodingBullet.GUNS = exports.explodingBullet.GUNS.concat(boomBulletGuns(i));
};
exports.bombadier = {
    PARENT: [exports.genericTank],
    LABEL: 'Bombadier',
   SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, bomb, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl,],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  10,     5,      1.4,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.fake]),
            SYNCS_SKILLS: false,   
            TYPE: exports.bullet
        }, }, {
        POSITION: [  18,     4,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, ]),
            SYNCS_SKILLS: true,   
            TYPE: exports.explodingBullet
        }, },  {
        POSITION: [  4,     8,      -1.2,      8,      0,      0,      0,   ], 
       }, 
    ],
};
exports.payload = {
    PARENT: [exports.genericTank],
    LABEL: 'Payload',
   SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, bomb, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl,],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  20,     5,      1.4,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.halfreload,  g.fake]),
            SYNCS_SKILLS: false,   
            TYPE: exports.bullet
        }, }, {
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.halfreload]),
            SYNCS_SKILLS: true,   
            TYPE: exports.burstBullet
        }, }, 
    ],
};
exports.shrapnel = {
    PARENT: [exports.genericTank],
    LABEL: 'Shrapnel',
   SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, bomb, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl,],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  20,     5,      1.4,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.halfreload,  g.fake]),
            SYNCS_SKILLS: false,   
            TYPE: exports.bullet
        }, }, {
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.halfreload, ]),
            SYNCS_SKILLS: true,   
            TYPE: exports.burstBullet
        }, },  {
        POSITION: [  4,     8,      -1.2,      8,      0,      0,      0,   ], 
       }, 
    ],
};
exports.shatterBullet = {
  PARENT: [exports.bullet],
  LABEL: 'Nuke',
  SHAPE: 205,
   BODY: {
    RANGE: 60,
    SPEED: 10
  },
  SKILL: skillSet({
        rld: 0,
        dam: 1,
        pen: 1,
        str: 1,
        spd: 1,
        
    }),
  GUNS: [],
 // SKILL_CAP: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
};
var amount = 1;
for (let i = 0; i < 360; i += 360 / 1) {
  exports.shatterBullet.GUNS = exports.shatterBullet.GUNS.concat(boomBulletGuns(i));
};
for (let i = 0; i < 360; i += 360 / 5) {
  exports.shatterBullet.GUNS = exports.shatterBullet.GUNS.concat(burstBulletGuns(i));
};
exports.bazooka = {
    PARENT: [exports.genericTank],
    LABEL: 'Bazooka',
   SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, bomb, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl,],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,     4,      1.5,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.halfreload,  g.fake]),
            SYNCS_SKILLS: false,   
            TYPE: exports.bullet
        }, }, {
        POSITION: [  20,     5,      1.4,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.halfreload,  g.fake]),
            SYNCS_SKILLS: false,   
            TYPE: exports.bullet
        }, }, {
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.halfreload, ]),
            SYNCS_SKILLS: true,   
            TYPE: exports.shatterBullet
        }, }, 
    ],
};
exports.burstBullet2 = {
  PARENT: [exports.bullet],
  LABEL: 'Nuke',
  INDEPENDENT: true,
  SHAPE: 205,
   BODY: {
    RANGE: 60,
    SPEED: 10
  },
  SKILL: skillSet({
        rld: 0,
        dam: 1,
        pen: 1,
        str: 1,
        spd: 1,
        
    }),
  //SKILL_CAP: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  GUNS: [],
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  9,     0,      0,      0,     360,  1], 
            TYPE: exports.autoTurret,
        }
    ]
};
var amount = 1;
for (let i = 0; i < 360; i += 360 / 1) {
  exports.burstBullet2.GUNS = exports.burstBullet2.GUNS.concat(boomBulletGuns2(i));
};
exports.armament = {
    PARENT: [exports.genericTank],
    LABEL: 'Armament',
   SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, bomb, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl,],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  2,     8,      -1.2,      18,      0,      0,      0,   ], 
            PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.halfreload, ]),
            SYNCS_SKILLS: true,   
            TYPE: exports.burstBullet2
        }, }, {
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        },
    ],
};
exports.taelgator = {
    PARENT: [exports.genericTank],
    LABEL: 'Taelgator',
    SHAPE: 202,
    DANGER: 2,
    COLOR: 31,
    SIZE: 9,
    BODY:{
      HEALTH: 9,
    },
    //CONTROLLERS: ['nearestDifferentMaster'],
};
exports.rpgrocket = {
  PARENT: [exports.bullet],
  LABEL: 'Rocket',
  SHAPE: 207,
    BODY: {
    RANGE: 60,
    SPEED: 10
  },
  SKILL: skillSet({
        rld: 0,
        dam: 1,
        pen: 1,
        str: 1,
        spd: 1,
        
    }),
//  SKILL_CAP: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [14, 12, 0.5, 0, 0, 180, 0, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil,

                g.morespeed, g.morespeed, g.doublereload
            ]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true,
               MOTION_TYPE: 'giffard',
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
        },
    },],
};
var amount = 1;
for (let i = 0; i < 360; i += 360 / 6) {
  exports.rpgrocket.GUNS = exports.rpgrocket.GUNS.concat(burstBulletGuns2(i));
};
for (let i = 0; i < 360; i += 360 / 5) {
  exports.rpgrocket.GUNS = exports.rpgrocket.GUNS.concat(burstBulletGuns(i));
};
exports.fragmenterBomb = {
  PARENT: [exports.bullet],
  LABEL: 'Bomb',
  SHAPE: -3,
    BODY: {
    RANGE: 60,
    SPEED: 10
  },
  SKILL: skillSet({
        rld: 0,
        dam: 1,
        pen: 1,
        str: 1,
        spd: 1,
        
    }),
//  SKILL_CAP: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  GUNS: [],
};
var amount = 1;
for (let i = 0; i < 360; i += 360 / 10) {
  exports.fragmenterBomb.GUNS = exports.fragmenterBomb.GUNS.concat(burstBulletGunsTrap(i));
};
for (let i = 0; i < 360; i += 360 / 10) {
  exports.fragmenterBomb.GUNS = exports.fragmenterBomb.GUNS.concat(burstBulletGunsTrap(i));
};
exports.fragmenter = {
    PARENT: [exports.genericTank],
    LABEL: 'Fragmenter',
   SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, bomb, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl,],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  20,     5,      1.2,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.halfreload,  g.fake]),
            SYNCS_SKILLS: false,   
            TYPE: exports.bullet
        }, }, {
        POSITION: [  18,     8,      1.3,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.halfreload, ]),
            SYNCS_SKILLS: true,   
            TYPE: exports.fragmenterBomb
        }, },  {
        POSITION: [  4,     8,      -1.2,      8,      0,      0,      0,   ], 
       }, 
    ],
};
exports.cocobomb = {
  PARENT: [exports.bullet],
  LABEL: 'Bomb',
  SHAPE: 224,
    BODY: {
    RANGE: 60,
    SPEED: 10
  },
  SKILL: skillSet({
        rld: 0,
        dam: 1,
        pen: 1,
        str: 1,
        spd: 1,
        
    }),
//  SKILL_CAP: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  GUNS: [],
};
var amount = 1;
for (let i = 0; i < 360; i += 360 / 20) {
  exports.cocobomb.GUNS = exports.cocobomb.GUNS.concat(burstBulletGunsKOKO(i));
};
for (let i = 0; i < 360; i += 360 / 20) {
  exports.cocobomb.GUNS = exports.cocobomb.GUNS.concat(burstBulletGunsKOKO(i));
};
exports.rpg = {
    PARENT: [exports.genericTank],
    LABEL: 'RPG',
   SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, bomb, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl,],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  20,     6,      1.3,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.halfreload]),
            SYNCS_SKILLS: true,   
            TYPE: exports.rpgrocket
        }, }, 
    ],
};
exports.coco = {
    PARENT: [exports.genericTank],
    LABEL: 'KOKO',
  BODY: {
    FOV: 5
  },
   SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, bomb, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl,],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  20,     6,      1.3,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.halfreload]),
            SYNCS_SKILLS: true,   
            TYPE: exports.cocobomb
        }, }, 
    ],
};
let shardBulletGuns = blob => {
  return [{
    POSITION: [0, 10.5, 1.2, 7, 0, blob, 1.5],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([
         [50, 0, 0.001, 1, 1, 1, 1, 2, 1, 3, 1, 0.00001, 2]
      ]),
      SYNCS_SKILLS: true,
      TYPE: [exports.burstBullet, {
        PERSISTS_AFTER_DEATH: true,
      }],
      SHOOT_ON_DEATH: true,
      STAT_CALCULATOR: gunCalcNames.swarm,
      AUTOFIRE: true
    }
  }];
};
exports.shardBullet = {
  PARENT: [exports.bullet],
  LABEL: 'Nuke',
  SHAPE: 205,
   BODY: {
    RANGE: 60,
    SPEED: 10
  },
  SKILL: skillSet({
        rld: 0,
        dam: 1,
        pen: 1,
        str: 1,
        spd: 1,
        
    }),
 // SKILL_CAP: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  GUNS: [],
};
var amount = 1;
for (let i = 0; i < 360; i += 360 / 6) {
  exports.shardBullet.GUNS = exports.shardBullet.GUNS.concat(shardBulletGuns(i));
};
for (let i = 0; i < 360; i += 360 / 1) {
  exports.shardBullet.GUNS = exports.shardBullet.GUNS.concat(boomBulletGuns(i));
};
exports.fragger = {
    PARENT: [exports.genericTank],
    LABEL: 'Fragger',
   SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, bomb, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl,],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     4,      1.4,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.halfreload, g.fake]),
            SYNCS_SKILLS: false,   
            TYPE: exports.bullet
        }, }, {
        POSITION: [  16,     6,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.halfreload,]),
            SYNCS_SKILLS: true,   
            TYPE: exports.shardBullet
        }, }, 
    ],
};
exports.marksman = {
    PARENT: [exports.genericTank],
    LABEL: 'Marksman',
   SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, bomb, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl,],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  20,     5,      1.7,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.mach, g.halfreload, g.fake]),
            SYNCS_SKILLS: false,   
            TYPE: exports.bullet
        }, }, {
        POSITION: [  18,     8,      1.2,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.mach, g.halfreload, ]),
            SYNCS_SKILLS: true,   
            TYPE: exports.burstBullet
        }, }, 
    ],
};
exports.inferno = {
    PARENT: [exports.genericTank],
    LABEL: 'Inferno',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
       POSITION: [  18,     5,      1.3,      0,      5,      0,      0,   ], 
    },
           {
        POSITION: [  25,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
            TYPE: exports.infernobullet,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
          COLOR: 12,
        }, }, 
    ],
};
exports.twinferno = {
    PARENT: [exports.genericTank],
    LABEL: 'Twinferno',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
       POSITION: [  18,     2.5,      1.3,      0,      7.5,      0,      0,   ], 
    },
           {
        POSITION: [  25,     4,      1,      0,      2.5,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.twin]),
            TYPE: exports.infernobullet,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
          COLOR: 12,
        }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
       POSITION: [  18,     2.5,      1.3,      0,      -7.5,      0,      0,   ], 
    },
           {
        POSITION: [  25,     4,      1,      0,      -2.5,      0,      0.5,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.twin]),
            TYPE: exports.infernobullet,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
          COLOR: 12,
        }, }, 
    ],
};
exports.doubleferno = {
    PARENT: [exports.genericTank],
    LABEL: 'Doubleferno',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
       POSITION: [  18,     2.5,      1.3,      0,      7.5,      0,      0,   ], 
    },
           {
        POSITION: [  25,     4,      1,      0,      2.5,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.twin]),
            TYPE: exports.infernobullet,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
          COLOR: 12,
        }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
       POSITION: [  18,     2.5,      1.3,      0,      -7.5,      0,      0,   ], 
    },
           {
        POSITION: [  25,     4,      1,      0,      -2.5,      0,      0.25,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.twin]),
            TYPE: exports.infernobullet,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
          COLOR: 12,
        }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
       POSITION: [  18,     2.5,      1.3,      0,      7.5,      180,      0,   ], 
    },
           {
        POSITION: [  25,     4,      1,      0,      2.5,      180,      0.5,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.twin]),
            TYPE: exports.infernobullet,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
          COLOR: 12,
        }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
       POSITION: [  18,     2.5,      1.3,      0,      -7.5,      180,      0,   ], 
    },
           {
        POSITION: [  25,     4,      1,      0,      -2.5,      180,      0.75,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.twin]),
            TYPE: exports.infernobullet,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
          COLOR: 12,
        }, }, 
    ],
};
exports.ak47turret = {
    PARENT: [exports.genericTank],
    LABEL: 'Ak-47',
  SHAPE: 213,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     1,      1,      10,     6,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.ak47]),
            TYPE: exports.bullet,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
        }, }, 
    ],
};
exports.magnumturret = {
    PARENT: [exports.genericTank],
    LABEL: 'Magnum Rifle',
  SHAPE: 220,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     1,      1,      10,     6,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.magnum_rifle]),
            TYPE: exports.bullet,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
        }, }, 
    ],
};

exports.flame = {
  PARENT: [exports.bullet],
SHAPE: [[0.03,1.01],[-0.15,0.77],[-0.44,0.85],[-1.2,1.1],[-0.2,0.39],[-0.97,0.27],[-1.44,-0.77],[-0.57,0.19],[-0.75,-0.28],[-0.32,-0.37],[0.01,-1.24],[-0.23,0.1],[0.27,-1.13],[0.45,-0.73],[0.13,-0.4],[1.47,-0.37],[0.36,0.05],[1.27,0.67],[0.49,0.59],[0.37,0.96]]};
exports.poisonBullet = {
    PARENT: [exports.bullet],
    CONTROLLERS: ['alwaysFire'],
   FACING_TYPE: 'autospin',
    POISON_TO_APPLY: 0,
  POISON: true,
  SHOW_POISON:true,
   SKILL: skillSet({ 
                rld: 1,
                dam: 1,
                pen: 1,
                spd: 1,
                str: 1,
            }),
    GUNS: [{
        POSITION: [2, 5, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.poison]),
            SHOOT_ON_DEATH: true,
            TYPE: [exports.poison, {
                MOTION_TYPE: 'poison',
                LABEL: '',
                PERSISTS_AFTER_DEATH: true,
                GO_THRU_OBSTACLES: true
            }],
            STAT_CALCULATOR: gunCalcNames.sustained
        }
    }, {
        POSITION: [2, 5, 1, 0, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.poison2]),
            SHOOT_ON_DEATH: true,
            TYPE: [exports.poison, {
                MOTION_TYPE: 'poison',
                LABEL: '',
                PERSISTS_AFTER_DEATH: true,
                GO_THRU_OBSTACLES: true
            }],
            STAT_CALCULATOR: gunCalcNames.sustained
        }
    }],
    GO_THRU_OBSTACLES: true
};
exports.flameBullet = {
    PARENT: [exports.bullet],
    CONTROLLERS: ['alwaysFire'],
   FACING_TYPE: 'autospin',
   SKILL: skillSet({ 
                rld: 1,
                dam: 1,
                pen: 1,
                spd: 1,
                str: 1,
            }),
    GUNS: [{
        POSITION: [2, 5, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.fire]),
            SHOOT_ON_DEATH: true,
            TYPE: [exports.flame, {
                MOTION_TYPE: 'flame',
                LABEL: '',
                PERSISTS_AFTER_DEATH: true,
                GO_THRU_OBSTACLES: true
            }],
            STAT_CALCULATOR: gunCalcNames.sustained
        }
    }, {
        POSITION: [2, 5, 1, 0, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.fire2]),
            SHOOT_ON_DEATH: true,
            TYPE: [exports.flame, {
                MOTION_TYPE: 'flame',
                LABEL: '',
                PERSISTS_AFTER_DEATH: true,
                GO_THRU_OBSTACLES: true
            }],
            STAT_CALCULATOR: gunCalcNames.sustained
        }
    }],
    GO_THRU_OBSTACLES: true
};
exports.smgturret = {
    PARENT: [exports.genericTank],
    LABEL: 'SMG',
   BODY: {
    FOV: 2
  },
  SHAPE: 221,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     1,      1,      10,     6,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.SMG]),
            TYPE: exports.bullet,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
        }, }, 
    ],
};
exports.gunman = {
   PARENT: [exports.genericTank],
            LABEL: 'Gunman',
  SHAPE: 214,
  BODY: {
    FOV: 2
  },
            DANGER: 6,
            FACING_TYPE: 'autospin',
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     8,      0,      0,     190, 0], 
                    TYPE: exports.magnumturret,
                        }, {
                POSITION: [  11,     8,      0,     120,    190, 0], 
                    TYPE: exports.ak47turret,
                        }, {
                POSITION: [  11,     8,      0,     240,    190, 0], 
                    TYPE: exports.smgturret,
                        },
            ],
};exports.zeppelinBullet = {
    PARENT: [exports.bullet],
    GUNS: [{
        POSITION: [2, 5, 1, 0, 0, 0, 100],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.c4, g.half_damage, g.no_speed]),
            SHOOT_ON_DEATH: true,
            TYPE: [exports.bullet, {
                MOTION_TYPE: 'rainbow',
                LABEL: 'Explosion',
                PERSISTS_AFTER_DEATH: true,
                GO_THRU_OBSTACLES: true
            }],
            STAT_CALCULATOR: gunCalcNames.sustained
        }
    }],
    GO_THRU_OBSTACLES: true
};
exports.zeppelinTurret = {
    SHAPE: 212,
    BODY: {
        FOV: 2.5
    },
    CONTROLLERS: ['onlyAcceptInArc', 'nearestDifferentMaster'],
    COLOR: 16,
    GUNS: [{
        POSITION: [1, 12, 1, 5, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.doublereload]),
            TYPE:  [exports.bullet, {
                MOTION_TYPE: 'rainbow',
               
            }],
        }
    }],
LABEL: '', 
    color: 12,
    size: 11
};
exports.giffard_missile = {
    PARENT: [exports.bullet],
    SHAPE: 224,
    LABEL: 'Missile',
    INDEPENDENT: true,
    BODY: {
        RANGE: 120,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [14, 12, 0.5, 0, 0, 180, 0, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil,

                g.morespeed, g.morespeed, g.doublereload
            ]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true,
               MOTION_TYPE: 'giffard',
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
        },
    }, ],
};
exports.nuke_missile = {
    PARENT: [exports.bullet],
    SHAPE: 205,
    LABEL: 'NUKE',
    INDEPENDENT: true,
    BODY: {
        RANGE: 240,
      HEALTH: 50,
      DAMAGE: 10,
      REGEN: 5,
    },
   CONTROLLERS: ['alwaysFire'],
   //FACING_TYPE: 'autospin',
   SKILL: skillSet({ 
                rld: 1,
                dam: 1,
                pen: 1,
                spd: 1,
                str: 1,
            }),
    GUNS: [{
        POSITION: [25, 5, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.poison]),
            SHOOT_ON_DEATH: true,
            TYPE: [exports.bullet, {
                MOTION_TYPE: 'nuke',
                LABEL: '',
                PERSISTS_AFTER_DEATH: true,
                GO_THRU_OBSTACLES: true
            }],
            STAT_CALCULATOR: gunCalcNames.sustained
        }
    }, {
        POSITION: [2, 5, 1, 0, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.poison2]),
            SHOOT_ON_DEATH: true,
            TYPE: [exports.bullet, {
                MOTION_TYPE: 'nuke',
                LABEL: '',
                PERSISTS_AFTER_DEATH: true,
                GO_THRU_OBSTACLES: true
            }],
            STAT_CALCULATOR: gunCalcNames.sustained
        }
    }, {
        POSITION: [14, 12, 0.5, 0, 0, 180, 0, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil,

                g.morespeed, g.morespeed, g.doublereload
            ]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true,
               MOTION_TYPE: 'giffard',
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
        },
    }, ],
};
exports.giffardTurret = {
    SHAPE: 212,
    BODY: {
        FOV: 2.5
    },
    CONTROLLERS: ['onlyAcceptInArc', 'nearestDifferentMaster'],
    COLOR: 16,
    GUNS: [{
        POSITION: [1, 12, 1, 5, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim]),
            TYPE:  [exports.giffard_missile, {
                MOTION_TYPE: 'giffard',
               
            }],
        }
    }],
LABEL: '', 
    color: 12,
    size: 11
};
exports.nukerTurret = {
    SHAPE: 212,
    BODY: {
        FOV: 5
    },
    CONTROLLERS: ['onlyAcceptInArc', 'nearestDifferentMaster'],
    COLOR: 16,
    GUNS: [{
        POSITION: [1, 12, 1, 5, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.nuke]),
            TYPE:  [exports.nuke_missile, {
                MOTION_TYPE: 'nukeColor',
               
            }],
        }
    }],
LABEL: '', 
    color: 12,
    size: 11
};
exports.PoisonTurret = {
    SHAPE: 212,
    BODY: {
        FOV: 2.5
    },
    CONTROLLERS: ['onlyAcceptInArc', 'nearestDifferentMaster'],
    COLOR: 16,
    GUNS: [{
        POSITION: [1, 12, 1, 5, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.poisonGun]),
            TYPE:  [exports.poisonBullet, {
                MOTION_TYPE: 'poisonColor',
               
            }],
        }
    }],
LABEL: '', 
    color: 12,
    size: 11
};
exports.FlameTurret = {
    SHAPE: 212,
    BODY: {
        FOV: 2.5
    },
    CONTROLLERS: ['onlyAcceptInArc', 'nearestDifferentMaster'],
    COLOR: 16,
    GUNS: [{
        POSITION: [1, 12, 1, 5, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.fireGun]),
            TYPE:  [exports.flameBullet, {
                MOTION_TYPE: 'flameColor',
               
            }],
        }
    }],
LABEL: '', 
    color: 12,
    size: 11
};
exports.zeppelin = {
    PARENT: [exports.genericTank],
    LABEL: 'Zeppelin',
    DANGER: 7,
    TURRETS: [{
        POSITION: [11, 0, 0, 0, 361, 1],
         TYPE: [exports.eggBossCircleProp, {COLOR: 12}]
    }, {
        POSITION: [11, 0, 0, 0, 361, 1],
        TYPE: [exports.zeppelinTurret, {}]
    }]
};
exports.giffard = {
    PARENT: [exports.genericTank],
    LABEL: 'Giffard',
    DANGER: 7,
    TURRETS: [{
        POSITION: [11, 0, 0, 0, 361, 1],
         TYPE: [exports.eggBossCircleProp, {COLOR: 0}]
    }, {
        POSITION: [11, 0, 0, 0, 361, 1],
        TYPE: [exports.giffardTurret, {}]
    }]
};
exports.nuker = {
    PARENT: [exports.genericTank],
    LABEL: 'NUKER',
    DANGER: 7,
    TURRETS: [{
        POSITION: [15, 0, 0, 0, 361, 1],
         TYPE: [exports.eggBossCircleProp, {COLOR: 50}]
    }, {
        POSITION: [15, 0, 0, 0, 361, 1],
        TYPE: [exports.nukerTurret, {}]
    }]
};
exports.poisonGun = {
    PARENT: [exports.genericTank],
    LABEL: 'Poisoner',
    DANGER: 7,
    TURRETS: [{
        POSITION: [11, 0, 0, 0, 361, 1],
         TYPE: [exports.eggBossCircleProp, {COLOR: 23}]
    }, {
        POSITION: [11, 0, 0, 0, 361, 1],
        TYPE: [exports.PoisonTurret, {COLOR: 70}]
    }]
};
exports.flameGun = {
    PARENT: [exports.genericTank],
    LABEL: 'Flamer',
    DANGER: 7,
    TURRETS: [{
        POSITION: [11, 0, 0, 0, 361, 1],
         TYPE: [exports.eggBossCircleProp, {COLOR: 70}]
    }, {
        POSITION: [11, 0, 0, 0, 361, 1],
        TYPE: [exports.FlameTurret, {COLOR: 23}]
    }]
};
        exports.testbed = {
            PARENT: [exports.genericTank],
            LABEL: 'TESTBED',
            RESET_UPGRADES: true,
            SKILL: [0, 0, 0, 0, 0, 1000, 0, 0, 0, 0,],
            
            BODY: { // def
                SHIELD: 1000,
                REGEN: 10,
                HEALTH: 100,
                DAMAGE: 10,
                DENSITY: 20,
                FOV: 2,
            },
          
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic,]),
                    TYPE: [exports.bullet, { SHAPE: 5, }],
                }, }, 
            ],
        };
 exports.arenacloser = {
            PARENT: [exports.genericTank],
            LABEL: 'Arena Closer',
          
            SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9,],
            LEVEL: -1,
            BODY: { // def
                SHIELD: 1000,
                REGEN: 1000,
                HEALTH: 1000,
                DAMAGE: 1000,
                DENSITY: 2000,
                FOV: 2,
            },
            SIZE: 25,
    VALUE: 0,
    CAN_BE_ON_LEADERBOARD: false,
    GIVE_KILL_MESSAGE: true,
    ACCEPTS_SCORE: false,
           GUNS: [{
        POSITION: [15, 10, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.ac ]),
            TYPE: exports.bullet
                
        }
    }, ]
        };
            exports.single = {
                PARENT: [exports.genericTank],
                LABEL: 'Single',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.single]),
                            TYPE: exports.bullet,
                        }, },  {
                    POSITION: [  5.5,    8,    -1.8,    6.5,     0,      0,      0,   ],                         
                    }
                ],
            };  

        let smshskl = 12; //13;
        exports.smash = {
            PARENT: [exports.genericTank],
            LABEL: 'Smasher',
            DANGER: 6,
            BODY: {
                FOV: base.FOV * 1.05,
                DENSITY: base.DENSITY * 2,
            },
            TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  21.5,   0,      0,      0,     360,  0,], 
                TYPE: exports.smasherBody,
            }],
            IS_SMASHER: true,
            SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
            STAT_NAMES: statnames.smasher,
        };
 exports.smashhiveminion = {
            PARENT: [exports.genericTank],
            LABEL: 'Smasher',
            DANGER: 6,
            BODY: {
                FOV: base.FOV * 1.05,
                DENSITY: base.DENSITY * 2,
            },
   TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
  
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: true,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: true,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster', 'mapTargetToGoal'
    ],
            TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  21.5,   0,      0,      0,     360,  0,], 
                TYPE: exports.smasherBody,
            }],
            IS_SMASHER: true,
            SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
            STAT_NAMES: statnames.smasher,
        };
exports.decoyminion = {
            PARENT: [exports.genericTank],
            LABEL: 'Decoy',
            DANGER: 6,
            BODY: {
                FOV: base.FOV * 1.05,
                DENSITY: base.DENSITY * 2,
            },
   NAME: 'Decoy',
    //DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
  
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: true,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: true,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster', 
    ],
            TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  21.5,   0,      0,      0,     360,  0,], 
                TYPE: exports.smasherBody,
            }],
   GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
        }, }, 
    ],
            
        };
exports.decoy = {
            PARENT: [exports.genericTank],
            LABEL: 'Decoy',
            DANGER: 6,
            BODY: {
                FOV: base.FOV * 1.05,
                DENSITY: base.DENSITY * 2,
            },
   //NAME: 'Decoy',
    //DAMAGE_CLASS: 0,
  
            TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  21.5,   0,      0,      0,     360,  0,], 
                TYPE: exports.smasherBody,
            }],
   GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
         POSITION: [1, 10, 1, 0, 0, 180, 0, ],
        PROPERTIES: {AUTOFIRE: true,
             SHOOT_SETTINGS: combineStats([g.basic, g.bighive]),
            TYPE: [exports.decoyminion, {
              SIZE: 100
            }],

                      MAX_CHILDREN: 2,
        },
  }, {
    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
        }, }, 
    ],
            
        };
exports.smashhive = {
PARENT: [exports.genericTank],
LABEL: 'Smash-Mind',
    GUNS: [ /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
        POSITION: [1, 10, 1, 0, 0, 180, 0, ],
        PROPERTIES: {AUTOFIRE: true,
             SHOOT_SETTINGS: combineStats([g.basic, g.smashhive]),
            TYPE: [exports.smashhiveminion, {
              SIZE: 100
            }],

                      MAX_CHILDREN: 2,
        },
  }, ],
   TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  21.5,   0,      0,      0,     360,  0,], 
                TYPE: exports.smasherBody,
            }],
   IS_SMASHER: true,
            SKILL_CAP: [smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl,],
            STAT_NAMES: statnames.smasher,
};
            exports.megasmash = {
                PARENT: [exports.genericTank],
                LABEL: 'Mega-Smasher',
                DANGER: 7,
                BODY: {
                    SPEED: base.speed * 1.05,
                    FOV: base.FOV * 1.1,
                    DENSITY: base.DENSITY * 4,
                },
                IS_SMASHER: true,
                SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
                STAT_NAMES: statnames.smasher,
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  24,     0,      0,      0,     360,  0,], 
                    TYPE: exports.megasmashBody,
                }],
            };
            exports.spike = {
                PARENT: [exports.genericTank],
                LABEL: 'Spike',
                DANGER: 7,
                BODY: {
                    SPEED: base.speed*0.9,
                    DAMAGE: base.DAMAGE * 1.1,
                    FOV: base.FOV * 1.05,
                    DENSITY: base.DENSITY * 2,
                },
                IS_SMASHER: true,
                SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
                STAT_NAMES: statnames.smasher,
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [ 20.5,    0,      0,      0,     360,  0,], 
                    TYPE: exports.spikeBody,
                    }, { 
                    POSITION: [ 20.5,    0,      0,     120,    360,  0,], 
                    TYPE: exports.spikeBody,
                    }, {
                    POSITION: [ 20.5,    0,      0,     240,    360,  0,], 
                    TYPE: exports.spikeBody,
                }],
            };     
            exports.weirdspike = {
                PARENT: [exports.genericTank],
                LABEL: 'Spike',
                DANGER: 7,
                BODY: {
                    DAMAGE: base.DAMAGE * 1.15,
                    FOV: base.FOV * 1.05,
                    DENSITY: base.DENSITY * 1.5,
                },
                IS_SMASHER: true,
                SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
                STAT_NAMES: statnames.smasher,
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [ 20.5,    0,      0,      0,     360,  0,], 
                    TYPE: exports.spikeBody1,
                    }, { 
                    POSITION: [ 20.5,    0,      0,     180,    360,  0,], 
                    TYPE: exports.spikeBody2,
                }],
            };       
            exports.autosmash = makeAuto(exports.smash, 'Auto-Smasher', { type: exports.autoSmasherTurret, size: 11, });
            exports.autosmash.SKILL_CAP = [smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl,];

    exports.twin = {
        PARENT: [exports.genericTank],
        LABEL: 'Twin',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, 
        ],
    };
exports.pelter = {
   PARENT: [exports.genericTank],
    LABEL: 'Pelter',
    DANGER: 7,
  GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [19, 2, 1, 0, -2.5, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil,

                g.lotsmorrecoil
            ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [19, 2, 1, 0, 2.5, 0, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil,

                g.lotsmorrecoil
            ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [12, 11, 1, 0, 0, 0, 0, ],
    },
         ],
};
exports.tripelter = {
   PARENT: [exports.genericTank],
    LABEL: 'Flank Pelter',
    DANGER: 7,
  GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [19, 2, 1, 0, -2.5, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil,

                g.lotsmorrecoil
            ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [19, 2, 1, 0, 2.5, 0, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil,

                g.lotsmorrecoil
            ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [12, 11, 1, 0, 0, 0, 0, ],
    }, {
       POSITION: [19, 2, 1, 0, -2.5, 120, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil,

                g.lotsmorrecoil
            ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [19, 2, 1, 0, 2.5, 120, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil,

                g.lotsmorrecoil
            ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [12, 11, 1, 0, 0, 120, 0, ],
    }, {
       POSITION: [19, 2, 1, 0, -2.5, 240, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil,

                g.lotsmorrecoil
            ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [19, 2, 1, 0, 2.5, 240, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil,

                g.lotsmorrecoil
            ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [12, 11, 1, 0, 0, 240, 0, ],
    },
         ],
};exports.hexapelter = {
   PARENT: [exports.genericTank],
    LABEL: 'Hexa-Pelter',
    DANGER: 7,
  GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [19, 2, 1, 0, -2.5, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil,

                g.lotsmorrecoil
            ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [19, 2, 1, 0, 2.5, 0, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil,

                g.lotsmorrecoil
            ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [12, 11, 1, 0, 0, 0, 0, ],
    }, {
       POSITION: [19, 2, 1, 0, -2.5, 120, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil,

                g.lotsmorrecoil
            ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [19, 2, 1, 0, 2.5, 120, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil,

                g.lotsmorrecoil
            ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [12, 11, 1, 0, 0, 120, 0, ],
    }, {
       POSITION: [19, 2, 1, 0, -2.5, 240, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil,

                g.lotsmorrecoil
            ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [19, 2, 1, 0, 2.5, 240, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil,

                g.lotsmorrecoil
            ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [12, 11, 1, 0, 0, 240, 0, ],
    }, {
       POSITION: [19, 2, 1, 0, -2.5, 180, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil,

                g.lotsmorrecoil
            ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [19, 2, 1, 0, 2.5, 180, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil,

                g.lotsmorrecoil
            ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [12, 11, 1, 0, 0, 180, 0, ],
    }, {
       POSITION: [19, 2, 1, 0, -2.5, 60, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil,

                g.lotsmorrecoil
            ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [19, 2, 1, 0, 2.5, 60, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil,

                g.lotsmorrecoil
            ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [12, 11, 1, 0, 0, 60, 0, ],
    }, {
       POSITION: [19, 2, 1, 0, -2.5, -60, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil,

                g.lotsmorrecoil
            ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [19, 2, 1, 0, 2.5, -60, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil,

                g.lotsmorrecoil
            ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [12, 11, 1, 0, 0, -60, 0, ],
    },
         ],
};
exports.peltertrapper = {
   PARENT: [exports.genericTank],
    LABEL: 'Trap Pelter',
    DANGER: 7,
  GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
         POSITION: [  19,     2,      1,      0,      -2.5,      0,      0,   ],
                }, {
            POSITION: [   2,     3,     1.7,    19,      -2.5,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
            }, }, {
              POSITION: [  19,     2,      1,      0,      2.5,      0,      0,   ],
                }, {
            POSITION: [   2,     3,     1.7,    19,      2.5,      0,      0.5,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
            }, }, {
        POSITION: [12, 11, 1, 0, 0, 0, 0, ],
    },
         ],
};
exports.puntgun = {
   PARENT: [exports.genericTank],
    LABEL: 'Punt Gun',
    DANGER: 7,
  GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [24, 2, 1, 0, -2.5, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil,

                g.lotsmorrecoil
            ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [24, 2, 1, 0, 2.5, 0, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil,

                g.lotsmorrecoil
            ]),
            TYPE: exports.bullet,
        },
    }, {
       POSITION: [20, 2, 1, 0, -2.5, 0, 0.1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, 
            ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [20, 2, 1, 0, 2.5, 0, 0.6, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, 
            ]),
            TYPE: exports.bullet,
        },
    }, {
      POSITION: [16, 2, 1, 0, -2.5, 0, 0.2, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, 
            ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [16, 2, 1, 0, 2.5, 0, 0.7, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, 
            ]),
            TYPE: exports.bullet,
        },
    },  {
        POSITION: [12, 20, 0.5, 0, 0, 0, 0, ],
    },
         ],
};
exports.tripuntgun = {
   PARENT: [exports.genericTank],
    LABEL: 'Flank Punt Gun',
    DANGER: 7,
 GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [24, 2, 1, 0, -2.5, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil,

                g.lotsmorrecoil
            ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [24, 2, 1, 0, 2.5, 0, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil,

                g.lotsmorrecoil
            ]),
            TYPE: exports.bullet,
        },
    }, {
       POSITION: [20, 2, 1, 0, -2.5, 0, 0.1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, 
            ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [20, 2, 1, 0, 2.5, 0, 0.6, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, 
            ]),
            TYPE: exports.bullet,
        },
    }, {
      POSITION: [16, 2, 1, 0, -2.5, 0, 0.2, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, 
            ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [16, 2, 1, 0, 2.5, 0, 0.7, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, 
            ]),
            TYPE: exports.bullet,
        },
    },  {
        POSITION: [12, 20, 0.5, 0, 0, 0, 0, ],
    }, {
       POSITION: [24, 2, 1, 0, -2.5, 120, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil,

                g.lotsmorrecoil
            ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [24, 2, 1, 0, 2.5, 120, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil,

                g.lotsmorrecoil
            ]),
            TYPE: exports.bullet,
        },
    }, {
       POSITION: [20, 2, 1, 0, -2.5, 120, 0.1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, 
            ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [20, 2, 1, 0, 2.5, 120, 0.6, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, 
            ]),
            TYPE: exports.bullet,
        },
    }, {
      POSITION: [16, 2, 1, 0, -2.5, 120, 0.2, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, 
            ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [16, 2, 1, 0, 2.5, 120, 0.7, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, 
            ]),
            TYPE: exports.bullet,
        },
    },  {
        POSITION: [12, 20, 0.5, 0, 0, 120, 0, ],
    }, {
       POSITION: [24, 2, 1, 0, -2.5, 240, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil,

                g.lotsmorrecoil
            ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [24, 2, 1, 0, 2.5, 240, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil,

                g.lotsmorrecoil
            ]),
            TYPE: exports.bullet,
        },
    }, {
       POSITION: [20, 2, 1, 0, -2.5, 240, 0.1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, 
            ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [20, 2, 1, 0, 2.5, 240, 0.6, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, 
            ]),
            TYPE: exports.bullet,
        },
    }, {
      POSITION: [16, 2, 1, 0, -2.5, 240, 0.2, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, 
            ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [16, 2, 1, 0, 2.5, 240, 0.7, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, 
            ]),
            TYPE: exports.bullet,
        },
    },  {
        POSITION: [12, 20, 0.5, 0, 0, 240, 0, ],
    },
         ],
};
exports.trianglepuntgun = {
   PARENT: [exports.genericTank],
    LABEL: 'Boosting Punt Gun',
    DANGER: 7,
 GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [24, 2, 1, 0, -2.5, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, 
            ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [24, 2, 1, 0, 2.5, 0, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, 
            ]),
            TYPE: exports.bullet,
        },
    }, {
       POSITION: [20, 2, 1, 0, -2.5, 0, 0.1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, 
            ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [20, 2, 1, 0, 2.5, 0, 0.6, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, 
            ]),
            TYPE: exports.bullet,
        },
    }, {
      POSITION: [16, 2, 1, 0, -2.5, 0, 0.2, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, 
            ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [16, 2, 1, 0, 2.5, 0, 0.7, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, 
            ]),
            TYPE: exports.bullet,
        },
    },  {
        POSITION: [12, 20, 0.5, 0, 0, 0, 0, ],
    }, {
       POSITION: [24, 2, 1, 0, -2.5, 150, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil,

                g.lotsmorrecoil
            ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [24, 2, 1, 0, 2.5, 150, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil,

                g.lotsmorrecoil
            ]),
            TYPE: exports.bullet,
        },
    }, {
       POSITION: [20, 2, 1, 0, -2.5, 150, 0.1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil,

                g.lotsmorrecoil
            ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [20, 2, 1, 0, 2.5, 150, 0.6, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil,

                g.lotsmorrecoil
            ]),
            TYPE: exports.bullet,
        },
    }, {
      POSITION: [16, 2, 1, 0, -2.5, 150, 0.2, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil,

                g.lotsmorrecoil
            ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [16, 2, 1, 0, 2.5, 150, 0.7, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil,

                g.lotsmorrecoil
            ]),
            TYPE: exports.bullet,
        },
    },  {
        POSITION: [12, 20, 0.5, 0, 0, 150, 0, ],
    }, {
       POSITION: [24, 2, 1, 0, -2.5, 210, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil,

                g.lotsmorrecoil
            ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [24, 2, 1, 0, 2.5, 210, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil,

                g.lotsmorrecoil
            ]),
            TYPE: exports.bullet,
        },
    }, {
       POSITION: [20, 2, 1, 0, -2.5, 210, 0.1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil,

                g.lotsmorrecoil
            ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [20, 2, 1, 0, 2.5, 210, 0.6, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil,

                g.lotsmorrecoil
            ]),
            TYPE: exports.bullet,
        },
    }, {
      POSITION: [16, 2, 1, 0, -2.5, 210, 0.2, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil,

                g.lotsmorrecoil
            ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [16, 2, 1, 0, 2.5, 210, 0.7, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil,

                g.lotsmorrecoil
            ]),
            TYPE: exports.bullet,
        },
    },  {
        POSITION: [12, 20, 0.5, 0, 0, 210, 0, ],
    },
         ],
};
exports.punter = {
   PARENT: [exports.genericTank],
    LABEL: 'Punter',
    DANGER: 7,
  GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [24, 2, 1, 0, -2.5, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil,

                g.lotsmorrecoil
            ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [24, 2, 1, 0, 2.5, 0, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil,

                g.lotsmorrecoil
            ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [27, 2, 1, 0, 0, 0, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil,

                g.lotsmorrecoil
            ]),
            TYPE: exports.bullet,
        },
    }, {
       POSITION: [20, 2, 1, 0, -2.5, 0, 0.1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, 
            ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [20, 2, 1, 0, 2.5, 0, 0.6, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, 
            ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [23, 2, 1, 0, 0, 0, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, 
            ]),
            TYPE: exports.bullet,
        },
    }, {
      POSITION: [16, 2, 1, 0, -2.5, 0, 0.2, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, 
            ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [16, 2, 1, 0, 2.5, 0, 0.7, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, 
            ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [19, 2, 1, 0, 0, 0, 0.9, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, 
            ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [12, 20, 0.5, 0, 0, 0, 0, ],
    },
         ],
};
        exports.gunner = {
            PARENT: [exports.genericTank],
            LABEL: 'Gunner',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  12,    3.5,     1,      0,     7.25,    0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  12,    3.5,     1,      0,    -7.25,    0,     0.75, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,     3.75,    0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,    -3.75,    0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, 
            ],
        };
            exports.machinegunner = {
                PARENT: [exports.genericTank],
                LABEL: 'Machine Gunner',
                DANGER: 6,
                BODY: {
                    SPEED: base.SPEED * 0.9,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,     3,     4.0,    -3,      5,      0,     0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,    -3,     -5,      0,     0.8,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,     0,     2.5,     0,     0.4,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,     0,    -2.5,     0,     0.2,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  14,     3,     4.0,     3,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, 
                ]
            };
            exports.autogunner = makeAuto(exports.gunner);        
exports.opgunner = makeOP(exports.gunner);    
            exports.nailgun = {
                PARENT: [exports.genericTank],
                LABEL: 'Nailgun',
                DANGER: 7,
                BODY: {
                    FOV: base.FOV * 1.1,
                    SPEED: base.SPEED * 0.9,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     2,      1,      0,    -2.5,     0,     0.25, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     2,      1,      0,     2.5,     0,     0.75, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     2,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  5.5,    8,    -1.8,    6.5,     0,      0,      0,   ],
                        },
                ],
            };

        exports.double = {
            PARENT: [exports.genericTank],
            LABEL: 'Double Twin',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  20,     8,      1,      0,     5.5,    180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  20,     8,      1,      0,    -5.5,    180,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, 
            ],
        };
            exports.tripletwin = {
                PARENT: [exports.genericTank],
                LABEL: 'Triple Twin',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,    120,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,    120,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,    240,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,    240,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };
            exports.autodouble = makeAuto(exports.double, 'Auto-Double');
            exports.split = {
                PARENT: [exports.genericTank],
                LABEL: 'Hewn Double',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,     5.5,     25,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,    -5.5,    -25,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,    180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,    180,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };

        exports.bent = {
            PARENT: [exports.genericTank],
            LABEL: 'Triple Shot',
            DANGER: 6,
            BODY: {
                SPEED: base.SPEED * 0.9,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  19,     8,      1,      0,     -2,    -20,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  19,     8,      1,      0,      2,     20,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  22,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
            exports.bentdouble = {
                PARENT: [exports.genericTank],
                LABEL: 'Bent Double',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,     -1,     -25,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,      1,      25,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  22,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,     -1,     155,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,      1,    -155,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  22,     8,      1,      0,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.penta = {
                PARENT: [exports.genericTank],
                LABEL: 'Penta Shot',
                DANGER: 7,
                BODY: {
                    SPEED: base.SPEED * 0.85,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  16,     8,      1,      0,     -3,    -30,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  16,     8,      1,      0,      3,     30,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,     -2,    -15,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,      2,     15,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  22,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.benthybrid = makeHybrid(exports.bent, 'Bent Hybrid');

        exports.triple = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                FOV: base.FOV * 1.05,
            },
            LABEL: 'Triplet',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,      1,      0,      5,      0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  18,    10,      1,      0,     -5,      0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  21,    10,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
                        TYPE: exports.bullet,
                    }, }, 
            ],
        };
            exports.quint = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                BODY: {
                    FOV: base.FOV * 1.1,
                },
                LABEL: 'Quintuplet',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  16,    10,      1,      0,     -5,      0,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  16,    10,      1,      0,      5,      0,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  19,    10,      1,      0,     -3,      0,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  19,    10,      1,      0,      3,      0,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  22,    10,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };        
            exports.dual = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                BODY: {
                    ACCEL: base.ACCEL * 0.8,
                    FOV: base.FOV * 1.1,
                },
                LABEL: '',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     7,      1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual, g.lowpower]),
                            TYPE: exports.bullet,
                            LABEL: 'Small',
                        }, }, { 
                    POSITION: [  18,     7,      1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual, g.lowpower]),
                            TYPE: exports.bullet,
                            LABEL: 'Small',
                        }, }, { 
                    POSITION: [  16,    8.5,     1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  16,    8.5,     1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };

    exports.sniper = {
        PARENT: [exports.genericTank],
        LABEL: 'Sniper',
        BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    8.5,     1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                TYPE: exports.bullet,
            }, },
        ],
    };
            exports.rifle = {
                PARENT: [exports.genericTank],
                LABEL: 'Rifle',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7, 
                    FOV: base.FOV * 1.225,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */                       
                    POSITION: [  20,    10.5,    1,      0,      0,      0,      0,   ], 
                        }, {
                    POSITION: [  24,     7,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
 exports.musket = {
                    PARENT: [exports.genericTank],
                    LABEL: 'Musket',
                    BODY: {
                        ACCELERATION: base.ACCEL * 0.7,
                        FOV: base.FOV * 1.2,
                    },
                    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                        POSITION: [ 15.5,  19.5,     1,      0,      0,      0,      0,   ],
                            }, {
                        POSITION: [  18,     7,     1,       0,      4.15,     0,      0,   ],
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.twin, g.rifle, g.bitweak]),
                                TYPE: exports.bullet,
                            }, }, {
                        POSITION: [  18,     7,     1,       0,     -4.15,     0,     0.5,  ],
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.basic, g.sniper,g.twin,  g.rifle, g.bitweak]),
                                TYPE: exports.bullet,
                            }, },
                    ],
                };
        exports.assassin = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Assassin',
            BODY: {
                ACCELERATION: base.ACCEL * 0.6,
                SPEED: base.SPEED * 0.85,
                FOV: base.FOV * 1.4,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  27,    8.5,     1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [   5,    8.5,    -1.6,    8,      0,      0,      0,   ], 
                },
            ],
        };
            exports.ranger = {
                PARENT: [exports.genericTank],
                LABEL: 'Ranger',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.5,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.5,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  32,    8.5,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [   5,    8.5,    -1.6,    8,      0,      0,      0,   ], 
                    },
                ],
            };
            exports.autoass = makeAuto(exports.assassin, "");

        exports.hunter = {
            PARENT: [exports.genericTank],
            LABEL: 'Hunter',
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.7,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.25,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  24,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  21,    12,      1,      0,      0,      0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
            exports.preda = {
                PARENT: [exports.genericTank],
                LABEL: 'Predator',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                    SPEED: base.SPEED * 0.85,
                    FOV: base.FOV * 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  24,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.hunter2, g.preda]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  21,    12,      1,      0,      0,      0,     0.15, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.preda]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  18,    16,      1,      0,      0,      0,     0.3,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
exports.spreda = {
    PARENT: [exports.genericTank],
    LABEL: 'S-Predator',
    DANGER: 7,
    BODY: {
        ACCELERATION: base.ACCEL * 0.7,
        SPEED: base.SPEED * 0.85,
        FOV: base.FOV * 1.3,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [30, 8, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.hunter, g.hunter2, g.hunter2, g.preda]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [27, 12, 1, 0, 0, 0, 0.15, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.hunter, g.hunter2, g.preda]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [24, 16, 1, 0, 0, 0, 0.3, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.hunter, g.preda]),
            TYPE: exports.bullet,
        },
    },  {
                    POSITION: [  10,    15,    -1.2,    6.5,     0,      0,      0,   ],                         
                    }],
};
exports.xpreda = {
    PARENT: [exports.genericTank],
    LABEL: 'X-Predator',
    DANGER: 7,
    BODY: {
        ACCELERATION: base.ACCEL * 0.9,
        SPEED: base.SPEED * 0.85,
        FOV: base.FOV * 1.5,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      
      POSITION: [24, 8, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.hunter2, g.preda]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [21, 12, 1, 0, 0, 0, 0.15, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.preda]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [18, 16, 1, 0, 0, 0, 0.3, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
            TYPE: exports.bullet,
        },
    }, {
       POSITION: [15, 20, 1, 0, 0, 0, 0.45, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter,  g.preda, g.anni]),
            TYPE: exports.bullet,
        },
    }, ],
};
            exports.poach = makeHybrid(exports.hunter, 'Poacher');
            exports.sidewind = {
                PARENT: [exports.genericTank],
                LABEL: 'Sidewinder',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  10,    11,    -0.5,    14,      0,      0,      0,  ], 
                        }, {
                    POSITION: [  21,    12,    -1.1,     0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.sidewind]),
                            TYPE: exports.snake,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, },
                ],
            };

    exports.director = {
        PARENT: [exports.genericTank],
        LABEL: 'Director',  
        STAT_NAMES: statnames.drone,
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.75,
            FOV: base.FOV * 1.1,
        },
        MAX_CHILDREN: 5,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                    TYPE: exports.drone,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, },
        ],
    };
            exports.master = {
                PARENT: [exports.genericTank],
                LABEL: '',  
                STAT_NAMES: statnames.drone,
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    FOV: base.FOV * 1.15,
                },
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  16,     1,      0,      0,      0, 0], 
                        TYPE: exports.masterGun,
                            }, {
                    POSITION: [  16,     1,      0,     120,     0, 0], 
                        TYPE: [exports.masterGun, { INDEPENDENT: true, }],
                            }, {
                    POSITION: [  16,     1,      0,     240,     0, 0], 
                        TYPE: [exports.masterGun, { INDEPENDENT: true, }],
                            },
                ],
            };

        exports.overseer = {
            PARENT: [exports.genericTank],
            LABEL: 'Overseer',  
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.1,
            },
            MAX_CHILDREN: 8,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   6,     12,    1.2,     8,      0,     90,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, }, {
                POSITION: [   6,     12,    1.2,     8,      0,    270,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, },
            ],
        };
            exports.overlord = {
                PARENT: [exports.genericTank],
                LABEL: 'Overlord',
                DANGER: 7,
                STAT_NAMES: statnames.drone,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.1,
                },
                MAX_CHILDREN: 8,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     12,    1.2,     8,      0,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                        }, }, {
                    POSITION: [   6,     12,    1.2,     8,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, {
                    POSITION: [   6,     12,    1.2,     8,      0,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, { 
                    POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, },
                ],
            };
            exports.overtrap = {
                PARENT: [exports.genericTank],
                LABEL: 'Overtrapper',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.6,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     11,    1.2,     8,      0,     125,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,  
                            MAX_CHILDREN: 3,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     235,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 3,   
                        }, }, {
                    POSITION: [  14,     8,      1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [   4,     8,     1.5,    14,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
            exports.banshee = {
                PARENT: [exports.genericTank],
                LABEL: '',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.5,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.1,
                },
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  10,     8,      0,      0,      80, 0], 
                        TYPE: exports.bansheegun,
                            }, {
                    POSITION: [  10,     8,      0,     120,     80, 0], 
                        TYPE: exports.bansheegun,
                            }, {
                    POSITION: [  10,     8,      0,     240,     80, 0], 
                        TYPE: exports.bansheegun,
                            },
                ],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     11,    1.2,     8,      0,      60,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,  
                            MAX_CHILDREN: 2,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 2,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     300,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 2,   
                        }, }, 
                    ]
            };
            exports.autoover = makeAuto(exports.overseer, "");
            exports.overgunner = {
                PARENT: [exports.genericTank],
                LABEL: 'Overgunner',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.SPEED * 0.9,
                    FOV: base.FOV * 1.1,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     11,    1.2,     8,      0,     125,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,  
                            MAX_CHILDREN: 3,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     235,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 3,   
                        }, }, {
                    POSITION: [  19,     2,      1,      0,    -2.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.slow, g.flank, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     2,      1,      0,     2.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.slow, g.flank, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  12,    11,      1,      0,      0,      0,      0,   ],
                        },
                ],
            };
        
        function makeSwarmSpawner(guntype) {
            return {
                PARENT: [exports.genericTank],
                LABEL: '',
                BODY: {
                    FOV: 2,
                },
                CONTROLLERS: ['nearestDifferentMaster'], 
                COLOR: 16,
                AI: {
                    NO_LEAD: true,
                    SKYNET: true,
                    FULL_VIEW: true,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,     15,    0.6,    14,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: guntype,
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,          
                        }, }
                ],
            };
        }
        exports.cruiserGun = makeSwarmSpawner(combineStats([g.swarm]));
        exports.cruiser = {
            PARENT: [exports.genericTank],
            LABEL: 'Cruiser',
            DANGER: 6,
            FACING_TYPE: 'locksFacing',
            STAT_NAMES: statnames.swarm,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
                FOV: base.FOV * 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   7,    7.5,    0.6,     7,      4,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     7,     -4,      0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, },
            ],
        };
            exports.battleship = {
                PARENT: [exports.genericTank],
                LABEL: 'Battleship',
                DANGER: 7,
                STAT_NAMES: statnames.swarm,
                FACING_TYPE: 'locksFacing',
                BODY: {
                    ACCELERATION: base.ACCEL,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   7,    7.5,    0.6,     7,      4,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Guided'                
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,     -4,     90,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Autonomous',        
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      4,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Autonomous',         
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,     -4,     270,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Guided'                
                        }, },
                ],
            };
            exports.carrier = {
                PARENT: [exports.genericTank],
                LABEL: 'Carrier',
                DANGER: 7,
                STAT_NAMES: statnames.swarm,
                FACING_TYPE: 'locksFacing',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    FOV: base.FOV * 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   7,    7.5,    0.6,     7,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,          
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      2,      40,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,    
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,     -2,     -40,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,    
                        }, }
                ],
            };
            exports.autocruiser = makeAuto(exports.cruiser, "");
            exports.fortress = {
                PARENT: [exports.genericTank],
                LABEL: 'Fortress', //'Palisade',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   7,    7.5,    0.6,     7,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.swarm, { CONTROLLERS: ['canRepel'] }],
                            STAT_CALCULATOR: gunCalcNames.swarm,   
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      0,     120,    1/3,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.swarm, { CONTROLLERS: ['canRepel'] }],
                            STAT_CALCULATOR: gunCalcNames.swarm,   
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      0,     240,    2/3,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.swarm, { CONTROLLERS: ['canRepel'] }],
                            STAT_CALCULATOR: gunCalcNames.swarm,   
                        }, }, {
                    POSITION: [  14,     9,      1,      0,      0,     60,      0,   ],
                        }, {
                    POSITION: [   4,     9,     1.5,    14,      0,     60,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {                            
                    POSITION: [  14,     9,      1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   4,     9,     1.5,    14,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {                            
                    POSITION: [  14,     9,      1,      0,      0,     300,     0,   ],
                        }, {
                    POSITION: [   4,     9,     1.5,    14,      0,     300,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };

        exports.underseer = {
            PARENT: [exports.genericTank],
            LABEL: 'Underseer',
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                ACCELERATION: base.ACCEL * 0.7,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.1,
            },
            SHAPE: 4,
            MAX_CHILDREN: 14,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   5,     12,    1.2,     8,      0,     90,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                        TYPE: exports.sunchip,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.necro,
                    }, }, {
                POSITION: [   5,     12,    1.2,     8,      0,     270,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                        TYPE: exports.sunchip,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.necro,
                    }, },
                ],
        };
            exports.necromancer = {
                PARENT: [exports.genericTank],
                LABEL: 'Necromancer',
                DANGER: 7,
                STAT_NAMES: statnames.necro,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                SHAPE: 4,
                FACING_TYPE: 'autospin',
                MAX_CHILDREN: 14,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,     12,    1.2,     8,      0,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                            TYPE: exports.sunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,     270,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                            TYPE: exports.sunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,      0,     0.25, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.weak, g.doublereload]),
                            TYPE: exports.autosunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            MAX_CHILDREN: 4,
                            STAT_CALCULATOR: gunCalcNames.necro,
                            LABEL: 'Guard',
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,     180,    0.75  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.weak, g.doublereload]),
                            TYPE: exports.autosunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            MAX_CHILDREN: 4,
                            STAT_CALCULATOR: gunCalcNames.necro,
                            LABEL: 'Guard', 
                        }, },
                    ],
            };
 exports.necromonster = {
                PARENT: [exports.genericTank],
                LABEL: 'NecroMonster',
                DANGER: 7,
                STAT_NAMES: statnames.necro,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.9,
                    SPEED: base.SPEED * 0.9,
                    FOV: base.FOV * 1.2,
                },
                SHAPE: 4,
                FACING_TYPE: 'autospin',
                
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,     12,    1.2,     8,      0,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.sunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                           MAX_CHILDREN: 5,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,     270,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.sunchip,
                            AUTOFIRE: true,
                           MAX_CHILDREN: 5,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,      0,     0.25, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.autosunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            MAX_CHILDREN: 5,
                            STAT_CALCULATOR: gunCalcNames.necro,
                            LABEL: 'Guard',
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,     180,    0.75  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.autosunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            MAX_CHILDREN: 5,
                            STAT_CALCULATOR: gunCalcNames.necro,
                            LABEL: 'Guard', 
                        }, },
                    ],
   TURRETS: [{
        POSITION: [8, 6.5, 0, 0, 90, 1],
        TYPE: exports.sniper3gun
    }, {
        POSITION: [8, 6.5, 0, 180, 90, 1],
        TYPE: exports.sniper3gun
    }, {
       POSITION: [8, 6.5, 0, 90, 90, 1],
        TYPE: exports.sniper3gun
    }, {
        POSITION: [8, 6.5, 0, -90, 90, 1],
        TYPE: exports.sniper3gun
    }]
            };
        exports.lilfact = {
            PARENT: [exports.genericTank],
            LABEL: '',
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                SPEED: base.SPEED * 0.8,
                ACCELERATION: base.ACCEL * 0.5,
                FOV: 1.1,
            },
            GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  4.5,    10,      1,     10.5,    0,      0,      0,   ], 
                }, {
                POSITION: [   1,     12,      1,      15,     0,      0,      0,   ], 
                PROPERTIES: {          
                    MAX_CHILDREN: 4,
                    SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
                    TYPE: exports.minion,
                    STAT_CALCULATOR: gunCalcNames.drone,                        
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,  
                }, }, {                        
                    POSITION: [  3.5,    12,      1,      8,      0,      0,      0,   ], 
                }
            ],
        };
  
            exports.factory = {
                PARENT: [exports.genericTank],
                LABEL: 'Factory',
                DANGER: 7,
                STAT_NAMES: statnames.drone,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: 1.1,
                },
                MAX_CHILDREN: 6,
                GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,     11,      1,      10.5,   0,      0,      0,   ], 
                        }, {
                    POSITION: [   2,     14,      1,      15.5,   0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.factory]),
                            TYPE: exports.minion,
                            STAT_CALCULATOR: gunCalcNames.drone,                        
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,   
                        }, }, {                        
                    POSITION: [   4,     14,      1,      8,      0,      0,      0,   ], 
                    }
                ],
            };

    exports.machine = {
        PARENT: [exports.genericTank],
        LABEL: 'Machine Gun',
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    12,     10,     1.4,     8,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
            }, },
        ],
    };
            exports.spray = {
                PARENT: [exports.genericTank],
                LABEL: 'Sprayer',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  23,     7,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.lowpower, g.mach, g.morerecoil]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  12,    10,     1.4,     8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                        TYPE: exports.bullet,
                    }, },
                ],
            };
   
        exports.mini = {
            PARENT: [exports.genericTank],
            LABEL: 'Minigun',
            DANGER: 6,
            BODY: {
                FOV: 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  22,     8,      1,      0,      0,      0,      0, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  20,     8,      1,      0,      0,      0,    0.333, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  18,     8,      1,      0,      0,      0,    0.667, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
exports.uzi = {
            PARENT: [exports.genericTank],
            LABEL: 'Uzi',
            DANGER: 6,
            BODY: {
                FOV: 1.1,
            },
            GUNS: [  { 
                POSITION: [  20,     8,      1,      0,      0,      0,    0, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.uzi]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  18,     8,      1,      0,      0,      0,    0.5, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.uzi]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
            exports.stream = {
                PARENT: [exports.genericTank],
                LABEL: 'Streamliner',
                DANGER: 7,
                BODY: {
                    FOV: 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  25,     8,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  23,     8,      1,      0,      0,      0,     0.2, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  21,     8,      1,      0,      0,      0,     0.4, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  19,     8,      1,      0,      0,      0,     0.6, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  17,     8,      1,      0,      0,      0,     0.8, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
exports.tastetherainbow = {
    PARENT: [exports.genericTank],
    LABEL: 'Taste The Rainbow',
    DANGER: 7,
    BODY: {
        FOV: 1.3,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [25, 8, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
            TYPE: [exports.bullet, {MOTION_TYPE:'red'} ],
        },
    }, {
        POSITION: [23, 8, 1, 0, 0, 0, 0.2, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
           TYPE: [exports.bullet, {MOTION_TYPE:'orange'} ],
        },
    }, {
        POSITION: [21, 8, 1, 0, 0, 0, 0.4, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
            TYPE: [exports.bullet, {MOTION_TYPE:'yellow'} ],
        },
    }, {
        POSITION: [19, 8, 1, 0, 0, 0, 0.6, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
           TYPE: [exports.bullet, {MOTION_TYPE:'green'} ],
        },
    }, {
        POSITION: [17, 8, 1, 0, 0, 0, 0.8, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
            TYPE: [exports.bullet, {MOTION_TYPE:'blue'} ],
        },
    }, {
        POSITION: [15, 8, 1, 0, 0, 0, 1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
            TYPE: [exports.bullet, {MOTION_TYPE:'purple'} ],
        },
    },],
};
            exports.hybridmini = makeHybrid(exports.mini, "");
            exports.minitrap = {
                PARENT: [exports.genericTank],
                DANGER: 6,
                LABEL: 'Barricade',
                STAT_NAMES: statnames.trap,
                BODY: {
                    FOV: 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [  24,     8,      1,      0,      0,      0,      0, ], 
                            }, {
                    POSITION: [   4,     8,     1.3,     22,     0,      0,      0, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.barricade, g.halfrange]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, { 
                    POSITION: [   4,     8,     1.3,     18,     0,      0,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.barricade, g.halfrange]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, { 
                    POSITION: [   4,     8,     1.3,     14,     0,      0,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.barricade, g.halfrange]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
exports.trapliner = {
                PARENT: [exports.genericTank],
                DANGER: 6,
                LABEL: 'Trapliner',
                STAT_NAMES: statnames.trap,
                BODY: {
                    FOV: 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [  24,     8,      1,      0,      0,      0,      0, ], 
                            }, {
                    POSITION: [   4,     8,     1.3,     30,     0,      0,      0, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.barricade, g.halfrange]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, { 
                    POSITION: [   4,     8,     1.3,     26,     0,      0,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.barricade, g.halfrange]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, { 
                    POSITION: [   4,     8,     1.3,     22,     0,      0,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.barricade, g.halfrange]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, { 
                    POSITION: [   4,     8,     1.3,     18,     0,      0,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.barricade, g.halfrange]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, { 
                    POSITION: [   4,     8,     1.3,     14,     0,      0,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.barricade, g.halfrange]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
     exports.blockade = {
                PARENT: [exports.genericTank],
                DANGER: 6,
                LABEL: 'Blockade',
                STAT_NAMES: statnames.trap,
                BODY: {
                    FOV: 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [  24,     8,      1,      0,      0,      0,      0, ], 
                            }, {
                    POSITION: [   4,     8,     1.3,     22,     0,      0,      0, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.barricade, g.halfrange]),
                            TYPE: exports.block, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, { 
                    POSITION: [   4,     8,     1.3,     18,     0,      0,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.barricade, g.halfrange]),
                            TYPE: exports.block, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, { 
                    POSITION: [   4,     8,     1.3,     14,     0,      0,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.barricade, g.halfrange]),
                            TYPE: exports.block, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            }; exports.elitetrapturret = {
                PARENT: [exports.genericTank],
                DANGER: 6,
                LABEL: 'Blockade',
                STAT_NAMES: statnames.trap,
                BODY: {
                    FOV: 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [  24,     8,      1,      0,      0,      0,      0, ], 
                            }, {
                    POSITION: [   4,     8,     1.3,     22,     0,      0,      0, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.elitetrapper, g.halfrange]),
                            TYPE: exports.block, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, { 
                    POSITION: [   4,     8,     1.3,     18,     0,      0,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.elitetrapper, g.halfrange]),
                            TYPE: exports.block, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, { 
                    POSITION: [   4,     8,     1.3,     14,     0,      0,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.elitetrapper, g.halfrange]),
                            TYPE: exports.block, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
    exports.pound = {
        PARENT: [exports.genericTank],
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.8,
        },
        LABEL: 'Pounder',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,    12,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                TYPE: exports.bullet,
            }, },
        ],
    };
        exports.destroy = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
            },
            LABEL: 'Destroyer',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  21,    14,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
                    TYPE: exports.bullet,
                }, },
            ],
        };
            exports.anni = {
                PARENT: [exports.genericTank],
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                },
                LABEL: 'Annihilator',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [ 20.5,  19.5,     1,      0,      0,      0,      0,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni]),
                        TYPE: exports.bullet,
                    }, },
                ],
            };
 exports.annibrid = makeHybrid(exports.anni, 'Annibrid');
 exports.congruator = {
                PARENT: [exports.genericTank],
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                },
                LABEL: 'Congruator',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                                          POSITION: [  25,    14,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.sniper, g.assass, g.mach]),
                    TYPE: exports.bullet,
                    ALT_FIRE: true,
                }, }, {
                   POSITION: [ 20.5,  19.5,     1,      0,      0,      0,      0,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni]),
                        TYPE: exports.bullet,
                    }, },
                ],
            };
            exports.hiveshooter = {
                PARENT: [exports.genericTank],
                DANGER: 6,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.speed * 0.8,
                },
                LABEL: '',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,    14,     -1.2,    5,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.hive]),
                            TYPE: exports.hive,
                        }, }, {
                    POSITION: [  15,    12,      1,      5,      0,      0,      0,   ], 
                    }
                ],
            };
            exports.hybrid = makeHybrid(exports.destroy, 'Hybrid');
            exports.shotgun2 = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Shotgun',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                },
                GUNS: [ /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
                    POSITION: [  4,      3,      1,     11,     -3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  4,      3,      1,     11,      3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  4,      4,      1,     13,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  1,      4,      1,     12,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  1,      4,      1,     11,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {                
                    POSITION: [  1,      3,      1,     13,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  1,      3,      1,     13,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  1,      2,      1,     13,      2,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  1,      2,      1,     13,     -2,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [ 15,     14,      1,     6,       0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  8,     14,    -1.3,    4,       0,      0,      0,   ], }
                ],
            };

        exports.builder = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Builder',
            STAT_NAMES: statnames.trap,
            BODY: {
                SPEED: base.SPEED * 0.8,
                FOV: base.FOV * 1.15,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    12,      1,      0,      0,      0,      0,   ], 
                }, {
                POSITION: [   2,    12,     1.1,     18,     0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                        TYPE: exports.block,
                    }, },
            ],
        };
            exports.engineer = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Engineer',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: base.SPEED * 0.75,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    11,      1,     10.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   3,    14,      1,     15.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    14,     1.3,     18,      0,      0,      0,   ], 
                        PROPERTIES: {
                            MAX_CHILDREN: 6,
                            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                            TYPE: exports.pillbox,        
                            SYNCS_SKILLS: true,   
                        }, }, {                            
                    POSITION: [   4,    14,      1,      8,      0,      0,      0,   ]
                    }
                ],
            };
            exports.construct = {
                PARENT: [exports.genericTank],
                LABEL: 'Constructer',
                STAT_NAMES: statnames.trap,
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.5,
                    SPEED: base.SPEED * 0.7,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,    18,      1,      0,      0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    18,     1.2,     18,     0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.construct]),
                            TYPE: exports.block,
                        }, }, 
                ],
            };
exports.megatrapper = {
                PARENT: [exports.genericTank],
                LABEL: 'Mega Trapper',
                STAT_NAMES: statnames.trap,
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.5,
                    SPEED: base.SPEED * 0.7,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  16,    13,      1,      0,      0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    13,     1.6,     16,     0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.construct]),
                            TYPE: exports.trap,
                        }, }, 
                ],
            };
            exports.autobuilder = makeAuto(exports.builder);
            exports.conq = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: '',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  21,    14,      1,      0,      0,     180,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  18,    14,      1,      0,      0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    14,     1.1,     18,     0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                            TYPE: exports.block,
                        }, },
                ],
            };
            exports.bentboomer = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Boomer',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   8,    10,      1,      8,     -2,     -35,     0,   ],
                        }, {
                    POSITION: [   8,    10,      1,      8,      2,      35,     0,   ],
                        }, {
                    POSITION: [   2,    10,     1.3,     16,    -2,     -35,     0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.fast, g.twin]),
                            TYPE: exports.boomerang,
                        }, }, {
                    POSITION: [   2,    10,     1.3,     16,     2,      35,    0.5,  ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.fast, g.twin]),
                            TYPE: exports.boomerang,
                        }, },
                ],
            };
            exports.boomer = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Boomer',
                STAT_NAMES: statnames.trap,
                FACING_TYPE: 'locksFacing',
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    10,      1,      14,     0,      0,      0,   ],
                        }, {
                    POSITION: [   6,    10,    -1.5,      7,     0,      0,      0,   ],
                        }, {
                    //POSITION: [  12,    15,      1,      0,      0,      0,      0,   ],
                    //    }, {
                    POSITION: [   2,    10,     1.3,     18,     0,      0,      0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.boomerang]),
                            TYPE: exports.boomerang,
                        }, },
                ],
            };
            exports.quadtrapper = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: '',
                STAT_NAMES: statnames.trap, 
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,     6,      1,      0,      0,     45,      0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     45,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                            TYPE: exports.block,
                        }, }, {
                    POSITION: [  14,     6,      1,      0,      0,     135,     0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     135,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                            TYPE: exports.block,
                        }, }, {
                    POSITION: [  14,     6,      1,      0,      0,     225,     0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     225,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                            TYPE: exports.block,
                        }, }, {
                    POSITION: [  14,     6,      1,      0,      0,     315,     0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     315,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                            TYPE: exports.block,
                        }, },
                ],
            };

        exports.artillery = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Artillery',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  17,     3,      1,      0,     -6,     -7,     0.25,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  17,     3,      1,      0,      6,      7,     0.75,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  19,     12,     1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Heavy',
                    }, },
            ],
        };
            exports.mortar = {
                PARENT: [exports.genericTank],
                LABEL: 'Mortar',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  13,     3,      1,      0,     -8,     -7,     0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  13,     3,      1,      0,      8,      7,     0.8,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  17,     3,      1,      0,     -6,     -7,     0.2,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  17,     3,      1,      0,      6,      7,     0.4,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  19,     12,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
                            TYPE: exports.bullet,
                            LABEL: 'Heavy',
                        }, },
                ],
            };
exports.testmissile3 = {
    PARENT: [exports.bullet],
    SHAPE: 0,
    LABEL: 'Missile',
    INDEPENDENT: true,
    BODY: {
        RANGE: 120,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [14, 12, 0.5, 0, 0, 180, 0, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil,

                g.morespeed, g.morespeed
            ]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
        },
    }, ],
};
exports.launcher = {
    PARENT: [exports.genericTank],
    BODY: {
        FOV: base.FOV * 1.15,
    },
    LABEL: 'Launcher',
    DANGER: 7,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [10, 8, -0.5, 9, 0, 0, 0, ],
    }, {
        POSITION: [17, 9, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([ g.basic, g.skim]),
            TYPE: exports.testmissile3,
          
        },
    }, ],
};

            exports.skimmer = {
                PARENT: [exports.genericTank],
                BODY: {
                    FOV: base.FOV * 1.15,
                },
                LABEL: 'Skimmer',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  10,    14,    -0.5,     9,      0,      0,      0,  ], 
                        }, {
                    POSITION: [  17,    15,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim]),
                            TYPE: exports.missile,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, },
                ],
            };
            exports.spread = {
                PARENT: [exports.genericTank],
                LABEL: 'Spreadshot',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  13,     4,      1,      0,    -0.8,    -75,    5/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 14.5,    4,      1,      0,    -1.0,    -60,    4/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  16,     4,      1,      0,    -1.6,    -45,    3/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 17.5,    4,      1,      0,    -2.4,    -30,    2/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  19,     4,      1,      0,    -3.0,    -15,    1/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {                    
                    POSITION: [  13,     4,      1,      0,     0.8,     75,    5/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 14.5,    4,      1,      0,     1.0,     60,    4/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  16,     4,      1,      0,     1.6,     45,    3/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 17.5,    4,      1,      0,     2.4,     30,    2/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  19,     4,      1,      0,     3.0,     15,    1/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  13,    10,     1.3,     8,      0,      0,      0,     ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.spreadmain, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Pounder',
                        }, },
                ],
            };

    exports.flank = {
        PARENT: [exports.genericTank],
        LABEL: 'Flank Guard',
        BODY: {
            SPEED: base.SPEED * 1.1,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
                }, }, {   
            POSITION: [  18,     8,      1,      0,      0,     120,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
                }, }, {   
            POSITION: [  18,     8,      1,      0,      0,     240,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
                }, },
        ],
    };
        exports.hexa = {
            PARENT: [exports.genericTank],
            LABEL: 'Hexa Tank',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     120,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     240,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,      60,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     180,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     300,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
 exports.proangle = {
            PARENT: [exports.genericTank],
            LABEL: 'Pro-Angle',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     150,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     210,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  15,     8,      1.7,      0,      0,      60,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap,
                    }, }, {   
                POSITION: [  15,     8,      1.7,      0,      0,     180,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap,
                    }, }, {   
                POSITION: [  15,     8,      1.7,      0,      0,     300,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap,
                    }, },
            ],
        };
            exports.octo = {
                PARENT: [exports.genericTank],
                LABEL: 'Octo Tank',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      45,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     135,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     225,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     315,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.heptatrap = (() => {
                let a = 360/7, d = 1/7;
                return {
                    PARENT: [exports.genericTank],
                    LABEL: 'Hepta-Trapper',
                    DANGER: 7,
                    BODY: {
                        SPEED: base.SPEED * 0.8,
                    },
                    STAT_NAMES: statnames.trap,
                    HAS_NO_RECOIL: true,
                    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                        POSITION: [  15,     7,      1,      0,      0,      0,      0,   ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,      0,      0,   ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,      a,     4*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,      a,     4*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     2*a,    1*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     2*a,    1*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     3*a,    5*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     3*a,    5*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     4*a,    2*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     4*a,    2*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     5*a,    6*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     5*a,    6*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     6*a,    3*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     6*a,    3*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, },
                    ],
                };
            })();
            exports.hexatrap = makeAuto({
                PARENT: [exports.genericTank],
                LABEL: 'Hexa-Trapper',
                DANGER: 7,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                },
                STAT_NAMES: statnames.trap,
                HAS_NO_RECOIL: true,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  15,     7,      1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     60,     0.5,  ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     60,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     120,     0,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     120,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     180,    0.5,  ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     180,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     240,     0,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     240,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     300,    0.5,  ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     300,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            }, 'Hexa-Trapper');

        exports.tri = {
            PARENT: [exports.genericTank],
            LABEL: 'Tri-Angle',
            BODY: {
                HEALTH: base.HEALTH * 0.8,
                SHIELD: base.SHIELD * 0.8,
                DENSITY: base.DENSITY * 0.6,
            },
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.tonsmorrecoil]),
                        TYPE: exports.bullet,
                        LABEL: 'Front',
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, },
            ],
        }; 
 exports.eagle = {
            PARENT: [exports.genericTank],
            LABEL: 'Eagle',
            DANGER: 7,
            BODY: {
                ACCELERATION: base.ACCEL,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,    12,      1,      0,      0,      0,      0,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                        TYPE: exports.bullet,
                            LABEL: 'Pounder',
                            ALT_FIRE: true,
                    }, }, {
                POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {
                POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {
                POSITION: [  18,     8,      1,      0,      0,     180,    0.6,  ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, },
            ],
        };
            exports.booster = {
                PARENT: [exports.genericTank],
                LABEL: 'Booster',
                BODY: {
                    HEALTH: base.HEALTH * 0.6,
                    SHIELD: base.SHIELD * 0.6,
                    DENSITY: base.DENSITY * 0.2,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.muchmorerecoil]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  13,     8,      1,      0,     -1,     135,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  13,     8,      1,      0,      1,     225,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     145,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     215,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
            exports.fighter = {
                PARENT: [exports.genericTank],
                LABEL: 'Fighter',
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,     -1,      90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Side',
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      1,     -90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Side',
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
exports.bighter = {
  PARENT: [exports.genericTank],
   LABEL: 'Bighter',
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                },
                DANGER: 7,
     GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,     -1,      90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Side',
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      1,     -90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Side',
                        }, }, { 
                            POSITION: [  13,     8,      1,      0,     -1,     135,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  13,     8,      1,      0,      1,     225,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     145,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     215,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
};
            exports.brutalizer = {
                PARENT: [exports.genericTank],
                LABEL: '',
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [   7,    7.5,    0.6,     7,     -1,      90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,         
                        }, }, {   
                    POSITION: [   7,    7.5,    0.6,     7,      1,     -90,     9,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,     
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
            exports.bomber = {
                PARENT: [exports.genericTank],
                LABEL: 'Bomber',
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  20,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     130,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri]),
                            TYPE: exports.bullet,
                            LABEL: 'Wing',
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     230,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri]),
                            TYPE: exports.bullet,
                            LABEL: 'Wing',
                        }, }, {
                    POSITION: [  14,     8,      1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   4,     8,     1.5,    14,      0,     180,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.morerecoil]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };    
 exports.bombarder = {
                PARENT: [exports.genericTank],
                LABEL: 'Bombadier',
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  20,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {
                    POSITION: [  14,     8,      1,      0,      0,     130,     0,   ],
                        }, {
                    POSITION: [   4,     8,     1.5,    14,      0,     130,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.flank, g.tri, g.mach]),
                            TYPE: exports.trap,
                            LABEL: 'Wing',
                        }, },  {
                    POSITION: [  14,     8,      1,      0,      0,     230,     0,   ],
                        }, {
                    POSITION: [   4,     8,     1.5,    14,      0,     230,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.flank, g.tri, g.mach]),
                            TYPE: exports.trap,
                            LABEL: 'Wing',
                        }, }, {
                    POSITION: [  14,     8,      1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   4,     8,     1.5,    14,      0,     180,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.morerecoil,]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };   
            exports.autotri = makeAuto(exports.tri);   
            exports.autotri.BODY = {
                SPEED: base.SPEED,
            };   
            exports.falcon = {
                PARENT: [exports.genericTank],
                LABEL: 'Falcon',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.8,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  27,    8.5,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.lessreload]),
                            TYPE: exports.bullet,
                            LABEL: 'Assassin',
                            ALT_FIRE: true,
                        }, }, {
                    POSITION: [   5,    8.5,   -1.6,     8,      0,      0,      0,   ], 
                        }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     180,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
exports.auto2 = {
    PARENT: [exports.genericTank],
    LABEL: 'Auto-2',
    DANGER: 6,
    FACING_TYPE: 'autospin',
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [11, 8, 0, 0, 190, 0],
        TYPE: exports.auto2gun,
    }, {
        POSITION: [11, 8, 0, 180, 190, 0],
        TYPE: exports.auto2gun,
    }, ],
};
        exports.auto3 = { 
            PARENT: [exports.genericTank],
            LABEL: 'Auto-3',
            DANGER: 6,
            FACING_TYPE: 'autospin',
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     8,      0,      0,     190, 0], 
                    TYPE: exports.auto3gun,
                        }, {
                POSITION: [  11,     8,      0,     120,    190, 0], 
                    TYPE: exports.auto3gun,
                        }, {
                POSITION: [  11,     8,      0,     240,    190, 0], 
                    TYPE: exports.auto3gun,
                        },
            ],
        };
            exports.auto5 = {
                PARENT: [exports.genericTank],
                LABEL: 'Auto-5',
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     8,      0,      0,     190, 0], 
                        TYPE: exports.auto5gun,
                            }, {
                    POSITION: [  11,     8,      0,      72,    190, 0], 
                        TYPE: exports.auto5gun,
                            }, {
                    POSITION: [  11,     8,      0,     144,    190, 0], 
                        TYPE: exports.auto5gun,
                            }, {
                    POSITION: [  11,     8,      0,     216,    190, 0], 
                        TYPE: exports.auto5gun,
                            }, {
                    POSITION: [  11,     8,      0,     288,    190, 0], 
                        TYPE: exports.auto5gun,
                            },
                ],
            };
            exports.heavy3 = {
                BODY: {
                    SPEED: base.SPEED * 0.95,
                },
                PARENT: [exports.genericTank],
                LABEL: 'Mega-3',
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  14,     8,      0,      0,     190, 0], 
                        TYPE: exports.heavy3gun,
                            }, {
                    POSITION: [  14,     8,      0,     120,    190, 0], 
                        TYPE: exports.heavy3gun,
                            }, {
                    POSITION: [  14,     8,      0,     240,    190, 0], 
                        TYPE: exports.heavy3gun,
                            },
                ],
            };
            exports.tritrap = {
                LABEL: '',
                BODY: {
                    SPEED: base.SPEED * 1.1,
                },
                PARENT: [exports.genericTank],
                DANGER: 6,
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  12,     8,      0,      0,     190, 0], 
                        TYPE: exports.tritrapgun,
                            }, {
                    POSITION: [  12,     8,      0,     120,    190, 0], 
                        TYPE: exports.tritrapgun,
                            }, {
                    POSITION: [  12,     8,      0,     240,    190, 0], 
                        TYPE: exports.tritrapgun,
                            },
                ],
            };
            exports.sniper3 = { 
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: '',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.6,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.25,
                },
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  13,     8,      0,      0,     170, 0], 
                        TYPE: exports.sniper3gun,
                            }, {
                    POSITION: [  13,     8,      0,     120,    170, 0], 
                        TYPE: exports.sniper3gun,
                            }, {
                    POSITION: [  13,     8,      0,     240,    170, 0], 
                        TYPE: exports.sniper3gun,
                            },
                ],
            };
            exports.auto4 = { 
                PARENT: [exports.genericTank],
                DANGER: 5,
                LABEL: 'Auto-4',
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  13,     6,      0,      45,    160, 0], 
                        TYPE: exports.auto4gun,
                            }, {
                    POSITION: [  13,     6,      0,     135,    160, 0], 
                        TYPE: exports.auto4gun,
                            }, {
                    POSITION: [  13,     6,      0,     225,    160, 0],
                        TYPE: exports.auto4gun,
                            }, {
                    POSITION: [  13,     6,      0,     315,    160, 0],
                        TYPE: exports.auto4gun,
                            },
                ],
            };
            exports.trapper = {
        PARENT: [exports.genericTank],
        LABEL: 'Trapper',
        STAT_NAMES: statnames.trap,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     7,      1,      0,      0,      0,      0,   ],
                }, {
            POSITION: [   3,     7,     1.7,    15,      0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
            }, },
        ],
    };
exports.autotrapper = {
  PARENT: [exports.genericTank],
  LABEL: 'Auto-Trapper',
  GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     7,      1,      0,      0,      0,      0,   ],
                }, {
            POSITION: [   3,     7,     1.7,    15,      0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
            }, },
        ],
   TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                
                POSITION: [  11,     0,      0,       0,    360,   1, ],  
                    TYPE: [exports.autoTurret, { CONTROLLERS: ['nearestDifferentMaster'], INDEPENDENT: true}]
                    },
            ],
};
    exports.tritrapper = {
        PARENT: [exports.genericTank],
        LABEL: 'Tri-Trapper',
        DANGER: 6,
        STAT_NAMES: statnames.trap,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     7,      1,      0,      0,      0,      0,   ],
                }, {
            POSITION: [   3,     7,     1.7,    15,      0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.bitweak]),
                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
            }, }, {
            POSITION: [  15,     7,      1,      0,      0,    120,      0,   ],
                }, {
            POSITION: [   3,     7,     1.7,    15,      0,    120,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.bitweak]),
                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
            }, }, {
            POSITION: [  15,     7,      1,      0,      0,    240,      0,   ],
                }, {
            POSITION: [   3,     7,     1.7,    15,      0,    240,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.bitweak]),
                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
            }, },
        ],
    }
 exports.tribuilder = {
        PARENT: [exports.genericTank],
        LABEL: 'Tri-Builder',
        DANGER: 6,
        STAT_NAMES: statnames.trap,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  18,     12,      1,      0,      0,      0,      0,   ],
                }, {
            POSITION: [   2,     12,     1.1,    18,      0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                TYPE: exports.block, STAT_CALCULATOR: gunCalcNames.trap,
            }, }, {
            POSITION: [  18,     12,      1,      0,      0,    120,      0,   ],
                }, {
            POSITION: [   2,     12,     1.1,    18,      0,    120,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                TYPE: exports.block, STAT_CALCULATOR: gunCalcNames.trap,
            }, }, {
            POSITION: [  18,     12,      1,      0,      0,    240,      0,   ],
                }, {
            POSITION: [   2,     12,     1.1,    18,      0,    240,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                TYPE: exports.block, STAT_CALCULATOR: gunCalcNames.trap,
            }, },
        ],
    };
        exports.flanktrap = {
            PARENT: [exports.genericTank],
            LABEL: 'Trap Guard',
            STAT_NAMES: statnames.generic,
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  13,     8,      1,      0,      0,     180,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    13,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, },
            ],
        };
            exports.guntrap = {
                PARENT: [exports.genericTank],
                LABEL: 'Gunner Trapper',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    FOV: base.FOV * 1.25,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     2,      1,      0,    -2.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     2,      1,      0,     2.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  12,    11,      1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [  13,    11,      1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   4,    11,     1.7,    13,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.fast, g.halfrecoil]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
            exports.bushwhack = {
                PARENT: [exports.genericTank],
                LABEL: 'Snipe Guard',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7, 
                    FOV: base.FOV * 1.2,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  24,    8.5,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  13,    8.5,     1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   4,    8.5,    1.7,    13,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
exports.tribuildgun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  20,    16,      1,      0,      0,      0,      0,   ],
        }, {
        POSITION: [   2,    16,     1.1,     20,     0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block, g.auto, g.bitweak]),
                TYPE: exports.block,
            }, },
    ],
};
 exports.tribuild = {
                LABEL: 'Architect',
                BODY: {
                    SPEED: base.SPEED * 1.1,
                },
                PARENT: [exports.genericTank],
                DANGER: 6,
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  12,     8,      0,      0,     190, 0],
                        TYPE: exports.tribuildgun,
                            }, {
                    POSITION: [  12,     8,      0,     120,    190, 0],
                        TYPE: exports.tribuildgun,
                            }, {
                    POSITION: [  12,     8,      0,     240,    190, 0],
                        TYPE: exports.tribuildgun,
                            },
                ],
            };
exports.hexabuilder = {
    PARENT: [exports.genericTank],
    LABEL: 'Hexa-Builder',
    DANGER: 7,
    BODY: {
        SPEED: base.SPEED * 0.8,
    },
    STAT_NAMES: statnames.trap,
    HAS_NO_RECOIL: true,
   GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [18, 12, 1, 0, 0, 0, 0, ],
    }, {
        POSITION: [2, 12, 1.1, 18, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
            TYPE: exports.block,
        },
    }, {
        POSITION: [18, 12, 1, 0, 0, 180, 0, ],
    }, {
        POSITION: [2, 12, 1.1, 18, 0, 180, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
            TYPE: exports.block,
        },
    }, {
        POSITION: [18, 12, 1, 0, 0, 60, 0, ],
    }, {
        POSITION: [2, 12, 1.1, 18, 0, 60, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
            TYPE: exports.block,
        },
    }, {
        POSITION: [18, 12, 1, 0, 0, 120, 0, ],
    }, {
        POSITION: [2, 12, 1.1, 18, 0, 120, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
            TYPE: exports.block,
        },
    }, {
        POSITION: [18, 12, 1, 0, 0, 240, 0, ],
    }, {
        POSITION: [2, 12, 1.1, 18, 0, 240, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
            TYPE: exports.block,
        },
    }, {
        POSITION: [18, 12, 1, 0, 0, 300, 0, ],
    }, {
        POSITION: [2, 12, 1.1, 18, 0, 300, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
            TYPE: exports.block,
        },
    }, ],
};
exports.landmineBody = {
    LABEL: '',
    CONTROLLERS: ['fastspin'],
    COLOR: 9,
    SHAPE: 6,
    INDEPENDENT: true,
};
 exports.landmine = {
                PARENT: [exports.genericTank],
                LABEL: 'Landmine',
              //  INVISIBLE: [0.06, 0.01],
    ALPHA: 0.00001,
                DANGER: 7,
                BODY: {
                    SPEED: base.SPEED * 1.1,
                    FOV: base.FOV * 1.05,
                    DENSITY: base.DENSITY * 2,
                },
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  21.5,   0,      0,      0,     360,  0,],
                    TYPE: exports.smasherBody,
                }, { /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  21.5,   0,      0,      0,     360,  0,],
                    TYPE: exports.landmineBody,
                }],
                IS_SMASHER: true,
                SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
                STAT_NAMES: statnames.smasher,
            };
  exports.stalker = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Stalker',
     ALPHA: 0.00001,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.55,
                    SPEED: base.SPEED * 0.85,
                    FOV: base.FOV * 1.35,
                },
               // INVISIBLE: [0.08, 0.03],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  27,    8.5,     -2,      0,      0,      0,      0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
 exports.manager = {
                PARENT: [exports.genericTank],
                LABEL: 'Manager',
    ALPHA: 0.00001,
                DANGER: 7,
                STAT_NAMES: statnames.drone,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.6,
                    SPEED: base.SPEED * 0.85,
                    FOV: base.FOV * 1.1,
                },
                //INVISIBLE: [0.08, 0.03],
                MAX_CHILDREN: 8,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.doublereload]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                        }, },
                ],
            };
 exports.lilfactauto = makeAuto(exports.lilfact, 'Auto-Spawner');
 exports.twintrap = {
                PARENT: [exports.genericTank],
                LABEL: 'Bulwark',
                STAT_NAMES: statnames.generic,
                DANGER: 6,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.twin, g.bitmorespeed]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  13,     8,      1,      0,     5.5,    190,     0,   ],
                        }, {
                    POSITION: [   4,     8,     1.7,    13,     5.5,    190,     0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.twin, g.bitmorespeed]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  13,     8,      1,      0,    -5.5,    170,    0.5,  ],
                        }, {
                    POSITION: [   4,     8,     1.7,    13,    -5.5,    170,    0.5,  ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
 exports.hurricane = {
                PARENT: [exports.genericTank],
                LABEL: 'Cyclone',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  15,    3.5,     1,      0,        0,    0,     0, ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  15,    3.5,     1,      0,        0,   30,   0.5, ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  15,    3.5,     1,      0,        0,   60,  0.25, ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  15,    3.5,     1,      0,        0,   90,  0.75, ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  15,    3.5,     1,      0,        0,  120,     0, ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  15,    3.5,     1,      0,        0,  150,   0.5, ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  15,    3.5,     1,      0,        0,  180,  0.25, ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  15,    3.5,     1,      0,        0,  210,  0.75, ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  15,    3.5,     1,      0,        0,  240,     0, ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  15,    3.5,     1,      0,        0,  270,   0.5, ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  15,    3.5,     1,      0,        0,  300,  0.25, ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  15,    3.5,     1,      0,        0,  330,  0.75, ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
exports.submachine = {
    PARENT: [exports.genericTank],
    LABEL: 'Sub-Machine',
    DANGER: 6,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [30, 2, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.vulc, ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [30, 2, 1, 0, 2, 0, 0.2, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.vulc, ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [30, 2, 1, 0, -2, 0, 0.4, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.vulc, ]),
            TYPE: exports.bullet,
        },
    }, {
       POSITION: [30, 2, 1, 0, 0, 0, 0.6, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.vulc, ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [30, 2, 1, 0, 2, 0, 0.8, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.vulc, ]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [30, 2, 1, 0, -2, 0, 1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.vulc, ]),
            TYPE: exports.bullet,
        },
    }, {
                    POSITION: [12, 10, 1, 0, 0, 0, 0, ],
                }, {
                    POSITION: [5, 10, 1, 20, 0, 0, 0, ],
                },],
};
            exports.vulcan = {
                PARENT: [exports.genericTank],
                LABEL: 'Vulcan',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [30, 1.5, 1, 0, -4.5, 0, 0.0, ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.vulc]),
                        TYPE: exports.bullet,
                    },
                }, {
                    POSITION: [30, 1.5, 1, 0, -4.5, 0, 0.9, ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.vulc]),
                        TYPE: exports.bullet,
                    },
                }, {
                    POSITION: [30, 1.5, 1, 0, 4.5, 0, 0.4, ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.vulc]),
                        TYPE: exports.bullet,
                    },
                }, {
                    POSITION: [30, 1.5, 1, 0, 4.5, 0, 0.5, ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.vulc]),
                        TYPE: exports.bullet,
                    },
                }, {
                    POSITION: [30, 1.5, 1, 0, -2.5, 0, 0.1, ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.vulc]),
                        TYPE: exports.bullet,
                    },
                }, {
                    POSITION: [30, 1.5, 1, 0, 2.5, 0, 0.3, ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.vulc]),
                        TYPE: exports.bullet,
                    },
                }, {
                    POSITION: [30, 1.5, 1, 0, 2.5, 0, 0.6, ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.vulc]),
                        TYPE: exports.bullet,
                    },
                }, {
                    POSITION: [30, 1.5, 1, 0, -2.5, 0, 0.8, ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.vulc]),
                        TYPE: exports.bullet,
                    },
                }, {
                    POSITION: [30, 1.5, 1, 0, 0, 0, 0.2, ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.vulc]),
                        TYPE: exports.bullet,
                    },
                }, {
                    POSITION: [30, 1.5, 1, 0, 0, 0, 0.7, ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.vulc]),
                        TYPE: exports.bullet,
                    },
                }, {
                    POSITION: [12, 14, 1, 0, 0, 0, 0, ],
                }, {
                    POSITION: [5, 14, 1, 20, 0, 0, 0, ],
                }, ],
            };
exports.spinmissile = {
    PARENT: [exports.bullet],
    LABEL: 'Missile',
    INDEPENDENT: true,
    BODY: {
        RANGE: 120,
    },
    FACING_TYPE: 'autospin',
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  14,     8,      1,      0,     0,     0,     0,   ],
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morereload, g.morespeed]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                STAT_CALCULATOR: gunCalcNames.thruster,
            }, }, {
        POSITION: [  14,     8,      1,      0,      0,     180,     0,  ],
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morereload, g.morespeed]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                STAT_CALCULATOR: gunCalcNames.thruster,
            }, },
    ],
};
  exports.spinner = {
                PARENT: [exports.genericTank],
                BODY: {
                    FOV: base.FOV * 1.1,
                },
                LABEL: 'Twister',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  10,    13,    -0.5,     9,      0,      0,      0,  ],
                        }, {
                    POSITION: [  17,    14,      -1.4,      0,      0,      0,      0,  ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim, g.morerange, g.threequartersrof]),
                            TYPE: exports.spinmissile,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, },
                ],
            };

 exports.droneAutoTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Turret',
        BODY: {
            FOV: 0.8
        },
        COLOR: 16,
        //CONTROLLERS: ['nearestDifferentMaster'],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  22,    10,      1,      0,      0,      0,      0,   ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, g.fifthreload, g.overdrive]),
                    TYPE: exports.bullet,
                }, },
        ],
    };
 exports.autodrone = makeAuto(exports.drone, 'Auto-Drone', { type: exports.auto3gun, size: 9 })
 exports.overdrivesquare = {
                PARENT: [exports.genericTank],
                LABEL: 'Drive Square',
                SHAPE: 4,
                SIZE: 10,
            };
            exports.overdrive = {
                PARENT: [exports.genericTank],
                LABEL: 'Overdrive',
                DANGER: 7,
                STAT_NAMES: statnames.drone,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.SPEED * 0.9,
                    FOV: base.FOV * 1.1,
                },
                MAX_CHILDREN: 8,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     12,    1.2,     8,      0,     90,      0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.overdrive]),
                            TYPE: exports.autodrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                        }, }, {
                    POSITION: [   6,     12,    1.2,     8,      0,    270,      0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.overdrive]),
                            TYPE: exports.autodrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                        }, },
                ],
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  9,     0,      0,      0,     360,    1],
                    TYPE: exports.overdrivesquare,
                }],
            };
  exports.maleficitor = {
                PARENT: [exports.genericTank],
                LABEL: 'Maleficitor',
                DANGER: 7,
                STAT_NAMES: statnames.necro,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.SPEED * 0.85,
                    FOV: base.FOV * 1.1,
                },
                SHAPE: 4,
                MAX_CHILDREN: 20,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,     12,    1.2,     8,      0,     0,      0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.male]),
                            TYPE: [exports.sunchip, {
                                //INVISIBLE: [0.06, 0.03],
                            }],
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, },
                    ],
            };

exports.bosses = {
  PARENT:[exports.genericTank],
  LABEL: 'Bosses',
   RESET_UPGRADES: true,
             SKILL: [0, 0, 0, 0, 0, 1000, 0, 0, 0, 0,],
           
            BODY: { // def
                SHIELD: 1000,
                REGEN: 10,
                HEALTH: 100,
                DAMAGE: 10,
                DENSITY: 20,
                FOV: 2,
            },
           
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic,]),
                    TYPE: [exports.bullet, { SHAPE: 5, }],
                }, }, 
            ],
};
exports.xkxbosses = {
  PARENT:[exports.genericTank],
  LABEL: 'Hybrid Bosses',
   RESET_UPGRADES: true,
             SKILL: [0, 0, 0, 0, 0, 1000, 0, 0, 0, 0,],
           
            BODY: { // def
                SHIELD: 1000,
                REGEN: 10,
                HEALTH: 100,
                DAMAGE: 10,
                DENSITY: 20,
                FOV: 2,
            },
          
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, ]),
                    TYPE: [exports.bullet, { SHAPE: 5, }],
                }, }, 
            ],
};
exports.bosses2 = {
  PARENT:[exports.genericTank],
  LABEL: 'Page 2',
   RESET_UPGRADES: true,
             SKILL: [0, 0, 0, 0, 0, 1000, 0, 0, 0, 0,],
           
            BODY: { // def
                SHIELD: 1000,
                REGEN: 10,
                HEALTH: 100,
                DAMAGE: 10,
                DENSITY: 20,
                FOV: 2,
            },
        
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic,]),
                    TYPE: [exports.bullet, { SHAPE: 5, }],
                }, }, 
            ],
};
exports.misc = {
  PARENT:[exports.genericTank],
  LABEL: 'Misc.',
   RESET_UPGRADES: true,
             SKILL: [0, 0, 0, 0, 0, 1000, 0, 0, 0, 0,],
         
            BODY: { // def
                SHIELD: 1000,
                REGEN: 10,
                HEALTH: 100,
                DAMAGE: 10,
                DENSITY: 20,
                FOV: 2,
            },
          
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, ]),
                    TYPE: [exports.bullet, { SHAPE: 5, }],
                }, }, 
            ],
};
exports.bt1 = {
  PARENT:[exports.genericTank],
  LABEL: 'Beta Tester A',
   RESET_UPGRADES: true,
             SKILL: [0, 0, 0, 0, 0, 1000, 0, 0, 0, 0,],
           
            BODY: { // def
                SHIELD: 1000,
                REGEN: 10,
                HEALTH: 100,
                DAMAGE: 10,
                DENSITY: 20,
                FOV: 2,
            },
          
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, ]),
                    TYPE: [exports.bullet, { SHAPE: 5, }],
                }, }, 
            ],
};
exports.bt2 = {
  PARENT:[exports.genericTank],
  LABEL: 'Beta Tester B',
   RESET_UPGRADES: true,
            SKILL: [0, 0, 0, 0, 0, 1000, 0, 0, 0, 0,],
           
            BODY: { // def
                SHIELD: 1000,
                REGEN: 10,
                HEALTH: 100,
                DAMAGE: 10,
                DENSITY: 20,
                FOV: 2,
            },
          
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic,]),
                    TYPE: [exports.bullet, { SHAPE: 5, }],
                }, }, 
            ],
};
exports.automazegun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 5,
    },
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9,],
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
    COLOR: 16,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [27, 9, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.auto, g.assass, g.autosnipe, g.norecoil]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [5, 9, -1.5, 8, 0, 0, 0, ],
    }, ],
};
exports.automaze = {
 PARENT: [exports.mazewall],
   SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9,],
  TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
     
        POSITION: [15, 0, 0, 0, 360, 1],
        TYPE: [exports.automazegun, {
            INDEPENDENT: true,
            
        }],
    }, ],
};
exports.badTestbed = {
  PARENT:[exports.genericTank],
  LABEL: 'TESTBED',
  // RESET_UPGRADES: true,
            //SKILL: [0, 0, 0, 0, 0, 1000, 0, 0, 0, 0,],
           

          
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.single]),
                    TYPE: [exports.bullet, { SHAPE: 5, }],
                }, }, 
            ],
};
exports.dominator = {
    PARENT: [exports.genericTank],
    LABEL: 'Dominator',
   // TYPE: 'fixed',
    DANGER: 10,
    SIZE: 50,
  SKILL: skillSet({
     //   rld: 1,
        dam: 1,
        pen: 1,
        str: 1,
        //spd: 1,
        
    }),
        LEVEL: -1,
    BODY: {
        RESIST: 100,
        SPEED: 0,
        HEALTH: 250,
        DAMAGE: 10,
        PENETRATION: 0.5,
        PUSHABILITY: 0,
        FOV: 1.5,
        HETERO: 0,
        SHIELD: base.SHIELD * 1.25,
        REGEN: base.REGEN * 0.75,
    },
    CONTROLLERS: ['nearestDifferentMaster'],
  AI: {
       
        STRAFE: true,
    },
  DISPLAY_NAME: true,
    TURRETS: [{
        POSITION: [22, 0, 0, 0, 360, 0],
        TYPE: exports.dominationBody,
    }],
  VALUE: 0,
    CAN_BE_ON_LEADERBOARD: false,
    GIVE_KILL_MESSAGE: true,
    ACCEPTS_SCORE: false,
   BROADCAST_MESSAGE: 'A Dominator has changed teams!',
};
exports.dominator2 = {
    PARENT: [exports.genericTank],
    LABEL: 'Dominator',
   // TYPE: 'fixed',
    DANGER: 10,
  SKILL: skillSet({
        rld: 1,
        dam: 1,
        pen: 1,
        str: 1,
        spd: 1,
        
    }),
        LEVEL: -1,
    BODY: {
        RESIST: 100,
       // SPEED: 0,
        HEALTH: 250,
        DAMAGE: 10,
        PENETRATION: 0.5,
        PUSHABILITY: 0,
        FOV: 1.5,
        HETERO: 0,
        SHIELD: base.SHIELD * 1.25,
        REGEN: base.REGEN * 0.75,
    },
    TURRETS: [{
        POSITION: [22, 0, 0, 0, 360, 0],
        TYPE: exports.dominationBody,
    }],
};
exports.RainbowTank = {
  LABEL: 'K',
    PARENT: [exports.dominator2],
  CONTROLLERS: ['fastspin'],
   SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, bomb, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl,],
   SKILL: skillSet({
        rld: 1,
        dam: 1,
        pen: 1,
        str: 1,
        spd: 1,
        
    }),
  COLOR: 'rainbow',
    GUNS: [{
        
        POSITION: [15.85, 8.5, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.rainbow]),
            TYPE: exports.shatterBullet,
        },
    }, {
        POSITION: [5, 8.5, -1.6, 6.25, 0, 0, 0],
    }, ],
};
exports.gunnerDominator = {
  LABEL: 'Gunner Dominator',
    PARENT: [exports.dominator],
    GUNS: [{
        POSITION: [14.25, 3, 1, 0, -2, 0, 0.5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunnerDominator]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [14.25, 3, 1, 0, 2, 0, 0.5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunnerDominator]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15.85, 3, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunnerDominator]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [5, 8.5, -1.6, 6.25, 0, 0, 0],
    }],
};
 exports.destroyerDominator = {
  LABEL: 'Destroyer Dominator',
    PARENT: [exports.dominator],
    GUNS: [{
        
        POSITION: [15.85, 8.5, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.destroyDominator]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [5, 8.5, -1.6, 6.25, 0, 0, 0],
    }, ],
};
exports.trapDominatork = {
  LABEL: 'Trapper Dominator',
    PARENT: [exports.dominator],
  
    SKILL: skillSet({
        rld: 1,
        dam: 1,
        pen: 1,
        str: 1,
        spd: 1,
        
    }),
  FACING_TYPE: 'autospin',
    GUNS: [{
       POSITION: [12, 5, 1, 0, 0, 0, 0, ],
        }, {
            POSITION: [3, 5, 1.7, 12, 0, 0, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
              AUTOFIRE: true,
            },
        }, {  
           POSITION: [12, 5, 1, 0, 0, 180, 0, ],
        }, {
            POSITION: [3, 5, 1.7, 12, 0, 180, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
              AUTOFIRE: true,
            },
        },  {  
           POSITION: [12, 5, 1, 0, 0, 90, 0, ],
        }, {
            POSITION: [3, 5, 1.7, 12, 0, 90, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
              AUTOFIRE: true,
            },
        },  {  
           POSITION: [12, 5, 1, 0, 0, -90, 0, ],
        }, {
            POSITION: [3, 5, 1.7, 12, 0, -90, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
              AUTOFIRE: true,
            },
        },  {  
           POSITION: [12, 5, 1, 0, 0, 45, 0, ],
        }, {
            POSITION: [3, 5, 1.7, 12, 0, 45, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
              AUTOFIRE: true,
            },
        },  {  
           POSITION: [12, 5, 1, 0, 0, -45, 0, ],
        }, {
            POSITION: [3, 5, 1.7, 12, 0, -45, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
              AUTOFIRE: true,
            },
        },  {  
           POSITION: [12, 5, 1, 0, 0, 135, 0, ],
        }, {
            POSITION: [3, 5, 1.7, 12, 0, 135, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
              AUTOFIRE: true,
            },
        },  {  
           POSITION: [12, 5, 1, 0, 0, -135, 0, ],
        }, {
            POSITION: [3, 5, 1.7, 12, 0, -135, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
              AUTOFIRE: true,
            },
        },
    ],
};exports.gunnerDominator2 = {
  LABEL: 'Gunner Dominator',
    PARENT: [exports.dominator2],
    GUNS: [{
        POSITION: [14.25, 3, 1, 0, -2, 0, 0.5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunnerDominator]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [14.25, 3, 1, 0, 2, 0, 0.5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunnerDominator]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15.85, 3, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunnerDominator]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [5, 8.5, -1.6, 6.25, 0, 0, 0],
    }],
};
 exports.destroyerDominator2 = {
  LABEL: 'Destroyer Dominator',
    PARENT: [exports.dominator2],
    GUNS: [{
        
        POSITION: [15.85, 8.5, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.destroyDominator]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [5, 8.5, -1.6, 6.25, 0, 0, 0],
    }, ],
};
exports.trapDominator2 = {
  LABEL: 'Trapper Dominator',
    PARENT: [exports.dominator2],
  
    SKILL: skillSet({
        rld: 1,
        dam: 1,
        pen: 1,
        str: 1,
        spd: 1,
        
    }),
  FACING_TYPE: 'autospin',
    GUNS: [{
       POSITION: [12, 5, 1, 0, 0, 0, 0, ],
        }, {
            POSITION: [3, 5, 1.7, 12, 0, 0, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
              AUTOFIRE: true,
            },
        }, {  
           POSITION: [12, 5, 1, 0, 0, 180, 0, ],
        }, {
            POSITION: [3, 5, 1.7, 12, 0, 180, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
              AUTOFIRE: true,
            },
        },  {  
           POSITION: [12, 5, 1, 0, 0, 90, 0, ],
        }, {
            POSITION: [3, 5, 1.7, 12, 0, 90, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
              AUTOFIRE: true,
            },
        },  {  
           POSITION: [12, 5, 1, 0, 0, -90, 0, ],
        }, {
            POSITION: [3, 5, 1.7, 12, 0, -90, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
              AUTOFIRE: true,
            },
        },  {  
           POSITION: [12, 5, 1, 0, 0, 45, 0, ],
        }, {
            POSITION: [3, 5, 1.7, 12, 0, 45, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
              AUTOFIRE: true,
            },
        },  {  
           POSITION: [12, 5, 1, 0, 0, -45, 0, ],
        }, {
            POSITION: [3, 5, 1.7, 12, 0, -45, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
              AUTOFIRE: true,
            },
        },  {  
           POSITION: [12, 5, 1, 0, 0, 135, 0, ],
        }, {
            POSITION: [3, 5, 1.7, 12, 0, 135, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
              AUTOFIRE: true,
            },
        },  {  
           POSITION: [12, 5, 1, 0, 0, -135, 0, ],
        }, {
            POSITION: [3, 5, 1.7, 12, 0, -135, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
              AUTOFIRE: true,
            },
        },
    ],
};
exports.lancer = {
    PARENT: [exports.genericTank],
    LABEL: 'Lancer',
    DANGER: 5,
  STAT_NAMES: statnames.lance,
    BODY: {
        SPEED: base.SPEED * 2,
        ACCELERATION: base.ACCEL * 1.5,
        DAMAGE: 3,
    },
    GUNS: [{
        POSITION: [8, 4, 1.4, 6, 0, 0, 0],
        PROPERTIES: {
            
            SHOOT_SETTINGS: combineStats([g.lance]),
            TYPE: [exports.bullet, {
                LABEL: 'Lance',
              ALPHA: 0
            }]
        }
    }, {
        POSITION: [8, 4, 1.4, 8.5, 0, 0, 0],
        PROPERTIES: {
          
            SHOOT_SETTINGS: combineStats([g.lance]),
            TYPE: [exports.bullet, {
                LABEL: 'Lance',
              ALPHA: 0
            }]
        }
    }, {
        POSITION: [25, 0.3, -55, 0, 0, 0, 0]
    }]
};
exports.lancer2 = {
    PARENT: [exports.genericTank],
    LABEL: 'Shielder', 
   DANGER: 5,
  STAT_NAMES: statnames.lance,
    BODY: {
        SPEED: base.SPEED * 2,
        ACCELERATION: base.ACCEL * 1.5,
        DAMAGE: 3,
       SHIELD: base.SHIELD * 2.5,
    },
    GUNS: [{
        POSITION: [8, 4, 1.4, 6, 0, 0, 0],
        PROPERTIES: {
            
            SHOOT_SETTINGS: combineStats([g.lance]),
            TYPE: [exports.bullet, {
                LABEL: 'Lance',
              ALPHA: 0
            }]
        }
    }, {
        POSITION: [8, 4, 1.4, 8.5, 0, 0, 0],
        PROPERTIES: {
          
            SHOOT_SETTINGS: combineStats([g.lance]),
            TYPE: [exports.bullet, {
                LABEL: 'Lance',
              ALPHA: 0
            }]
        }
    }, {
        POSITION: [25, 0.3, -55, 0, 0, 0, 0]
    }],
    TURRETS: [{
        POSITION: [4, 0, 0, 0, 360, 0],
        TYPE: exports.mod_ring,
    }],
 
};
exports.basicminionhive = {
    PARENT: [exports.genericTank],
    LABEL: 'Basic',
  TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
  
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: true,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: true,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'
    ],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [18, 8, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
            LABEL: '', // def
            STAT_CALCULATOR: 0, // def
            WAIT_TO_CYCLE: false, // def
            AUTOFIRE: false, // def
            SYNCS_SKILLS: false, // def         
            MAX_CHILDREN: 0, // def  
            ALT_FIRE: false, // def 
            NEGATIVE_RECOIL: false, // def
        },
    }, ],
};
exports.automindminion = {
    PARENT: [exports.genericTank],
    LABEL: 'Auto-Basic',
  TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
  
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: true,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: true,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'
    ],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [18, 8, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
            LABEL: '', // def
            STAT_CALCULATOR: 0, // def
            WAIT_TO_CYCLE: false, // def
            AUTOFIRE: false, // def
            SYNCS_SKILLS: false, // def         
            MAX_CHILDREN: 0, // def  
            ALT_FIRE: false, // def 
            NEGATIVE_RECOIL: false, // def
        },
    }, ],
   TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
               
                POSITION: [  11,     0,      0,     0,    360,   0, ],  
                    TYPE: [exports.genericTank]
                    }, {
                POSITION: [  11,     0,      0,       0,    360,   1, ],  
                    TYPE: [exports.auto3gun, { INDEPENDENT: true,}]
                    },
            ],
};
exports.lancerminion = {
    PARENT: [exports.genericTank],
    LABEL: 'Lancer',
    DANGER: 5,
  STAT_NAMES: statnames.lance,
    BODY: {
        SPEED: base.SPEED * 2,
        ACCELERATION: base.ACCEL * 1.5,
        DAMAGE: 3,
    },
  TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
  
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: true,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: true,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster', 'mapTargetToGoal'
    ],
    GUNS: [{
        POSITION: [8, 4, 1.4, 6, 0, 0, 0],
        PROPERTIES: {
            
            SHOOT_SETTINGS: combineStats([g.lance]),
            TYPE: [exports.bullet, {
                LABEL: 'Lance',
              ALPHA: 0
            }]
        }
    }, {
        POSITION: [8, 4, 1.4, 8.5, 0, 0, 0],
        PROPERTIES: {
          
            SHOOT_SETTINGS: combineStats([g.lance]),
            TYPE: [exports.bullet, {
                LABEL: 'Lance',
              ALPHA: 0
            }]
        }
    }, {
        POSITION: [25, 0.3, -55, 0, 0, 0, 0]
    }]
};
exports.lancemind = {
    PARENT: [exports.genericTank],
    LABEL: 'Lance-Mind',
    DANGER: 5,
  STAT_NAMES: statnames.lance,
    BODY: {
        SPEED: base.SPEED * 2,
        ACCELERATION: base.ACCEL * 1.5,
        DAMAGE: 3,
    },
  
    GUNS: [{
      POSITION: [1, 10, 1, 0, 0, 180, 0, ],
        PROPERTIES: {AUTOFIRE: true,
             SHOOT_SETTINGS: combineStats([g.basic, g.bighive]),
            TYPE: [exports.lancerminion, {
              SIZE: 100
            }],

                      MAX_CHILDREN: 2,
        },
  }, {
        POSITION: [8, 4, 1.4, 6, 0, 0, 0],
        PROPERTIES: {
            
            SHOOT_SETTINGS: combineStats([g.lance]),
            TYPE: [exports.bullet, {
                LABEL: 'Lance',
              ALPHA: 0
            }]
        }
    }, {
        POSITION: [8, 4, 1.4, 8.5, 0, 0, 0],
        PROPERTIES: {
          
            SHOOT_SETTINGS: combineStats([g.lance]),
            TYPE: [exports.bullet, {
                LABEL: 'Lance',
              ALPHA: 0
            }]
        }
    }, {
        POSITION: [25, 0.3, -55, 0, 0, 0, 0]
    }]
};
exports.machhive = {
    PARENT: [exports.genericTank],
    LABEL: 'Machine Gun',
  TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
  
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: true,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: true,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'
    ],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    12,     10,     1.4,     8,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
            }, },
        ],
};
exports.psyhive = {
    PARENT: [exports.genericTank],
    LABEL: 'Director',
  TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
  
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: true,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: true,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'
    ],
    //CONTROLLERS: ['nearestDifferentMaster'],
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        FOV: base.FOV * 1.1,
    },
    MAX_CHILDREN: 5,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [6, 12, 1.2, 8, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
        },
    }, ],
};
exports.twinhive = {
    PARENT: [exports.genericTank],
    LABEL: 'Twin',
  TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
  
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: true,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: true,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'
    ],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [20, 8, 1, 0, 5.5, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
            TYPE: exports.bullet,
        },
    }, { 
        POSITION: [20, 8, 1, 0, -5.5, 0, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
            TYPE: exports.bullet,
        },
    }, ],
};
exports.hivemind = {
PARENT: [exports.genericTank],
LABEL: 'Hive Mind',
    GUNS: [ /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
        POSITION: [1, 10, 1, 0, 0, 180, 0, ],
        PROPERTIES: {AUTOFIRE: true,
             SHOOT_SETTINGS: combineStats([g.basic, g.bighive]),
            TYPE: [exports.basicminionhive, {
              SIZE: 100
            }],

                      MAX_CHILDREN: 2,
        },
  }, {
      POSITION: [18, 8, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
            LABEL: '', // def
            STAT_CALCULATOR: 0, // def
            WAIT_TO_CYCLE: false, // def
            AUTOFIRE: false, // def
            SYNCS_SKILLS: false, // def         
            MAX_CHILDREN: 0, // def  
            ALT_FIRE: false, // def 
            NEGATIVE_RECOIL: false, // def
        },
    },],
};exports.madman = {
PARENT: [exports.genericTank],
LABEL: 'Madman',
    GUNS: [ /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
        POSITION: [1, 10, 1, 0, 0, 180, 0, ],
        PROPERTIES: {AUTOFIRE: true,
             SHOOT_SETTINGS: combineStats([g.basic, g.biggerhive]),
            TYPE: exports.basicminionhive, 

                      MAX_CHILDREN: 2,
        },
  }, {
      POSITION: [18, 8, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
            LABEL: '', // def
            STAT_CALCULATOR: 0, // def
            WAIT_TO_CYCLE: false, // def
            AUTOFIRE: false, // def
            SYNCS_SKILLS: false, // def         
            MAX_CHILDREN: 0, // def  
            ALT_FIRE: false, // def 
            NEGATIVE_RECOIL: false, // def
        },
    },],
};
exports.megamind = {
PARENT: [exports.genericTank],
LABEL: 'Mega-Mind',
    GUNS: [ /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
        POSITION: [1, 10, 1, 0, 0, 180, 0, ],
        PROPERTIES: {AUTOFIRE: true,
             SHOOT_SETTINGS: combineStats([g.basic, g.bighive]),
            TYPE: exports.basicminionhive, 

                      MAX_CHILDREN: 4,
        },
  }, {
      POSITION: [18, 8, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
            LABEL: '', // def
            STAT_CALCULATOR: 0, // def
            WAIT_TO_CYCLE: false, // def
            AUTOFIRE: false, // def
            SYNCS_SKILLS: false, // def         
            MAX_CHILDREN: 0, // def  
            ALT_FIRE: false, // def 
            NEGATIVE_RECOIL: false, // def
        },
    },],
};
exports.automind = {
PARENT: [exports.genericTank],
LABEL: 'Auto-Mind',
    GUNS: [ /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
        POSITION: [1, 10, 1, 0, 0, 180, 0, ],
        PROPERTIES: {AUTOFIRE: true,
             SHOOT_SETTINGS: combineStats([g.basic, g.bighive]),
            TYPE: [exports.automindminion, {
              SIZE: 100
            }],

                      MAX_CHILDREN: 2,
        },
  }, {
      POSITION: [18, 8, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
            LABEL: '', // def
            STAT_CALCULATOR: 0, // def
            WAIT_TO_CYCLE: false, // def
            AUTOFIRE: false, // def
            SYNCS_SKILLS: false, // def         
            MAX_CHILDREN: 0, // def  
            ALT_FIRE: false, // def 
            NEGATIVE_RECOIL: false, // def
        },
    },],
   TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
               
                POSITION: [  11,     0,      0,     0,    360,   0, ],  
                    TYPE: [exports.genericTank]
                    }, {
                POSITION: [  11,     0,      0,       0,    360,   1, ],  
                    TYPE: [exports.auto3gun, { INDEPENDENT: true,}]
                    },
            ],
};
exports.machhivemind = {
PARENT: [exports.genericTank],
LABEL: 'Mach-Mind',
    GUNS: [ /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
        POSITION: [1, 10, 1, 0, 0, 180, 0, ],
        PROPERTIES: {AUTOFIRE: true,
             SHOOT_SETTINGS: combineStats([g.basic, g.bighive]),
            TYPE: [exports.machhive, {
              SIZE: 100
            }],

                      MAX_CHILDREN: 2,
        },
  }, {
     
            POSITION: [    12,     10,     1.4,     8,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
            }, },
        ],
};
exports.psycho = {
PARENT: [exports.genericTank],
LABEL: 'Psycosis',
    GUNS: [ /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
        POSITION: [1, 10, 1, 0, 0, 180, 0, ],
        PROPERTIES: {AUTOFIRE: true,
             SHOOT_SETTINGS: combineStats([g.basic, g.bighive]),
            TYPE: exports.psyhive, 

                      MAX_CHILDREN: 2,
        },
  }, {
    
        POSITION: [6, 12, 1.2, 8, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            MAX_CHILDREN: 5,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
        },
    }, ],
};
exports.twinmind = {
PARENT: [exports.genericTank],
LABEL: 'Twin-Mind',
    GUNS: [ /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
        POSITION: [1, 10, 1, 0, 0, 180, 0, ],
        PROPERTIES: {AUTOFIRE: true,
             SHOOT_SETTINGS: combineStats([g.basic, g.bighive]),
            TYPE: exports.twinhive, 

                      MAX_CHILDREN: 2,
        },
  },  {
        POSITION: [20, 8, 1, 0, 5.5, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
            TYPE: exports.bullet,
        },
    }, { 
        POSITION: [20, 8, 1, 0, -5.5, 0, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
            TYPE: exports.bullet,
        },
    }, ],
};
exports.hybridbasic = makeHybrid(exports.basic, 'Basic-brid');
exports.heavy2 = {
    PARENT: [exports.genericTank],
    LABEL: 'Heavy-2',
    DANGER: 6,
    FACING_TYPE: 'autospin',
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [11, 8, 0, 0, 190, 0],
        TYPE: exports.heavy3gun,
    }, {
        POSITION: [11, 8, 0, 180, 190, 0],
        TYPE: exports.heavy3gun,
    }, ],
};
exports.heavy2a = makeAuto(exports.heavy2, 'Auto-Heavy-2', { type: exports.heavy3gun, });
exports.rapid2 = {
    PARENT: [exports.genericTank],
    LABEL: 'Rapid-2',
    DANGER: 6,
    FACING_TYPE: 'autospin',
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [11, 8, 0, 0, 190, 0],
        TYPE: exports.auto4gun,
    }, {
        POSITION: [11, 8, 0, 180, 190, 0],
        TYPE: exports.auto4gun,
    }, ],
};
exports.auto2auto2 = makeAuto(exports.auto2, 'Auto-Auto-2',);
exports.auto3auto3 = makeAuto(exports.auto3, 'Auto-Auto-3',);
exports.auto5auto5 = makeAuto(exports.auto5, 'Auto-Auto-5',);
exports.rapid2a = makeAuto(exports.rapid2, 'Auto-Rapid-2', { type: exports.auto4gun, });
exports.sniper2 = {
    PARENT: [exports.genericTank],
    LABEL: 'Sniper-2',
    DANGER: 6,
    FACING_TYPE: 'autospin',
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [11, 8, 0, 0, 190, 0],
        TYPE: exports.sniper3gun,
    }, {
        POSITION: [11, 8, 0, 180, 190, 0],
        TYPE: exports.sniper3gun,
    }, ],
};
exports.sniper4 = {
    PARENT: [exports.genericTank],
    LABEL: 'Sniper-4',
    DANGER: 7,
  BODY: {
    SPEED: 2.3,
  },
    FACING_TYPE: 'autospin',
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        
        POSITION: [7, 8, 0, 45, 360, 1],
        TYPE: exports.sniper3gun,
    },  {
        POSITION: [7, 8, 0, 135, 360, 1],
        TYPE: exports.sniper3gun,
    }, {
        POSITION: [7, 8, 0, -135, 360, 1],
        TYPE: exports.sniper3gun,
    }, {
        POSITION: [7, 8, 0, -45, 360, 1],
        TYPE: exports.sniper3gun,
    }, ],
};
exports.swivel2 = {
    PARENT: [exports.genericTank],
    LABEL: 'Swivel-2',
    DANGER: 6,
    FACING_TYPE: 'autospin',
    TURRETS: [{
        POSITION: [9.5, 6.5, 0, 0, 360, 1],
        TYPE: exports.auto2gun
    }, {
        POSITION: [9.5, 6.5, 0, 180, 360, 1],
        TYPE: exports.auto2gun
    }]
};
exports.axis4 = {
    PARENT: [exports.genericTank],
    LABEL: 'Swivel-4',
    DANGER: 6,
    FACING_TYPE: 'autospin',
    TURRETS: [{
        POSITION: [9.5, 6.5, 0, 0, 360, 1],
        TYPE: exports.auto2gun
    }, {
        POSITION: [9.5, 6.5, 0, 180, 360, 1],
        TYPE: exports.auto2gun
    }, {
       POSITION: [9.5, 6.5, 0, 90, 360, 1],
        TYPE: exports.auto2gun
    }, {
        POSITION: [9.5, 6.5, 0, -90, 360, 1],
        TYPE: exports.auto2gun
    }]
};
exports.stak6 = {
    PARENT: [exports.genericTank],
    LABEL: 'Stack-6',
    DANGER: 6,
    FACING_TYPE: 'autospin',
    TURRETS: [{
        POSITION: [7, 6.5, 0, 0, 360, 1],
        TYPE: exports.auto2gun
    }, {
        POSITION: [7, 6.5, 0, 180, 360, 1],
        TYPE: exports.auto2gun
    }, {
       POSITION: [7, 6.5, 0, 90, 360, 1],
        TYPE: exports.auto2gun
    }, {
        POSITION: [7, 6.5, 0, -90, 360, 1],
        TYPE: exports.auto2gun
    }, {
        POSITION: [11, 8, 0, 0, 190, 0],
        TYPE: exports.auto2gun,
    }, {
        POSITION: [11, 8, 0, 180, 190, 0],
        TYPE: exports.auto2gun,
    },]
};
exports.override = {
    PARENT: [exports.genericTank],
    LABEL: 'Override',
    MAX_CHILDREN: 12,DANGER: 7,
    STAT_NAMES: statnames.drone,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        SPEED: base.SPEED * 0.9,
        FOV: base.FOV * 1.1,
    },
    GUNS: [{
        POSITION: [18, 10, -1.4, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.droneoverride, 
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        }
    }]
};
exports.mothershipmini = {
                PARENT: [exports.genericTank],
                LABEL: 'Mothership',
            
  
  STAT_NAMES: statnames.drone,
 
 
 
    
    
                DANGER: 50,
          MAX_CHILDREN: 32,
                                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  12,     4,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES:{ AUTOFIRE: true,
                            SHOOT_SETTINGS: combineStats([g.drone, g.over2]),
                            TYPE: exports.drone,
                                    MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [  12,     4,      1,      0,      0,      22.5,      0.1,   ], 
                        PROPERTIES: { AUTOFIRE: true,
                            SHOOT_SETTINGS: combineStats([g.drone, g.over2]),
                            TYPE: exports.adrone,
                                     MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [  12,     4,      1,      0,      0,      45,      0.2,   ], 
                        PROPERTIES: { AUTOFIRE: true,
                            SHOOT_SETTINGS: combineStats([g.drone, g.over2]),
                            TYPE: exports.drone,
                                     MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [  12,     4,      1,      0,      0,      67.5,      0.3,   ], 
                        PROPERTIES: { AUTOFIRE: true,
                            SHOOT_SETTINGS: combineStats([g.drone, g.over2]),
                            TYPE: exports.adrone,
                                     MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [  12,     4,      1,      0,      0,      90,         0.4,   ], 
                        PROPERTIES: { AUTOFIRE: true,
                            SHOOT_SETTINGS: combineStats([g.drone, g.over2]),
                            TYPE: exports.drone,
                                     MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [  12,     4,      1,      0,      0,      112.5,      0.5,   ], 
                        PROPERTIES: { AUTOFIRE: true,
                            SHOOT_SETTINGS: combineStats([g.drone, g.over2]),
                            TYPE: exports.adrone,
                                     MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [  12,     4,      1,      0,      0,      135,      0.6,   ], 
                        PROPERTIES: { AUTOFIRE: true,
                            SHOOT_SETTINGS: combineStats([g.drone, g.over2]),
                            TYPE: exports.drone,
                                     MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [  12,     4,      1,      0,      0,      157.5,      0.7,   ], 
                        PROPERTIES: { AUTOFIRE: true,
                            SHOOT_SETTINGS: combineStats([g.drone, g.over2]),
                            TYPE: exports.adrone,
                                     MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [  12,     4,      1,      0,      0,      180,         0.8,   ], 
                        PROPERTIES: { AUTOFIRE: true,
                            SHOOT_SETTINGS: combineStats([g.drone, g.over2]),
                            TYPE: exports.drone,
                                     MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [  12,     4,      1,      0,      0,      202.5,      0.9,   ], 
                        PROPERTIES: { AUTOFIRE: true,
                            SHOOT_SETTINGS: combineStats([g.drone, g.over2]),
                            TYPE: exports.adrone,
                                     MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [  12,     4,      1,      0,      0,      225,      1,   ], 
                        PROPERTIES: { AUTOFIRE: true,
                            SHOOT_SETTINGS: combineStats([g.drone, g.over2]),
                            TYPE: exports.drone,
                                     MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [  12,     4,      1,      0,      0,      247.5,      1.1,   ], 
                        PROPERTIES: { AUTOFIRE: true,
                            SHOOT_SETTINGS: combineStats([g.drone, g.over2]),
                            TYPE: exports.adrone,
                                     MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [  12,     4,      1,      0,      0,      270,         1.2,   ], 
                        PROPERTIES: { AUTOFIRE: true,
                            SHOOT_SETTINGS: combineStats([g.drone, g.over2]),
                            TYPE: exports.drone,
                                     MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [  12,     4,      1,      0,      0,      292.5,      1.3,   ], 
                        PROPERTIES: { AUTOFIRE: true,
                            SHOOT_SETTINGS: combineStats([g.drone, g.over2]),
                            TYPE: exports.adrone,
                                     MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [  12,     4,      1,      0,      0,      315,      1.4,   ], 
                        PROPERTIES: { AUTOFIRE: true,
                            SHOOT_SETTINGS: combineStats([g.drone, g.over2]),
                            TYPE: exports.drone,
                                     MAX_CHILDREN: 2,
                        }, }, {
                    POSITION: [  12,     4,      1,      0,      0,      337.5,      1.5,   ], 
                        PROPERTIES: { AUTOFIRE: true,
                            SHOOT_SETTINGS: combineStats([g.drone, g.over2]),
                            TYPE: exports.adrone,
                                     MAX_CHILDREN: 2,
                        }, },
                  
                          ],
  
            };
exports.satelite = {
PARENT: [exports.genericTank],
DANGER: 7,
LABEL: 'Satelite',
GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [17, 10, 1.8, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
    	AUTOFIRE: true,
MAX_CHILDREN: 2,
            TYPE: exports.drone,
        },
    }, {
 POSITION: [17, 10, 1.8, 0, 0, 180, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
    	AUTOFIRE: true,
MAX_CHILDREN: 2,
            TYPE: exports.drone,
        },
    }, {
        POSITION: [17, 10, 1.8, 0, 0, 90, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
    	AUTOFIRE: true,
MAX_CHILDREN: 2,
            TYPE: exports.drone,
        },
    }, {
        POSITION: [17, 10, 1.8, 0, 0, -90, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
    	AUTOFIRE: true,
MAX_CHILDREN: 2,
            TYPE: exports.drone,
        },
    }, {
 POSITION: [17, 10, 1.8, 0, 0, 45, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
    	AUTOFIRE: true,
MAX_CHILDREN: 2,
            TYPE: exports.drone,
        },
    }, {
 POSITION: [17, 10, 1.8, 0, 0, -45, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
    	AUTOFIRE: true,
MAX_CHILDREN: 2,
            TYPE: exports.drone,
        },
    }, {
 POSITION: [17, 10, 1.8, 0, 0, 135, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
    	AUTOFIRE: true,
MAX_CHILDREN: 2,
            TYPE: exports.drone,
        },
    },{
 POSITION: [17, 10, 1.8, 0, 0, -135, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
    	AUTOFIRE: true,
MAX_CHILDREN: 2,
            TYPE: exports.drone,
        },
    },],
};
exports.overworker = {
    PARENT: [exports.genericTank],
    LABEL: 'Overworker',
    DANGER: 7,
    STAT_NAMES: statnames.drone,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.1,
    },
    MAX_CHILDREN: 8,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [6, 12, 1.2, 8, 0, 90, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.autodrone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, {
        POSITION: [6, 12, 1.2, 8, 0, 180, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.autodrone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, {
        POSITION: [6, 12, 1.2, 8, 0, 270, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.autodrone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, {
        POSITION: [6, 12, 1.2, 8, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.autodrone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, ],
   TURRETS: [{
        /*********  SIZE     X       Y     ANGLE    ARC */
        POSITION: [8, 0, 0, 0, 360, 1, ],
        TYPE: exports.overdrivesquare, 
    }, ],
};
exports.spaceship = {
    PARENT: [exports.genericTank],
    LABEL: 'Spaceship',
    DANGER: 7,
    STAT_NAMES: statnames.drone,
    SHAPE: 8,
    SIZE: 28,
  
    MAX_CHILDREN: 32,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [6, 7, 1.2, 8, 0, 90, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, {
        POSITION: [6, 7, 1.2, 8, 0, 180, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, {
        POSITION: [6, 7, 1.2, 8, 0, 270, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, {
        POSITION: [6, 7, 1.2, 8, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, {
        POSITION: [6, 7, 1.2, 8, 0, 45, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, {
        POSITION: [6, 7, 1.2, 8, 0, 135, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, {
        POSITION: [6, 7, 1.2, 8, 0, -45, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, {
        POSITION: [6, 7, 1.2, 8, 0, -135, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, ],
};
exports.spaceshiplite = {
    PARENT: [exports.genericTank],
    LABEL: 'Spaceship Lite',
    DANGER: 7,
    STAT_NAMES: statnames.drone,
    SHAPE: 6,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.1,
        HEALTH: base.HEALTH * 1.2,
        RELOAD: base.RELOAD * 9,
    },
  
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [6, 7, 1.2, 8, 0, 0, 0.123, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            MAX_CHILDREN: 2,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, {
        POSITION: [6, 7, 1.2, 8, 0, 60, 0.234, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.adrone,
            AUTOFIRE: true,
            MAX_CHILDREN: 2,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, {
        POSITION: [6, 7, 1.2, 8, 0, 120, 0.345, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            MAX_CHILDREN: 2,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, {
        POSITION: [6, 7, 1.2, 8, 0, -60, 0.456, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.adrone,
            AUTOFIRE: true,
            MAX_CHILDREN: 2,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, {
        POSITION: [6, 7, 1.2, 8, 0, -120, 0.567, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            MAX_CHILDREN: 2,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, {
        POSITION: [6, 7, 1.2, 8, 0, 180, 0.678, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.adrone,
            AUTOFIRE: true,
            MAX_CHILDREN: 2,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, ],
};
exports.PK1 = {
    PARENT: [exports.genericTank],
    LABEL: 'PK-1',
    SHAPE: 5,
    COLOR: 14,
    SIZE: 32,
   
    FACING_TYPE: 'autospin',
    GUNS: [{
        POSITION: [3, 8.5, 1, 12, 0, 36, 0]
    }, {
        POSITION: [2.25, 11, 1.01, 15.2, 0, 36, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory]),
            TYPE: exports.minion,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            MAX_CHILDREN: 1
        }
    }, {
        POSITION: [5.5, 10.2, 1, 7.57, 0, 36, 0]
    }, {
        POSITION: [3, 8.5, 1, 12, 0, 108, 0]
    }, {
        POSITION: [2.25, 11, 1.01, 15.2, 0, 108, 0.2],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory]),
            TYPE: exports.minion,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            MAX_CHILDREN: 1
        }
    }, {
        POSITION: [5.5, 10.2, 1, 7.57, 0, 108, 0]
    }, {
        POSITION: [3, 8.5, 1, 12, 0, 180, 0]
    }, {
        POSITION: [2.25, 11, 1.01, 15.2, 0, 180, 0.4],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory]),
            TYPE: exports.minion,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            MAX_CHILDREN: 1
        }
    }, {
        POSITION: [5.5, 10.2, 1, 7.57, 0, 180, 0]
    }, {
        POSITION: [3, 8.5, 1, 12, 0, -108, 0]
    }, {
        POSITION: [2.25, 11, 1.01, 15.2, 0, -108, 0.6],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory]),
            TYPE: exports.minion,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            MAX_CHILDREN: 1
        }
    }, {
        POSITION: [5.5, 10.2, 1, 7.57, 0, -108, 0]
    }, {
        POSITION: [3, 8.5, 1, 12, 0, -36, 0]
    }, {
        POSITION: [2.25, 11, 1.01, 15.2, 0, -36, 0.8],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory]),
            TYPE: exports.minion,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            MAX_CHILDREN: 1
        }
    }, {
        POSITION: [5.5, 10.2, 1, 7.57, 0, -36, 0]
    }],
    TURRETS: [{
        POSITION: [9.5, 0, 0, 0, 360, 1],
        TYPE: exports.puntgun
    }]
};
exports.pkminion = {
    PARENT: [exports.minion],
    LABEL: 'Mega Minion',
    SHAPE: 5,
    COLOR: 14,
    SIZE: 32,
   
    FACING_TYPE: 'autospin',
    GUNS: [{
        POSITION: [3, 8.5, 1, 12, 0, 36, 0]
    }, {
        POSITION: [2.25, 11, 1.01, 15.2, 0, 36, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory]),
            TYPE: exports.minion,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            MAX_CHILDREN: 1
        }
    }, {
        POSITION: [5.5, 10.2, 1, 7.57, 0, 36, 0]
    }, {
        POSITION: [3, 8.5, 1, 12, 0, 108, 0]
    }, {
        POSITION: [2.25, 11, 1.01, 15.2, 0, 108, 0.2],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory]),
            TYPE: exports.minion,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            MAX_CHILDREN: 1
        }
    }, {
        POSITION: [5.5, 10.2, 1, 7.57, 0, 108, 0]
    }, {
        POSITION: [3, 8.5, 1, 12, 0, 180, 0]
    }, {
        POSITION: [2.25, 11, 1.01, 15.2, 0, 180, 0.4],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory]),
            TYPE: exports.minion,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            MAX_CHILDREN: 1
        }
    }, {
        POSITION: [5.5, 10.2, 1, 7.57, 0, 180, 0]
    }, {
        POSITION: [3, 8.5, 1, 12, 0, -108, 0]
    }, {
        POSITION: [2.25, 11, 1.01, 15.2, 0, -108, 0.6],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory]),
            TYPE: exports.minion,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            MAX_CHILDREN: 1
        }
    }, {
        POSITION: [5.5, 10.2, 1, 7.57, 0, -108, 0]
    }, {
        POSITION: [3, 8.5, 1, 12, 0, -36, 0]
    }, {
        POSITION: [2.25, 11, 1.01, 15.2, 0, -36, 0.8],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory]),
            TYPE: exports.minion,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            MAX_CHILDREN: 1
        }
    }, {
        POSITION: [5.5, 10.2, 1, 7.57, 0, -36, 0]
    }],
    TURRETS: [{
        POSITION: [9.5, 0, 0, 0, 360, 1],
        TYPE: exports.pelter
    }]
};
exports.PK2 = {
    PARENT: [exports.genericTank],
    LABEL: 'PK-2',
    SHAPE: 5,
    COLOR: 14,
    SIZE: 45,
    FACING_TYPE: 'autospin',
    GUNS: [{
        POSITION: [3, 8.5, 1, 12, 0, 36, 0]
    }, {
        POSITION: [2.25, 11, 1.01, 15.2, 0, 36, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory]),
            TYPE: exports.minion,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            MAX_CHILDREN: 1
        }
    }, {
        POSITION: [5.5, 10.2, 1, 7.57, 0, 36, 0]
    }, {
        POSITION: [3, 8.5, 1, 12, 0, 108, 0]
    }, {
        POSITION: [2.25, 11, 1.01, 15.2, 0, 108, 0.2],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory]),
            TYPE: exports.minion,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            MAX_CHILDREN: 1
        }
    }, {
        POSITION: [5.5, 10.2, 1, 7.57, 0, 108, 0]
    }, {
        POSITION: [3, 8.5, 1, 12, 0, 180, 0]
    }, {
        POSITION: [2.25, 11, 1.01, 15.2, 0, 180, 0.4],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory]),
            TYPE: exports.minion,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            MAX_CHILDREN: 1
        }
    }, {
        POSITION: [5.5, 10.2, 1, 7.57, 0, 180, 0]
    }, {
        POSITION: [3, 8.5, 1, 12, 0, -108, 0]
    }, {
        POSITION: [2.25, 11, 1.01, 15.2, 0, -108, 0.6],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory]),
            TYPE: exports.minion,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            MAX_CHILDREN: 1
        }
    }, {
        POSITION: [5.5, 10.2, 1, 7.57, 0, -108, 0]
    }, {
        POSITION: [3, 8.5, 1, 12, 0, -36, 0]
    }, {
        POSITION: [2.25, 11, 1.01, 15.2, 0, -36, 0.8],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory]),
            TYPE: exports.minion,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            MAX_CHILDREN: 1
        }
    }, {
        POSITION: [5.5, 10.2, 1, 7.57, 0, -36, 0]
    }],
    TURRETS: [{
        POSITION: [9.5, 0, 0, 0, 360, 1],
        TYPE: exports.punter
    }, {
 POSITION: [3, 9, 0, 36, 360, 1],
        TYPE: [exports.auto3gun, {
            COLOR: 14,
        }],
}, {
 POSITION: [3, 9, 0, 108, 360, 1],
 TYPE: [exports.auto3gun, {
            COLOR: 14,
        }],
}, {
 POSITION: [3, 9, 0, 180, 360, 1],
 TYPE: [exports.auto3gun, {
            COLOR: 14,
        }],
}, {
 POSITION: [3, 9, 0, -108, 360, 1],
 TYPE: [exports.auto3gun, {
            COLOR: 14,
        }],
}, {
 POSITION: [3, 9, 0, -36, 360, 1],
 TYPE: [exports.auto3gun, {
            COLOR: 14,
        }],
}]
};
exports.PK3 = {
    PARENT: [exports.genericTank],
    LABEL: 'PK-3',
    SHAPE: 5,
    COLOR: 14,
    SIZE: 59,
    FACING_TYPE: 'autospin',
    GUNS: [{
        POSITION: [3, 8.5, 1, 12, 0, 36, 0]
    }, {
        POSITION: [2.25, 11, 1.01, 15.2, 0, 36, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory]),
            TYPE: exports.pkminion,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            MAX_CHILDREN: 1
        }
    }, {
        POSITION: [5.5, 10.2, 1, 7.57, 0, 36, 0]
    }, {
        POSITION: [3, 8.5, 1, 12, 0, 108, 0]
    }, {
        POSITION: [2.25, 11, 1.01, 15.2, 0, 108, 0.2],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory]),
            TYPE: exports.pkminion,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            MAX_CHILDREN: 1
        }
    }, {
        POSITION: [5.5, 10.2, 1, 7.57, 0, 108, 0]
    }, {
        POSITION: [3, 8.5, 1, 12, 0, 180, 0]
    }, {
        POSITION: [2.25, 11, 1.01, 15.2, 0, 180, 0.4],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory]),
            TYPE: exports.pkminion,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            MAX_CHILDREN: 1
        }
    }, {
        POSITION: [5.5, 10.2, 1, 7.57, 0, 180, 0]
    }, {
        POSITION: [3, 8.5, 1, 12, 0, -108, 0]
    }, {
        POSITION: [2.25, 11, 1.01, 15.2, 0, -108, 0.6],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory]),
            TYPE: exports.pkminion,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            MAX_CHILDREN: 1
        }
    }, {
        POSITION: [5.5, 10.2, 1, 7.57, 0, -108, 0]
    }, {
        POSITION: [3, 8.5, 1, 12, 0, -36, 0]
    }, {
        POSITION: [2.25, 11, 1.01, 15.2, 0, -36, 0.8],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory]),
            TYPE: exports.pkminion,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            MAX_CHILDREN: 1
        }
    }, {
        POSITION: [5.5, 10.2, 1, 7.57, 0, -36, 0]
    }],
    TURRETS: [{
        POSITION: [9.5, 0, 0, 0, 360, 1],
        TYPE: exports.vulcan
    }, {
 POSITION: [3, 9, 0, 36, 360, 1],
        TYPE: [exports.sniper3gun, {
            COLOR: 14,
        }],
}, {
 POSITION: [3, 9, 0, 108, 360, 1],
 TYPE: [exports.sniper3gun, {
            COLOR: 14,
        }],
}, {
 POSITION: [3, 9, 0, 180, 360, 1],
 TYPE: [exports.sniper3gun, {
            COLOR: 14,
        }],
}, {
 POSITION: [3, 9, 0, -108, 360, 1],
 TYPE: [exports.sniper3gun, {
            COLOR: 14,
        }],
}, {
 POSITION: [3, 9, 0, -36, 360, 1],
 TYPE: [exports.sniper3gun, {
            COLOR: 14,
        }],
}]
};
exports.PK4 = {
    PARENT: [exports.genericTank],
    LABEL: 'PK-4',
    SHAPE: 5,
    COLOR: 14,
    SIZE: 75,
    FACING_TYPE: 'autospin',
  BODY: {
    SPEED: 1,
  },
    GUNS: [{
        POSITION: [3, 8.5, 1, 12, 0, 36, 0]
    }, {
        POSITION: [2.25, 11, 1.01, 15.2, 0, 36, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory]),
            TYPE: exports.pkminion,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            MAX_CHILDREN: 1
        }
    }, {
        POSITION: [5.5, 10.2, 1, 7.57, 0, 36, 0]
    }, {
        POSITION: [3, 8.5, 1, 12, 0, 108, 0]
    }, {
        POSITION: [2.25, 11, 1.01, 15.2, 0, 108, 0.2],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory]),
            TYPE: exports.pkminion,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            MAX_CHILDREN: 1
        }
    }, {
        POSITION: [5.5, 10.2, 1, 7.57, 0, 108, 0]
    }, {
        POSITION: [3, 8.5, 1, 12, 0, 180, 0]
    }, {
        POSITION: [2.25, 11, 1.01, 15.2, 0, 180, 0.4],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory]),
            TYPE: exports.pkminion,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            MAX_CHILDREN: 1
        }
    }, {
        POSITION: [5.5, 10.2, 1, 7.57, 0, 180, 0]
    }, {
        POSITION: [3, 8.5, 1, 12, 0, -108, 0]
    }, {
        POSITION: [2.25, 11, 1.01, 15.2, 0, -108, 0.6],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory]),
            TYPE: exports.pkminion,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            MAX_CHILDREN: 1
        }
    }, {
        POSITION: [5.5, 10.2, 1, 7.57, 0, -108, 0]
    }, {
        POSITION: [3, 8.5, 1, 12, 0, -36, 0]
    }, {
        POSITION: [2.25, 11, 1.01, 15.2, 0, -36, 0.8],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory]),
            TYPE: exports.pkminion,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            MAX_CHILDREN: 1
        }
    }, {
        POSITION: [5.5, 10.2, 1, 7.57, 0, -36, 0]
    }],
    TURRETS: [{
        POSITION: [9.5, 0, 0, 0, 360, 1],
        TYPE: exports.trianglepuntgun
    }, {
 POSITION: [3, 9, 0, 36, 360, 1],
        TYPE: [exports.sniper3gun, {
            COLOR: 14,
        }],
}, {
 POSITION: [3, 9, 0, 108, 360, 1],
 TYPE: [exports.sniper3gun, {
            COLOR: 14,
        }],
}, {
 POSITION: [3, 9, 0, 180, 360, 1],
 TYPE: [exports.sniper3gun, {
            COLOR: 14,
        }],
}, {
 POSITION: [3, 9, 0, -108, 360, 1],
 TYPE: [exports.sniper3gun, {
            COLOR: 14,
        }],
}, {
 POSITION: [3, 9, 0, -36, 360, 1],
 TYPE: [exports.sniper3gun, {
            COLOR: 14,
        }],
}, {
 POSITION: [3, 9, 0, 0, 360, 1],
        TYPE: [exports.sniper3gun, {
            COLOR: 14,
        }],
}, {
 POSITION: [3, 9, 0, 72, 360, 1],
 TYPE: [exports.sniper3gun, {
            COLOR: 14,
        }],
}, {
 POSITION: [3, 9, 0, 144, 360, 1],
 TYPE: [exports.sniper3gun, {
            COLOR: 14,
        }],
}, {
 POSITION: [3, 9, 0, 216, 360, 1],
 TYPE: [exports.sniper3gun, {
            COLOR: 14,
        }],
}, {
 POSITION: [3, 9, 0, 288, 360, 1],
 TYPE: [exports.sniper3gun, {
            COLOR: 14,
        }],
}]
};
exports.PK5 = {
    PARENT: [exports.genericTank],
    LABEL: 'PK-5',
    SHAPE: 5,
    COLOR: 14,
    SIZE: 100,
    FACING_TYPE: 'autospin',
  BODY: {
    SPEED: 0.5,
  },
    GUNS: [{
        POSITION: [3, 8.5, 1, 12, 0, 36, 0]
    }, {
        POSITION: [2.25, 11, 1.01, 15.2, 0, 36, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory]),
            TYPE: exports.pkminion,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            MAX_CHILDREN: 1
        }
    }, {
        POSITION: [5.5, 10.2, 1, 7.57, 0, 36, 0]
    }, {
        POSITION: [3, 8.5, 1, 12, 0, 108, 0]
    }, {
        POSITION: [2.25, 11, 1.01, 15.2, 0, 108, 0.2],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory]),
            TYPE: exports.pkminion,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            MAX_CHILDREN: 1
        }
    }, {
        POSITION: [5.5, 10.2, 1, 7.57, 0, 108, 0]
    }, {
        POSITION: [3, 8.5, 1, 12, 0, 180, 0]
    }, {
        POSITION: [2.25, 11, 1.01, 15.2, 0, 180, 0.4],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory]),
            TYPE: exports.pkminion,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            MAX_CHILDREN: 1
        }
    }, {
        POSITION: [5.5, 10.2, 1, 7.57, 0, 180, 0]
    }, {
        POSITION: [3, 8.5, 1, 12, 0, -108, 0]
    }, {
        POSITION: [2.25, 11, 1.01, 15.2, 0, -108, 0.6],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory]),
            TYPE: exports.pkminion,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            MAX_CHILDREN: 1
        }
    }, {
        POSITION: [5.5, 10.2, 1, 7.57, 0, -108, 0]
    }, {
        POSITION: [3, 8.5, 1, 12, 0, -36, 0]
    }, {
        POSITION: [2.25, 11, 1.01, 15.2, 0, -36, 0.8],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory]),
            TYPE: exports.pkminion,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            MAX_CHILDREN: 1
        }
    }, {
        POSITION: [5.5, 10.2, 1, 7.57, 0, -36, 0]
    }],
    TURRETS: [{
        POSITION: [9.5, 0, 0, 0, 360, 1],
        TYPE: exports.mothershipmini
    }, {
 POSITION: [3, 9, 0, 36, 360, 1],
        TYPE: [exports.heavy3gun, {
            COLOR: 14,
        }],
}, {
 POSITION: [3, 9, 0, 108, 360, 1],
 TYPE: [exports.heavy3gun, {
            COLOR: 14,
        }],
}, {
 POSITION: [3, 9, 0, 180, 360, 1],
 TYPE: [exports.heavy3gun, {
            COLOR: 14,
        }],
}, {
 POSITION: [3, 9, 0, -108, 360, 1],
 TYPE: [exports.heavy3gun, {
            COLOR: 14,
        }],
}, {
 POSITION: [3, 9, 0, -36, 360, 1],
 TYPE: [exports.heavy3gun, {
            COLOR: 14,
        }],
}, {
 POSITION: [3, 9, 0, 0, 360, 1],
        TYPE: [exports.heavy3gun, {
            COLOR: 14,
        }],
}, {
 POSITION: [3, 9, 0, 72, 360, 1],
 TYPE: [exports.heavy3gun, {
            COLOR: 14,
        }],
}, {
 POSITION: [3, 9, 0, 144, 360, 1],
 TYPE: [exports.heavy3gun, {
            COLOR: 14,
        }],
}, {
 POSITION: [3, 9, 0, 216, 360, 1],
 TYPE: [exports.heavy3gun, {
            COLOR: 14,
        }],
}, {
 POSITION: [3, 9, 0, 288, 360, 1],
 TYPE: [exports.heavy3gun, {
            COLOR: 14,
        }],
}]
};


exports.test3 = {
    PARENT: [exports.genericTank],
    LABEL: 'Spinning dial',
    DANGER: 6,
    FACING_TYPE: 'autospin',
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [11, 7, 0, -90, 360, 0, ],
        TYPE: [exports.machineAutoTurret, {
            COLOR: 16,     CONTROLLERS: ['reversespin'],
        }]
    }, {
              POSITION: [13, 0, 0, 0, 360, 1, ],
        TYPE: [exports.genericTank, {
            COLOR: 16,
        }]
    }, {
              POSITION: [11, 7, 0, 90, 360, 0, ],
        TYPE: [exports.machineAutoTurret, {
            COLOR: 16,     CONTROLLERS: ['reversespin'],
        }]
    }, ],
};
exports.TKminion = {
  PARENT: [exports.minion],
  SHAPE: 3,
  LABEL: 'TK-1',
   COLOR: 2,
    SIZE: 25,
    FACING_TYPE: 'autospin',
  BODY: {
    //SPEED: 0.5,
  },
   TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     8,      0,      0,     190, 0], 
                    TYPE: exports.test3,
                        }, {
                POSITION: [  11,     8,      0,     120,    190, 0], 
                    TYPE: exports.test3,
                        }, {
                POSITION: [  11,     8,      0,     240,    190, 0], 
                    TYPE: exports.test3,
                        }, {
                           POSITION: [  11,     8,      0,      60,     190, 0], 
                    TYPE: exports.sniper3gun,
                        }, {
                POSITION: [  11,     8,      0,     -60,    190, 0], 
                    TYPE: exports.sniper3gun,
                        }, {
                POSITION: [  11,     8,      0,     180,    190, 0], 
                    TYPE: exports.sniper3gun,
                        },
            ],
};
exports.tkfact = {
            PARENT: [exports.genericTank],
            LABEL: '',
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                SPEED: base.SPEED * 0.8,
                ACCELERATION: base.ACCEL * 0.5,
                FOV: 1.1,
            },
            GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  4.5,    10,      1,     10.5,    0,      0,      0,   ], 
                }, {
                POSITION: [   1,     12,      1,      15,     0,      0,      0,   ], 
                PROPERTIES: {          
                    MAX_CHILDREN: 4,
                    SHOOT_SETTINGS: combineStats([g.factory,]),
                    TYPE: exports.TKminion,
                    STAT_CALCULATOR: gunCalcNames.drone,                        
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,  
                }, }, {                        
                    POSITION: [  3.5,    12,      1,      8,      0,      0,      0,   ], 
                }
            ],
        };
exports.TK1 = {
  PARENT: [exports.genericTank],
  SHAPE: 3,
  LABEL: 'TK-1',
   COLOR: 2,
    SIZE: 25,
    FACING_TYPE: 'autospin',
  BODY: {
    //SPEED: 0.5,
  },
   TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     8,      0,      0,     190, 0], 
                    TYPE: exports.test3,
                        }, {
                POSITION: [  11,     8,      0,     120,    190, 0], 
                    TYPE: exports.test3,
                        }, {
                POSITION: [  11,     8,      0,     240,    190, 0], 
                    TYPE: exports.test3,
                        }, {
                           POSITION: [  11,     8,      0,      60,     190, 0], 
                    TYPE: exports.sniper3gun,
                        }, {
                POSITION: [  11,     8,      0,     -60,    190, 0], 
                    TYPE: exports.sniper3gun,
                        }, {
                POSITION: [  11,     8,      0,     180,    190, 0], 
                    TYPE: exports.sniper3gun,
                        },
            ],
};
exports.TK2 = {
  PARENT: [exports.genericTank],
  SHAPE: 3,
  LABEL: 'TK-2 ',
   COLOR: 2,
    SIZE: 25,
    FACING_TYPE: 'autospin',
  BODY: {
    //SPEED: 0.5,
  },
   TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     8,      0,      0,     190, 0], 
                    TYPE: exports.lilfact,
                        }, {
                POSITION: [  11,     8,      0,     120,    190, 0], 
                    TYPE: exports.lilfact,
                        }, {
                POSITION: [  11,     8,      0,     240,    190, 0], 
                    TYPE: exports.lilfact,
                        }, {
                           POSITION: [  11,     8,      0,      60,     190, 0], 
                    TYPE: exports.sniper3gun,
                        }, {
                POSITION: [  11,     8,      0,     -60,    190, 0], 
                    TYPE: exports.sniper3gun,
                        }, {
                POSITION: [  11,     8,      0,     180,    190, 0], 
                    TYPE: exports.sniper3gun,
                        }, {
        POSITION: [9.5, 0, 0, 0, 360, 1],
        TYPE: exports.puntgun
    }
            ],
  
};
exports.TK3 = {
  PARENT: [exports.genericTank],
  SHAPE: 3,
  LABEL: 'TK-3',
   COLOR: 2,
    SIZE: 50,
    FACING_TYPE: 'autospin',
  BODY: {
    //SPEED: 0.5,
    FOV: 1.3,
  },
   TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     8,      0,      0,     190, 0], 
                    TYPE: exports.lilfact,
                        }, {
                POSITION: [  11,     8,      0,     120,    190, 0], 
                    TYPE: exports.lilfact,
                        }, {
                POSITION: [  11,     8,      0,     240,    190, 0], 
                    TYPE: exports.lilfact,
                        }, {
                           POSITION: [  11,     8,      0,      60,     190, 0], 
                    TYPE: exports.sniper3gun,
                        }, {
                POSITION: [  11,     8,      0,     -60,    190, 0], 
                    TYPE: exports.sniper3gun,
                        }, {
                POSITION: [  11,     8,      0,     180,    190, 0], 
                    TYPE: exports.sniper3gun,
                        }, {
                           POSITION: [  7,     8,      0,      60,     360, 1], 
                    TYPE: exports.pelter,
                        }, {
                POSITION: [  7,     8,      0,     -60,    360, 1], 
                    TYPE: exports.pelter,
                        }, {
                POSITION: [  7,     8,      0,     180,    360, 1], 
                    TYPE: exports.pelter,
                        }, {
        POSITION: [9.5, 0, 0, 0, 360, 1],
        TYPE: exports.puntgun
    }
            ],
  
};
exports.TK4 = {
  PARENT: [exports.genericTank],
  SHAPE: 3,
  LABEL: 'TK-4',
   COLOR: 2,
    SIZE: 75,
    FACING_TYPE: 'autospin',
  BODY: {
    //SPEED: 0.5,
    FOV: 1.3,
  },
   TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     8,      0,      0,     190, 0], 
                    TYPE: exports.tkfact,
                        }, {
                POSITION: [  11,     8,      0,     120,    190, 0], 
                    TYPE: exports.tkfact,
                        }, {
                POSITION: [  11,     8,      0,     240,    190, 0], 
                    TYPE: exports.tkfact,
                        }, {
                           POSITION: [  11,     8,      0,      60,     190, 0], 
                    TYPE: exports.sniper3gun,
                        }, {
                POSITION: [  11,     8,      0,     -60,    190, 0], 
                    TYPE: exports.sniper3gun,
                        }, {
                POSITION: [  11,     8,      0,     180,    190, 0], 
                    TYPE: exports.sniper3gun,
                        }, {
                           POSITION: [  7,     8,      0,      60,     360, 1], 
                    TYPE: exports.sniper3gun,
                        }, {
                POSITION: [  7,     8,      0,     -60,    360, 1], 
                    TYPE: exports.sniper3gun,
                        }, {
                POSITION: [  7,     8,      0,     180,    360, 1], 
                    TYPE: exports.sniper3gun,
                        }, {
        POSITION: [9.5, 0, 0, 0, 360, 1],
        TYPE: exports.vulcan
    }
            ],
  
};
exports.TK5 = {
  PARENT: [exports.genericTank],
  SHAPE: 3,
  LABEL: 'TK-5',
   COLOR: 2,
    SIZE: 100,
    FACING_TYPE: 'autospin',
  BODY: {
    SPEED: 0.5,
    FOV: 1.5,
  },
   TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     8,      0,      0,     190, 0], 
                    TYPE: exports.tkfact,
                        }, {
                POSITION: [  11,     8,      0,     120,    190, 0], 
                    TYPE: exports.tkfact,
                        }, {
                POSITION: [  11,     8,      0,     240,    190, 0], 
                    TYPE: exports.tkfact,
                        }, {
                           POSITION: [  11,     8,      0,      60,     190, 0], 
                    TYPE: exports.sniper3gun,
                        }, {
                POSITION: [  11,     8,      0,     -60,    190, 0], 
                    TYPE: exports.sniper3gun,
                        }, {
                POSITION: [  11,     8,      0,     180,    190, 0], 
                    TYPE: exports.sniper3gun,
                        }, {
                           POSITION: [  7,     8,      0,      60,     360, 1], 
                    TYPE: exports.submachine,
                        }, {
                POSITION: [  7,     8,      0,     -60,    360, 1], 
                    TYPE: exports.submachine,
                        }, {
                POSITION: [  7,     8,      0,     180,    360, 1], 
                    TYPE: exports.submachine,
                        }, {
        POSITION: [9.5, 0, 0, 0, 360, 1],
        TYPE: exports.vulcan
    }
            ],
  
};
 exports.medicS = {
    PARENT: [exports.genericTank],
    LABEL: 'Medic',
    BODY: {
        FOV: 0.8
    },
    COLOR: 12,
    SHAPE: [[0.98,0.19],[0.19,0.184],[0.18,1.006],[-0.2,1.006],[-0.2,0.2],[-0.995,0.2],[-0.995,-0.2],[-0.19,-0.205],[-0.205,-1],[0.216,-1.014],[0.2,-0.2],[1.006,-0.2]],
    //CONTROLLERS: ['nearestDifferentMaster'],
};
exports.medic = {
    PARENT: [exports.genericTank],
    LABEL: 'Medic',
  PASSIVE: true,
    SHAPE: 4,
    COLOR: 6,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basicH]),
            TYPE: exports.bullet,
        }, },
            ],
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     0,      0,       0,    360,   1, ],  
                    TYPE: [exports.medicS, { INDEPENDENT: true, COLOR: 12, }]
                    },
            ],
        };
 exports.batteryboss = {
       FACING_TYPE: 'autospin',
            PARENT: [exports.genericTank],
            LABEL: 'Ultimate Battery',
            COLOR: 17,
            SHAPE: 6,
            SIZE: 28,
           // VALUE: 500000,
            BODY: {
                FOV: 1.3,
            },
           
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [   5,    10,      0,      30,    110, 0], 
                    TYPE: exports.batteryTurret,
                        }, {
                POSITION: [   5,    10,      0,      90,    110, 0], 
                    TYPE: exports.batteryTurret,
                        }, {
                POSITION: [   5,    10,      0,     150,    110, 0], 
                    TYPE: exports.batteryTurret,
                        }, {
                POSITION: [   5,    10,      0,     210,    110, 0], 
                    TYPE: exports.batteryTurret,
                        }, {
                POSITION: [   5,    10,      0,     270,    110, 0], 
                    TYPE: exports.batteryTurret,
                        }, {
                POSITION: [   5,    10,      0,     330,    110, 0], 
                    TYPE: exports.batteryTurret,
                        }, {
                POSITION: [   5,    10,      0,      0,    110, 0], 
                    TYPE: exports.batteryTurret,
                        }, {
                POSITION: [   5,    10,      0,      60,    110, 0], 
                    TYPE: exports.batteryTurret,
                        }, {
                POSITION: [   5,    10,      0,     120,    110, 0], 
                    TYPE: exports.batteryTurret,
                        }, {
                POSITION: [   5,    10,      0,     240,    110, 0], 
                    TYPE: exports.batteryTurret,
                        }, {
                POSITION: [   5,    10,      0,     300,    110, 0], 
                    TYPE: exports.batteryTurret,
                        }, {
                POSITION: [   5,    10,      0,     180,    110, 0], 
                    TYPE: exports.batteryTurret,
                        }, {
                POSITION: [   5,    0,      0,     0,    360, 1], 
                    TYPE: exports.batteryTurret,
                        }, 
            ],
        };
exports.tastetherainbow2 = {
    PARENT: [exports.genericTank],
    LABEL: 'Taste The Rainbow',
    DANGER: 7,
    BODY: {
        FOV: 1.3,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [25, 8, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
            TYPE: [exports.bullet, {MOTION_TYPE:'red'} ],
        },
    }, {
        POSITION: [23, 8, 1, 0, 0, 0, 0.2, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
           TYPE: [exports.bullet, {MOTION_TYPE:'orange'} ],
        },
    }, {
        POSITION: [21, 8, 1, 0, 0, 0, 0.4, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
            TYPE: [exports.bullet, {MOTION_TYPE:'yellow'} ],
        },
    }, {
        POSITION: [19, 8, 1, 0, 0, 0, 0.6, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
           TYPE: [exports.bullet, {MOTION_TYPE:'green'} ],
        },
    }, {
        POSITION: [17, 8, 1, 0, 0, 0, 0.8, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
            TYPE: [exports.bullet, {MOTION_TYPE:'blue'} ],
        },
    }, {
        POSITION: [15, 8, 1, 0, 0, 0, 1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
            TYPE: [exports.bullet, {MOTION_TYPE:'purple'} ],
        },
    }, {
       POSITION: [25, 8, 1, 0, 0, 120, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
            TYPE: [exports.bullet, {MOTION_TYPE:'red'} ],
        },
    }, {
        POSITION: [23, 8, 1, 0, 0, 120, 0.2, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
           TYPE: [exports.bullet, {MOTION_TYPE:'orange'} ],
        },
    }, {
        POSITION: [21, 8, 1, 0, 0, 120, 0.4, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
            TYPE: [exports.bullet, {MOTION_TYPE:'yellow'} ],
        },
    }, {
        POSITION: [19, 8, 1, 0, 0, 120, 0.6, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
           TYPE: [exports.bullet, {MOTION_TYPE:'green'} ],
        },
    }, {
        POSITION: [17, 8, 1, 0, 0, 120, 0.8, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
            TYPE: [exports.bullet, {MOTION_TYPE:'blue'} ],
        },
    }, {
        POSITION: [15, 8, 1, 0, 0, 120, 1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
            TYPE: [exports.bullet, {MOTION_TYPE:'purple'} ],
        },
    }, {
       POSITION: [25, 8, 1, 0, 0, 240, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
            TYPE: [exports.bullet, {MOTION_TYPE:'red'} ],
        },
    }, {
        POSITION: [23, 8, 1, 0, 0, 240, 0.2, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
           TYPE: [exports.bullet, {MOTION_TYPE:'orange'} ],
        },
    }, {
        POSITION: [21, 8, 1, 0, 0, 240, 0.4, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
            TYPE: [exports.bullet, {MOTION_TYPE:'yellow'} ],
        },
    }, {
        POSITION: [19, 8, 1, 0, 0, 240, 0.6, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
           TYPE: [exports.bullet, {MOTION_TYPE:'green'} ],
        },
    }, {
        POSITION: [17, 8, 1, 0, 0, 240, 0.8, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
            TYPE: [exports.bullet, {MOTION_TYPE:'blue'} ],
        },
    }, {
        POSITION: [15, 8, 1, 0, 0, 240, 1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
            TYPE: [exports.bullet, {MOTION_TYPE:'purple'} ],
        },
    },],
};
exports.necrobuilder = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Necro Builder',
            STAT_NAMES: statnames.trap,
            BODY: {
                SPEED: base.SPEED * 0.8,
                FOV: base.FOV * 1.15,
            },
            SHAPE: 4,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    12,      1,      0,      0,      0,      0,   ], 
                }, {
                POSITION: [   2,    12,     1.1,     18,     0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                        TYPE: exports.necroblock,
                    }, },
            ],
        };

// UPGRADE PATHS
exports.testbed.UPGRADES_TIER_1 = [
    exports.bt1, 
  exports.bosses,
   exports.xkxbosses,
  exports.dominator2,
   exports.misc,
  exports.basic
];
exports.bosses.UPGRADES_TIER_1 = [
  exports.bosses2,
];
exports.bosses2.UPGRADES_TIER_1 = [
 
];
exports.misc.UPGRADES_TIER_1 = [
 
];
exports.xkxbosses.UPGRADES_TIER_1 = [
  exports.PK1,
  exports.TK1,
  exports.batteryboss,
];
exports.PK1.UPGRADES_TIER_1 = [
  exports.PK2,
];
exports.PK2.UPGRADES_TIER_1 = [
  exports.PK3,
];
exports.PK3.UPGRADES_TIER_1 = [
  exports.PK4,
];
exports.PK4.UPGRADES_TIER_1 = [
  exports.PK5,
];
exports.TK1.UPGRADES_TIER_1 = [
  exports.TK2,
];
exports.TK2.UPGRADES_TIER_1 = [
  exports.TK3,
];
exports.TK3.UPGRADES_TIER_1 = [
  exports.TK4,
];
exports.TK4.UPGRADES_TIER_1 = [
  exports.TK5,
];
exports.bt1.UPGRADES_TIER_1 = [
 exports.bt2,
  exports.master,
  exports.hybridmini,
  exports.medic,
  exports.gunman,
  exports.smgturret,
  exports.tastetherainbow,
   exports.tastetherainbow2,
  exports.necrobuilder
];
exports.bt2.UPGRADES_TIER_1 = [
   exports.poisondronetank,
  exports.RainbowTank,
  exports.coco,
];
exports.dominator2.UPGRADES_TIER_1 = [
  exports.trapDominator2,
  exports.destroyerDominator2,
  exports.gunnerDominator2,
];

exports.basic.UPGRADES_TIER_1 = [exports.twin, exports.sniper, exports.machine, exports.flank, exports.director, exports.pound, exports.trapper, exports.launcher, exports.auto2, exports.pelter, exports.lancer, exports.autobasic, exports.bombadier, exports.acid, exports.icegun, exports.firegun, exports.shockgun, exports.uzi];
        exports.basic.UPGRADES_TIER_3 = [exports.single,exports.badTestbed];

    exports.basic.UPGRADES_TIER_2 = [exports.zeppelin, exports.hivemind, exports.smash];
        exports.smash.UPGRADES_TIER_3 = [exports.megasmash, exports.spike, exports.autosmash, exports.landmine, exports.lancemind, exports.smashhive,];
exports.lancer.UPGRADES_TIER_2 = [exports.lancemind, exports.lancer2,];
 exports.hivemind.UPGRADES_TIER_3 = [exports.megamind, exports.madman, exports.psycho, exports.twinmind, exports.machhivemind, exports.lancemind, exports.smashhive, exports.decoy, exports.automind];
exports.pelter.UPGRADES_TIER_2 = [exports.puntgun, exports.submachine, exports.peltertrapper, exports.gunner, exports.tripelter];
exports.puntgun.UPGRADES_TIER_2 = [exports.punter, exports.tripuntgun];
exports.tripelter.UPGRADES_TIER_2 = [exports.hexapelter, exports.tripuntgun];
exports.tripuntgun.UPGRADES_TIER_3 = [exports.trianglepuntgun];
exports.submachine.UPGRADES_TIER_2 = [exports.vulcan, exports.punter];
exports.zeppelin.UPGRADES_TIER_3 = [ exports.poisonGun,exports.flameGun,exports.giffard,];
exports.giffard.UPGRADES_TIER_3 = [ exports.nuker];
    exports.twin.UPGRADES_TIER_2 = [exports.double, exports.bent, exports.gunner, exports.hexa];
        exports.twin.UPGRADES_TIER_3 = [exports.dual, exports.twintrap, exports.musket,  exports.twinmind, exports.twinferno];
        exports.double.UPGRADES_TIER_3 = [exports.tripletwin, exports.split, exports.autodouble, exports.bentdouble, exports.doubleferno];
        exports.bent.UPGRADES_TIER_3 = [exports.penta, exports.spread, exports.benthybrid, exports.bentdouble, exports.triple];
        exports.gunner.UPGRADES_TIER_3 = [exports.autogunner, exports.nailgun, exports.auto4, exports.machinegunner, exports.guntrap, exports.hurricane, exports.overgunner, exports.battery];

 exports.bombadier.UPGRADES_TIER_2 = [exports.shrapnel, exports.fragmenter];
  exports.shrapnel.UPGRADES_TIER_3 = [ exports.payload, exports.bazooka, exports.armament, exports.rpg, exports.fragger, exports.marksman,];

exports.acid.UPGRADES_TIER_2 = [ exports.poisonthing, exports.venom, exports.radiation,];

exports.icegun.UPGRADES_TIER_2 = [ exports.hail,];

exports.uzi.UPGRADES_TIER_2 = [exports.mini];

exports.autobasic.UPGRADES_TIER_2 = [ exports.automind];
        
    exports.sniper.UPGRADES_TIER_2 = [exports.assassin, exports.hunter, exports.mini, exports.rifle];
        exports.sniper.UPGRADES_TIER_3 = [exports.bushwhack];
        exports.assassin.UPGRADES_TIER_3 = [exports.ranger, exports.falcon, exports.stalker, exports.autoass];
        exports.hunter.UPGRADES_TIER_3 = [exports.preda, exports.poach, exports.sidewind, exports.dual];
        exports.rifle.UPGRADES_TIER_3 = [exports.musket, ];

exports.auto2.UPGRADES_TIER_2 = [exports.auto3, exports.heavy2, exports.rapid2, exports.sniper2, exports.auto2auto2, exports.swivel2];
exports.auto3.UPGRADES_TIER_3 = [exports.auto5, exports.heavy3, exports.auto4, /*exports.sub3,*/ exports.tritrap, exports.sniper3, /*exports.hunter3*/];
exports.rapid2.UPGRADES_TIER_3 = [exports.auto4, exports.rapid2a];
exports.auto2auto2.UPGRADES_TIER_3 = [exports.auto3auto3, exports.rapid2a, exports.heavy2a];
exports.auto3auto3.UPGRADES_TIER_3 = [exports.auto5auto5];
exports.heavy2.UPGRADES_TIER_3 = [exports.heavy3, exports.heavy2a];
exports.heavy3.UPGRADES_TIER_3 = [];
//exports.auto5.UPGRADES_TIER_3 = [exports.auto25];
exports.swivel2.UPGRADES_TIER_3 = [exports.axis4];
exports.sniper2.UPGRADES_TIER_3 = [exports.sniper3];
//exports.sniper3.UPGRADES_TIER_3 = [exports.sniper4];
exports.axis4.UPGRADES_TIER_3 = [exports.stak6,  exports.sniper4];

    exports.machine.UPGRADES_TIER_2 = [exports.artillery, exports.mini, exports.gunner, exports.inferno];
        exports.machine.UPGRADES_TIER_3 = [exports.spray, exports.machhivemind, ];
        exports.artillery.UPGRADES_TIER_3 = [exports.mortar, exports.spread, exports.skimmer, exports.spinner];
        exports.mini.UPGRADES_TIER_3 = [exports.stream, exports.nailgun, exports.hybridmini, exports.minitrap];
 exports.minitrap.UPGRADES_TIER_3 = [exports.blockade, exports.trapliner];
    exports.pound.UPGRADES_TIER_2 = [exports.destroy, exports.builder, exports.artillery]
        exports.pound.UPGRADES_TIER_3 = [exports.shotgun2, exports.eagle];
        exports.destroy.UPGRADES_TIER_3 = [exports.conq, exports.anni, exports.hybrid, exports.construct, exports.megatrapper, exports.hiveshooter];
 exports.twinferno.UPGRADES_TIER_3 = [exports.doubleferno, ];
exports.inferno.UPGRADES_TIER_3 = [exports.twinferno, ];
exports.launcher.UPGRADES_TIER_2 = [exports.skimmer,exports.spinner,];

    exports.flank.UPGRADES_TIER_2 = [exports.hexa, exports.tri, exports.auto3, exports.flanktrap, exports.tritrapper, exports.tripelter];
        exports.flank.UPGRADES_TIER_3 = [exports.tribuild];
        exports.tri.UPGRADES_TIER_3 = [exports.fighter, exports.booster, exports.falcon, exports.bomber, exports.autotri, exports.brutalizer, exports.eagle,  exports.proangle];
  exports.fighter.UPGRADES_TIER_3 = [exports.bighter,];
        exports.hexa.UPGRADES_TIER_3 = [exports.octo, exports.hurricane, exports.hexatrap];
        exports.auto3.UPGRADES_TIER_3 = [exports.auto5, exports.heavy3, exports.auto4, exports.banshee];
        exports.flanktrap.UPGRADES_TIER_3 = [exports.bushwhack, exports.guntrap, exports.bomber, exports.conq, exports.twintrap];

    exports.director.UPGRADES_TIER_2 = [exports.overseer, exports.cruiser, exports.underseer, exports.lilfact, exports.spaceshiplite];
        exports.director.UPGRADES_TIER_3 = [exports.manager, exports.psycho, exports.override];
        exports.overseer.UPGRADES_TIER_3 = [exports.overlord, exports.overtrap, exports.overgunner, exports.banshee, exports.autoover, exports.overdrive];
        exports.underseer.UPGRADES_TIER_3 = [exports.necromancer, exports.maleficitor];
        exports.cruiser.UPGRADES_TIER_3 = [exports.carrier, exports.battleship, exports.fortress];
        exports.lilfact.UPGRADES_TIER_3 = [exports.factory, exports.lilfactauto];
exports.necromancer.UPGRADES_TIER_3 = [exports.necromonster];
exports.spaceshiplite.UPGRADES_TIER_1 =[exports.spaceship, exports.mothershipmini];
  exports.overlord.UPGRADES_TIER_3 = [exports.satelite, exports.overworker, exports.mothershipmini ];
    exports.trapper.UPGRADES_TIER_2 = [exports.builder, exports.tritrapper, exports.flanktrap, exports.autotrapper];
        exports.trapper.UPGRADES_TIER_3 = [exports.minitrap, exports.overtrap, exports.megatrapper];
        exports.builder.UPGRADES_TIER_3 = [exports.construct, exports.autobuilder, exports.engineer, exports.boomer, exports.tribuild, exports.conq];
        exports.tritrapper.UPGRADES_TIER_3 = [exports.fortress, exports.hexatrap, exports.heptatrap, exports.tribuild,  exports.tribuilder];
exports.tribuilder.UPGRADES_TIER_3 = [ exports.hexabuilder];

    exports.bomber.UPGRADES_TIER_3 = [ exports.bombarder];
    exports.anni.UPGRADES_TIER_3 = [exports.congruator,exports.annibrid];
 exports.preda.UPGRADES_TIER_3 = [exports.congruator, exports.spreda, exports.xpreda];

    /*exports.smash.UPGRADES_TIER_3 = [exports.megasmash, exports.spike, exports.autosmash];
            
    exports.twin.UPGRADES_TIER_2 = [exports.double, exports.bent, exports.triple, exports.hexa];
        exports.double.UPGRADES_TIER_3 = [exports.tripletwin, exports.autodouble];
        exports.bent.UPGRADES_TIER_3 = [exports.penta, exports.benthybrid];
        exports.triple.UPGRADES_TIER_3 = [exports.quint];

    exports.sniper.UPGRADES_TIER_2 = [exports.assassin, exports.overseer, exports.hunter, exports.builder];
        exports.assassin.UPGRADES_TIER_3 = [exports.ranger];
        exports.overseer.UPGRADES_TIER_3 = [exports.overlord, exports.battleship
            , exports.overtrap, exports.necromancer, exports.factory, exports.fortress];
        exports.hunter.UPGRADES_TIER_3 = [exports.preda, exports.poach];
        exports.builder.UPGRADES_TIER_3 = [exports.construct, exports.autobuilder];
        
    exports.machine.UPGRADES_TIER_2 = [exports.destroy, exports.gunner, exports.artillery];
        exports.destroy.UPGRADES_TIER_3 = [exports.anni, exports.hybrid];
        exports.gunner.UPGRADES_TIER_3 = [exports.autogunner, exports.mortar, exports.stream];
        exports.artillery.UPGRADES_TIER_3 = [exports.mortar, exports.spread, exports.skimmer];
        exports.machine.UPGRADES_TIER_3 = [exports.spray];

    exports.flank.UPGRADES_TIER_2 = [exports.hexa, exports.tri, exports.auto3, exports.flanktrap];
        exports.hexa.UPGRADES_TIER_3 = [exports.octo];
        exports.tri.UPGRADES_TIER_3 = [exports.booster, exports.fighter, exports.bomber, exports.autotri];
        exports.auto3.UPGRADES_TIER_3 = [exports.auto5, exports.heavy3];
        exports.flanktrap.UPGRADES_TIER_3 = [exports.guntrap, exports.fortress, exports.bomber];*/

// NPCS:
exports.crasher = {
    TYPE: 'crasher',
    LABEL: 'Crasher',
    COLOR: 5,
    SHAPE: 3,
    SIZE: 5,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        SPEED: 5,
        ACCEL: 0.01,
        HEALTH: 0.5,
        DAMAGE: 5,
        PENETRATION: 2,
        PUSHABILITY: 0.5,
        DENSITY: 10,
        RESIST: 2,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothWithMotion',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
};
exports.swimmer = {
    LABEL: 'Swimmer',
    TYPE: 'crasher',
    ACCEPTS_SCORE: true,
    DANGER: 10,
    COLOR: 0,
    SHAPE: 'm -0.74832,-0.74832 a 1.05832,1.05832 0 0 1 1.15332,-0.229412 1.05832,1.05832 0 0 1 0.65332,0.97776 1.05832,1.05832 0 0 1 -0.65332,0.97776 1.05832,1.05832 0 0 1 -1.15332,-0.229412 l 0.74832,-0.74832 z',
    SIZE: 8,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        SPEED: 6,
        ACCEL: 0.01,
        HEALTH: 5,
        DAMAGE: 5,
        PENETRATION: 2,
        PUSHABILITY: 0.5,
        DENSITY: 10,
        RESIST: 2,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothWithMotion',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
};
exports.semicrusher = {
    TYPE: 'crasher',
    LABEL: 'Semi-Crusher',
    COLOR: 14,
    SHAPE: 102,
    SIZE: 8,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        SPEED: 5,
        ACCEL: 0.01,
        HEALTH: 1.25,
        DAMAGE: 5,
        PENETRATION: 2,
        PUSHABILITY: 0.5,
        DENSITY: 10,
        RESIST: 2,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothWithMotion',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
};
exports.arrowCrasher = {
    TYPE: 'crasher',
    LABEL: 'Arrow',
    COLOR: 0,
    SHAPE: 103,
    SIZE: 8,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        SPEED: 8,
        ACCEL: 0.01,
        HEALTH: 1.5,
        DAMAGE: 10,
        PENETRATION: 2,
        PUSHABILITY: 0.5,
        DENSITY: 10,
        RESIST: 2,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothWithMotion',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
};
exports.crusher = {
    TYPE: 'crasher',
    LABEL: 'Crusher',
    COLOR: 14,
    SHAPE: 107,
    SIZE: 16,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        SPEED: 3,
        ACCEL: 0.01,
        HEALTH: 5,
        DAMAGE: 5,
        PENETRATION: 2,
        PUSHABILITY: 0.5,
        DENSITY: 10,
        RESIST: 2,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothWithMotion',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
};
exports.visDestructia = {
    TYPE: 'crasher',
    LABEL: 'Vis Destructia',
    COLOR: 11,
    SHAPE: 109,
    SIZE: 17,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        SPEED: 7,
        ACCEL: 0.01,
        HEALTH: 10,
        DAMAGE: 10,
        PENETRATION: 5,
        PUSHABILITY: 0.75,
        DENSITY: 10,
        RESIST: 2,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothWithMotion',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
};
exports.destroyerCrasher = {
    TYPE: 'crasher',
    LABEL: 'Destroyer',
    COLOR: 8,
    SHAPE: 111,
    SIZE: 10,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        SPEED: 6,
        ACCEL: 0.01,
        HEALTH: 1,
        DAMAGE: 6,
        PENETRATION: 2,
        PUSHABILITY: 0.5,
        DENSITY: 10,
        RESIST: 2,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothWithMotion',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
};
exports.triblade = {
    TYPE: 'crasher',
    LABEL: 'Triblade',
    COLOR: 2,
    SHAPE: 114,
    SIZE: 10,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        SPEED: 6,
        ACCEL: 0.01,
        HEALTH: 1,
        DAMAGE: 6,
        PENETRATION: 2,
        PUSHABILITY: 0.5,
        DENSITY: 10,
        RESIST: 2,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothWithMotion',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
};
exports.flashCrasher = {
    TYPE: 'crasher',
    LABEL: 'Flash Crasher',
    COLOR: 1,
    SHAPE: 142,
    SIZE: 15,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        SPEED: 10,
        ACCEL: 0.01,
        HEALTH: 3,
        DAMAGE: 6,
        PENETRATION: 2,
        PUSHABILITY: 0.5,
        DENSITY: 10,
        RESIST: 2,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothWithMotion',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
};
exports.grouper = {
    TYPE: 'crasher',
    LABEL: 'Grouper',
    COLOR: 2,
    SHAPE: 143,
    SIZE: 15,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        SPEED: 10,
        ACCEL: 0.01,
        HEALTH: 3,
        DAMAGE: 6,
        PENETRATION: 2,
        PUSHABILITY: 0.5,
        DENSITY: 10,
        RESIST: 2,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothWithMotion',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
};
exports.dreadnoughtLITE = {
    TYPE: 'crasher',
    LABEL: 'Dreadnought LITE',
    COLOR: 11,
    SHAPE: 105,
    SIZE: 15,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        SPEED: 2.5,
        ACCEL: 0.01,
        HEALTH: 30,
        DAMAGE: 7,
        PENETRATION: 2,
        PUSHABILITY: 0.5,
        DENSITY: 10,
        RESIST: 2,
    },
   SKILL: skillSet({
        rld: 0.5,
        dam: 0.8, 
        pen: 0.8,
        str: 0.1,
        spd: 1,
        atk: 0.5,
        hlt: 0,
        shi: 0,
        rgn: 0.7,
        mob: 0,        
    }),
    VALUE: 20000,
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothWithMotion',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
   TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
              
               POSITION: [  5,     0,     0,       0,    360,   1, ],  
                    TYPE: [exports.boomer, {}]
                    },
            ],
};
exports.detraLITE = {
    TYPE: 'crasher',
    LABEL: 'Detrablade LITE',
    COLOR: 2,
    SHAPE: 114,
    SIZE: 25,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        SPEED: 2.5,
        ACCEL: 0.01,
        HEALTH: 35,
        DAMAGE: 7,
        PENETRATION: 2,
        PUSHABILITY: 0.5,
        DENSITY: 10,
        RESIST: 2,
    },
   SKILL: skillSet({
        rld: 0.5,
        dam: 0.8, 
        pen: 0.8,
        str: 0.1,
        spd: 1,
        atk: 0.5,
        hlt: 0,
        shi: 0,
        rgn: 0.7,
        mob: 0,        
    }),
    VALUE: 20000,
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothWithMotion',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [5, 8, 0, 0, 360, 1],
        TYPE: exports.auto3gun,
    }, {
        POSITION: [5, 8, 0, 120, 360, 1],
        TYPE: exports.auto3gun,
    }, {
        POSITION: [5, 8, 0, 240, 360, 1],
        TYPE: exports.auto3gun,
    }, ],
};
exports.visLITE = {
    TYPE: 'crasher',
    LABEL: 'Vis Ultima LITE',
    COLOR: 11,
    SHAPE: 109,
    SIZE: 23,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        SPEED: 4,
        ACCEL: 0.01,
        HEALTH: 30,
        DAMAGE: 6,
        PENETRATION: 2,
        PUSHABILITY: 0.5,
        DENSITY: 10,
        RESIST: 2,
    },
   SKILL: skillSet({
        rld: 0.5,
        dam: 0.8, 
        pen: 0.8,
        str: 0.1,
        spd: 1,
        atk: 0.5,
        hlt: 0,
        shi: 0,
        rgn: 0.7,
        mob: 0,        
    }),
    VALUE: 20000,
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothWithMotion',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
   TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
              
               POSITION: [  5,     0,     0,       0,    360,   1, ],  
                    TYPE: [exports.VisTurret, {}]
                    },
            ],
};
exports.gunshipLITE = {
    TYPE: 'crasher',
    LABEL: 'Gunship LITE',
    COLOR: 8,
    SHAPE: 111,
    SIZE: 18,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        SPEED: 4,
        ACCEL: 0.01,
        HEALTH: 30,
        DAMAGE: 6,
        PENETRATION: 2,
        PUSHABILITY: 0.5,
        DENSITY: 10,
        RESIST: 2,
    },
   SKILL: skillSet({
        rld: 0.5,
        dam: 0.8, 
        pen: 0.8,
        str: 0.1,
        spd: 1,
        atk: 0.5,
        hlt: 0,
        shi: 0,
        rgn: 0.7,
        mob: 0,        
    }),
    VALUE: 20000,
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothWithMotion',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
   TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
              
               POSITION: [  5,     0,     0,       0,    360,   1, ],  
                    TYPE: [exports.stream, {}]
                    },
            ],
};
exports.colliderLITE = {
    TYPE: 'crasher',
    LABEL: 'Collider LITE',
    COLOR: 14,
    SHAPE: 107,
    SIZE: 18,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        SPEED: 2.5,
        ACCEL: 0.01,
        HEALTH: 30,
        DAMAGE: 7,
        PENETRATION: 2,
        PUSHABILITY: 0.5,
        DENSITY: 10,
        RESIST: 2,
    },
   SKILL: skillSet({
        rld: 0.5,
        dam: 0.8, 
        pen: 0.8,
        str: 0.1,
        spd: 1,
        atk: 0.5,
        hlt: 0,
        shi: 0,
        rgn: 0.7,
        mob: 0,        
    }),
    VALUE: 20000,
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothWithMotion',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
   TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
              
               POSITION: [  5,     0,     0,       0,    360,   1, ],  
                    TYPE: [exports.machineAutoTurret, {}]
                    },
            ],
};
exports.megaCrasher = {
    TYPE: 'crasher',
    LABEL: 'Mega Crasher',
    COLOR: 71,
    SHAPE: 203,
    SIZE: 25,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        SPEED: 1.5,
        ACCEL: 0.01,
        HEALTH: 100,
        DAMAGE: 20,
        PENETRATION: 2,
        PUSHABILITY: 0.5,
        DENSITY: 10,
        RESIST: 2,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothWithMotion',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
};
exports.sentry = {
    PARENT: [exports.genericTank],
    TYPE: 'crasher',
    LABEL: 'Sentry',
    DANGER: 3,
    COLOR: 5,
    SHAPE: 3,
    SIZE: 10,
    SKILL: skillSet({
        rld: 0.5,
        dam: 0.8, 
        pen: 0.8,
        str: 0.1,
        spd: 1,
        atk: 0.5,
        hlt: 0,
        shi: 0,
        rgn: 0.7,
        mob: 0,        
    }),
    VALUE: 1500,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        FOV: 0.5,
        ACCEL: 0.006,
        DAMAGE: base.DAMAGE * 2,
        SPEED: base.SPEED * 0.5,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothToTarget',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
exports.trapTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 0.5,
    },
   /* INDEPENDENT: true,
    CONTROLLERS: ['nearestDifferentMaster'], 
    COLOR: 16,
    AI: {
        SKYNET: true,
        FULL_VIEW: true,
    },*/
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  16,    14,      1,      0,      0,      0,      0,   ],
            }, {
        POSITION: [   4,    14,     1.8,    16,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.lowpower, g.fast, g.halfreload]),
                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
              AUTOFIRE: true,
            }, },
    ],
};
exports.sentrySwarm = {
    PARENT: [exports.sentry],
    DANGER: 3,
    GUNS: [{
        POSITION: [    7,    14,    0.6,     7,     0,    180,     0,  ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.morerecoil]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,     
        }, },
    ],
};
exports.sentryGun = makeAuto(exports.sentry, 'Sentry', { type: exports.heavy3gun, size: 12, });
exports.sentryTrap = makeAuto(exports.sentry, 'Sentry', { type: exports.trapTurret, size: 12, });

exports.miniboss = {
    PARENT: [exports.genericTank],
    TYPE: 'miniboss',
    DANGER: 6,
    SKILL: skillSet({
        rld: 0.7,
        dam: 0.5, 
        pen: 0.8,
        str: 0.8,
        spd: 0.2,
        atk: 0.3,
        hlt: 1,
        shi: 0.7,
        rgn: 0.7,
        mob: 0,        
    }),
    LEVEL: 45,
    CONTROLLERS: ['nearestDifferentMaster', 'minion', 'canRepel'],
    AI: { NO_LEAD: true, },
    FACING_TYPE: 'autospin',
    HITS_OWN_TYPE: 'hard',
    BROADCAST_MESSAGE: 'A visitor has left!',
};
exports.xyvAutoGun = {
    PARENT: [exports.auto3gun],
    SHAPE: 206,
    GUNS: [{
        POSITION: [10, 12, 1.3, 8, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.mach, g.norecoil]),
            TYPE: [exports.drone, {
                CONTROLLERS: ['nearestDifferentMaster', 'canRepel', 'hangOutNearMaster'],
                HITS_OWN_TYPE: 'hard',
               MOTION_TYPE:'xyv1',
                //DIES_TO_TEAM_BASE: false
            }],
            STAT_CALCULATOR: gunCalcNames.swarm,
            AUTOFIRE: true,
            MAX_CHILDREN: 24,
            COLOR_OVERRIDE: 5
        }
    }]
};
exports.xyv = makeAuto({
    PARENT: [exports.miniboss],
    //LABEL: 'Xyv Wdtcfgzsezgk', // The Implosionist
    SIZE: 31,
    DANGER: 8,
    SHAPE: 147,
  VALUE: 500000,
    COLOR: 71,
   FACING_TYPE: 'locksFacing',
    BODY: {
        HEALTH: 1000,
        DAMAGE: base.DAMAGE * 1.1,
        REGEN: base.REGEN * .25,
        SPEED: base.SPEED * .35,
        ACCELARATION: base.ACCEL * .35
    },
    TURRETS: [{
        POSITION: [3, 15, 0, 0, 170, 0],
        TYPE: exports.auto3gun
    }, {
        POSITION: [3, 15, 0, 360 / 11, 170, 0],
        TYPE: exports.auto3gun
    }, {
        POSITION: [3, 15, 0, (360 / 11) * 10, 170, 0],
        TYPE: exports.auto3gun
    }],
    GUNS: [{
        POSITION: [12, 5, 1, 5, 0, (360 / 11) * 4, 0]
    }, {
        POSITION: [2, 5, 1.7, 17, 0, (360 / 11) * 4, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, ]),
             TYPE: [exports.xyvtrap, {MOTION_TYPE:'xyv2'} ],
            STAT_CALCULATOR: gunCalcNames.trap,
            COLOR_OVERRIDE: 13
        }
    }, {
        POSITION: [12, 5, 1, 5, 0, 180, 0]
    }, {
        POSITION: [2, 5, 1.7, 17, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, ]),
            TYPE: [exports.xyvtrap, {MOTION_TYPE:'xyv2'} ],
            STAT_CALCULATOR: gunCalcNames.trap,
            COLOR_OVERRIDE: 13
        }
    }, {
        POSITION: [12, 5, 1, 5, 0, (360 / 11) * 7, 0]
    }, {
        POSITION: [2, 5, 1.7, 17, 0, (360 / 11) * 7, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, ]),
            TYPE: [exports.xyvtrap, {MOTION_TYPE:'xyv2'} ],
            STAT_CALCULATOR: gunCalcNames.trap,
            COLOR_OVERRIDE: 13
        }
    }, {
        POSITION: [3.5, 6.75, 1.2, 13, 0, (360 / 11) * 2, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.summoner, ]),
            TYPE: [exports.sunchip, {MOTION_TYPE:'xyv3'} ],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
            COLOR_OVERRIDE: 32,
            MAX_CHILDREN: 8
        }
    }, {
        POSITION: [3.5, 6.75, 1.2, 13, 0, (360 / 11) * 3, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.summoner, ]),
           TYPE: [exports.sunchip, {MOTION_TYPE:'xyv3'} ],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
            COLOR_OVERRIDE: 32,
            MAX_CHILDREN: 8
        }
    }, {
        POSITION: [3.5, 6.75, 1.2, 13, 0, (360 / 11) * 8, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.summoner, ]),
              TYPE: [exports.sunchip, {MOTION_TYPE:'xyv3'} ],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
            COLOR_OVERRIDE: 32,
            MAX_CHILDREN: 8
        }
    }, {
        POSITION: [3.5, 6.75, 1.2, 13, 0, (360 / 11) * 9, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.summoner, ]),
             TYPE: [exports.sunchip, {MOTION_TYPE:'xyv3'} ], 
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
            COLOR_OVERRIDE: 32,
            MAX_CHILDREN: 8
        }
    }]
}, 'Xyv Wdtcfgzsezgk', {
    type: exports.xyvAutoGun,
    size: 10,
    angle: 0
});
exports.gunshipminiboss = {
  PARENT: [exports.miniboss],
  LABEL: "Gunship",
  SHAPE: 111,
  SIZE: 30,
   FACING_TYPE: 'locksFacing',
  VALUE: 500000,
  DANGER: 3,
  COLOR: 8,
   BODY: {
                FOV: 1.3,
                SPEED: base.SPEED * 0.25,
                HEALTH: base.HEALTH * 10,
                SHIELD: base.SHIELD * 1.25,
                REGEN: base.REGEN,
                DAMAGE: base.DAMAGE * 1.25,
                    },
          
  SKILL: skillSet({
            rld: 0.5,
            dam: 0.8,
            pen: 0.8,
            str: 0.8,
            spd: 1,
            atk: 0.3,
            hlt: 0.7,
            shi: 0.2,
            rgn: 0.2,
            mob: 0.3,
        }),
     TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                
                POSITION: [  7,     0,      0,       0,    360,   1, ],  
                    TYPE: exports.stream, 
                    },  {
                       POSITION: [  6,     4.5,      7,       0,    90,   0, ],  
                    TYPE: [exports.stream, ]
                    }, {
                       POSITION: [  6,     4.5,      -7,       0,    90,   0, ],  
                    TYPE: [exports.stream, ]
                    },
                {
                       POSITION: [  6,     8.5,      2.5,       90,    90,   0, ],  
                    TYPE: [exports.trapTurret, ]
                    }, {
                       POSITION: [  6,     8.5,      -2.5,       -90,    90,   0, ],  
                    TYPE: [exports.trapTurret, ]
                    },
             ],
   GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [13, 5, 1, 0, -7, 180, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,  ]),
            TYPE: exports.bullet,
            LABEL: 'Devastator',
        },
    }, {
        POSITION: [13, 5, 1, 0, 7, 180, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, ]),
            TYPE: exports.bullet,
            LABEL: 'Devastator',
        },
    }, ],
};
exports.sheathBoss = {
  PARENT: [exports.miniboss],
  SHAPE: 211,
   FACING_TYPE: 'locksFacing',
  LABEL: 'Sheath',
  COLOR: 71,
  VALUE: 650000,
  SIZE: 30,
     BODY: {
                    FOV: 1.3,
                    HEALTH: base.HEALTH * 50,
                    SHIELD: base.SHIELD * 10,
                    DENSITY: base.DENSITY * 5,
                   SPEED: base.SPEED * 0.25
                },
  TURRETS: [ {/******  SIZE      X       Y     ANGLE    ARC  LAYER */
    POSITION: [     0.1,  0,      0,        0,   -15,    0],
            TYPE: [exports.genericTank,
            {CONTROLLERS: ['onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'] }],
        },  {/******  SIZE      X       Y     ANGLE    ARC  LAYER */
    POSITION: [     10,  0,      0,        0,   360,    1],
            TYPE: [exports.bowTurret,
            {CONTROLLERS: ['onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], INDEPENDENT: true }],
        },],
   GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   12,     6,    1.4,     0,      6,     180,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                      TYPE: [exports.bullet, {MOTION_TYPE:'gold'} ],                       
                      AUTOFIRE: true,
                    }, }, {
                  POSITION: [   12,     6,    1.4,     0,      -6,     180,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                       TYPE: [exports.bullet, {MOTION_TYPE:'gold'} ],   
                        AUTOFIRE: true,
                    }, }, {
                POSITION: [  13,    5,     1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                        TYPE: [exports.bullet, {MOTION_TYPE:'gold'} ],                       
                      AUTOFIRE: true,
                    }, }, {
                POSITION: [   5,    5,    -1.6,    8,      0,      0,      0,   ], 
                },
                ],
};
exports.bowPart = {
  PARENT: [exports.miniboss],
   SHAPE: 234,
 // FACING_TYPE: 'bound',
  LABEL: '',
  COLOR: 2,
   GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   3,     8,    1.2,     8,      0,     45,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.summoner]),
                      TYPE: [exports.sunchip, {MOTION_TYPE:'bow'} ],                       
                      AUTOFIRE: true,
                      MAX_CHILDREN: 6,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.necro,
                    }, }, {
                POSITION: [   3,     8,    1.2,     8,      0,     135,     0.5,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.summoner]),
                       TYPE: [exports.sunchip, {MOTION_TYPE:'bow'} ],   
                        AUTOFIRE: true,
                      MAX_CHILDREN: 6,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.necro,
                    }, },
                ],
};
exports.bowShard = {
  PARENT: [exports.miniboss],
   SHAPE: 234,
  FACING_TYPE: 'locksFacing',
  LABEL: 'Shard',
  COLOR: 2,
  VALUE: 100000,
   TURRETS: [ {/******  SIZE      X       Y     ANGLE    ARC  LAYER */
    POSITION: [     0.1,  0,      0,        0,   -15,    0],
            TYPE: [exports.genericTank,
            {CONTROLLERS: ['onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'] }],
        },],
   GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   3,     8,    1.2,     8,      0,     225,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.summoner]),
                      TYPE: [exports.sunchip, {MOTION_TYPE:'bow'} ],                       
                      AUTOFIRE: true,
                      MAX_CHILDREN: 6,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.necro,
                    }, }, {
                POSITION: [   3,     8,    1.2,     8,      0,     135,     0.5,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.summoner]),
                       TYPE: [exports.sunchip, {MOTION_TYPE:'bow'} ],   
                        AUTOFIRE: true,
                      MAX_CHILDREN: 6,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.necro,
                    }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,     4,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  17,    8,      1,      0,      0,      0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter]),
                        TYPE: exports.bullet,
                    }, },
                ],
};
const bowshard = (myself) => {
  let e = myself.spawn({x: myself.x, y: myself.y});
  e.define(exports.bowPart);
  e.color = myself.color;
  e.team = myself.team;
  };
 
const bow = (myself) => {
  let e = myself.spawn({x: myself.x, y: myself.y});
  e.define(exports.bowPart);
  e.color = myself.color;
  e.team = myself.team;
  };

exports.bowCore = {
  PARENT: [exports.miniboss],
  LABEL: 'Core',
  SHAPE: 228,
  COLOR: 13,
  VALUE: 650000,
 // FACING_TYPE: 'locksFacing',
                SIZE: 15,
   BODY: {
                    FOV: 1.3,
                    HEALTH: base.HEALTH * 50,
                    SHIELD: base.SHIELD * 10,
                    DENSITY: base.DENSITY * 5,
                   SPEED: base.SPEED * 0.25
                },
   TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
              
               POSITION: [  12,     0,     0,       0,    360,   1, ],  
                    TYPE: [exports.bowTurret, {}]
                    },
            ],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  15,    8,    1,   0,      0,      45,      0,  ], 
                        }, {
                    POSITION: [  14,    9,    1,     0,      0,      45,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.sidewind2]),
                            TYPE: exports.snake,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  15,    8,    1,   0,      0,      135,      0,  ], 
                        }, {
                    POSITION: [  14,    9,    1,     0,      0,      135,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.sidewind2]),
                            TYPE: exports.snake,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  15,    8,    1,   0,      0,      225,      0,  ], 
                        }, {
                    POSITION: [  14,    9,    1,     0,      0,      225,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.sidewind2]),
                            TYPE: exports.snake,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  15,    8,    1,   0,      0,      315,      0,  ], 
                        }, {
                    POSITION: [  14,    9,    1,     0,      0,      315,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.sidewind2]),
                            TYPE: exports.snake,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, },
                ],
};
const bowCore = (myself) => {
  let e = myself.spawn({x: myself.x, y: myself.y});
  e.define(exports.bowCore);
  e.color = myself.color;
  e.team = myself.team;
  };
exports.bow = {
  PARENT: [exports.miniboss],
  LABEL: 'Bow',
  SHAPE: 228,
  COLOR: 13,
  VALUE: 450000,
  FACING_TYPE: 'locksFacing',
                SIZE: 15,
   BODY: {
                    FOV: 1.3,
                    HEALTH: base.HEALTH * 50,
                    SHIELD: base.SHIELD * 10,
                    DENSITY: base.DENSITY * 5,
                   SPEED: base.SPEED * 0.25
                },
   TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  15,     0,      15,       180,    1,   0, ],  
                    TYPE: [exports.bowPart, /*{ INDEPENDENT: true, COLOR: 16, }*/]
                          }, {
               POSITION: [  15,     0,      15,       0,    1,   0, ],  
                    TYPE: [exports.bowPart, /*{ INDEPENDENT: true, COLOR: 16, }*/]
                          }, {
               POSITION: [  12,     0,     0,       0,    360,   1, ],  
                    TYPE: [exports.bowTurret, {}]
                    },
            ],
  TRIGGERS: {
      DEATH: (myself) => {
        bowCore(myself);
        bow(myself);
        bow(myself);
      }
    }
};
exports.aquamarine = {
    PARENT: [exports.miniboss],
                FACING_TYPE: 'locksFacing',
                SIZE: 30,
                COLOR: 0,
  VALUE: 500000,
              SHAPE:  'm -0.74832,-0.74832 a 1.05832,1.05832 0 0 1 1.15332,-0.229412 1.05832,1.05832 0 0 1 0.65332,0.97776 1.05832,1.05832 0 0 1 -0.65332,0.97776 1.05832,1.05832 0 0 1 -1.15332,-0.229412 l 0.74832,-0.74832 z',
                LABEL: 'Aquamarine',
      CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal',],
                  BODY: {
                    FOV: 1.3,
                    HEALTH: base.HEALTH * 50,
                    SHIELD: base.SHIELD * 10,
                    DENSITY: base.DENSITY * 5,
                   SPEED: base.SPEED * 0.25
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT       X       Y     ANGLE   DELAY */
            POSITION: [ 10.763, 2.153,   5.298, -2.204,      0,      180,      0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over, g.doublereload, g.doublereload, g.doublereload]),
                TYPE: exports.aquadrone,
                MAX_CHILDREN: 15,
            }, },
            ],
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  7,     7,      0,       0,    360,   1, ],  
                    TYPE: [exports.trapTurret, { INDEPENDENT: true, COLOR: 16, }]
                          }, {
               POSITION: [  7,     7,      4,       60,    360,   1, ],  
                    TYPE: [exports.trapTurret, { INDEPENDENT: true, COLOR: 16, }]
                          }, {
               POSITION: [  7,     7,     -4,       -60,    360,   1, ],  
                    TYPE: [exports.trapTurret, { INDEPENDENT: true, COLOR: 16, }]
                    },
            ],
        };
exports.blitzkrieg = {
  PARENT: [exports.miniboss],
  LABEL: 'Blitzkrieg',
  SHAPE: 3,
  COLOR: 19,
  VALUE: 500000,
     FACING_TYPE: 'smoothToTarget',
  SIZE: 15,
     BODY: {
                    FOV: 1.3,
                    HEALTH: base.HEALTH * 50,
                    SHIELD: base.SHIELD * 10,
                    DENSITY: base.DENSITY * 5,
                   SPEED: base.SPEED * 0.75
                },
   TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     0,      0,      0,     360, 1], 
                    TYPE: exports.bigauto4gun,
                        },
            ],
   GUNS: [{
        POSITION: [15, 3, 1, 0, 20, 345, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
            TYPE: exports.bullet
                
        }
    }, {
        POSITION: [15, 3, 1, 0, 23, 345, 0.5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
            TYPE: exports.bullet
                
        }
    }, {
        POSITION: [25, 4, 1, 0, 0, 75, 0],
       
    }, {
        POSITION: [15, 3, 1, 0, -20, -345, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
            TYPE: exports.bullet
                
        }
    }, {
        POSITION: [15, 3, 1, 0, -23, -345, 0.5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
            TYPE: exports.bullet
                
        }
    }, {
        POSITION: [25, 4, 1, 0, 0, -75, 0],
       
    }, {
        POSITION: [8, 8, 1.2, 8, 0, 0, 0],
       
    },]
};
exports.arrasian = { 
                PARENT: [exports.miniboss],
                DANGER: 5,
                SHAPE: [[0.5,0.5],[1,-1],[-1,-1],[-1,1],[1,1],[0.5,0.5],[0.5,0.5],[1,1],[1,-1],[0.5,0.5],[-0.5,0.5],[-1,1],[-0.5,0.5],[-0.5,-0.5],[0.5,-0.5]],
                COLOR: 13,
                SIZE: 60,
                LABEL: 'Arrasian',
                FACING_TYPE: 'autospin',
                 BODY: {
                    FOV: 1.3,
                    HEALTH: base.HEALTH * 50,
                    SHIELD: base.SHIELD * 10,
                    DENSITY: base.DENSITY * 5,
                   SPEED: base.SPEED * 0.25
                },
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  3,     10,      2.5,      90,    160, 0], 
                        TYPE: exports.autoTurret,
                            }, {
                    POSITION: [  3,     10,     2.5,     -90,    160, 0], 
                        TYPE: exports.autoTurret,
                            }, {
                    POSITION: [  3,     10,      2.5,     180,    160, 0],
                        TYPE: exports.autoTurret,
                            }, {
                    POSITION: [  3,     10,      2.5,     0,    160, 0],
                        TYPE: exports.autoTurret,
                              
                              POSITION: [  3,     10,      -2.5,      90,    160, 0], 
                        TYPE: exports.autoTurret,
                            }, {
                    POSITION: [  3,     10,      -2.5,     -90,    160, 0], 
                        TYPE: exports.autoTurret,
                            }, {
                    POSITION: [  3,     10,      -2.5,     180,    160, 0],
                        TYPE: exports.autoTurret,
                            }, {
                    POSITION: [  3,     10,      -2.5,     0,    160, 0],
                        TYPE: exports.autoTurret,
                              
                              POSITION: [  3,     10,      -6,      90,    160, 0], 
                        TYPE: exports.autoTurret,
                            }, {
                    POSITION: [  3,     10,      -6,     -90,    160, 0], 
                        TYPE: exports.autoTurret,
                            }, {
                    POSITION: [  3,     10,      -6,     180,    160, 0],
                        TYPE: exports.autoTurret,
                            }, {
                    POSITION: [  3,     10,      -6,     0,    160, 0],
                        TYPE: exports.autoTurret,
                              
                              POSITION: [  3,     10,      6,      90,    160, 0], 
                        TYPE: exports.autoTurret,
                            }, {
                    POSITION: [  3,     10,      6,     -90,    160, 0], 
                        TYPE: exports.autoTurret,
                            }, {
                    POSITION: [  3,     10,      6,     180,    160, 0],
                        TYPE: exports.autoTurret,
                            }, {
                    POSITION: [  3,     10,      6,     0,    160, 0],
                        TYPE: exports.autoTurret,
                              
                              POSITION: [  3,     10,      -6,      0,    160, 0], 
                        TYPE: exports.autoTurret,
                            }, {
                    POSITION: [  3,     10,      -2.5,     -0,    160, 0], 
                        TYPE: exports.autoTurret,
                            }, {
                    POSITION: [  3,     10,      2.5,     0,    160, 0],
                        TYPE: exports.autoTurret,
                            }, {
                    POSITION: [  3,     10,      6,     0,    160, 0],
                        TYPE: exports.autoTurret,
                              }, {
                POSITION: [  5,     9,      0,       45,    360,   1, ],  
                    TYPE: [exports.pound, { CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],INDEPENDENT: false, COLOR: 6,}],
                                }, {
                POSITION: [  5,     9,      0,       135,    360,   1, ],  
                    TYPE: [exports.pound, { CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],INDEPENDENT: false, COLOR: 6,}],
                                  }, {
                POSITION: [  5,     9,      0,       225,    360,   1, ],  
                    TYPE: [exports.pound, { CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],INDEPENDENT: false, COLOR: 6,}],
                                    }, {
                POSITION: [  5,     9,      0,       315,    360,   1, ],  
                    TYPE: [exports.pound, { CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],INDEPENDENT: false, COLOR: 6,}],
                                    }, {
                POSITION: [  4,     12,      0,       45,    360,   0, ],  
                    TYPE: [exports.stream, { CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],INDEPENDENT: false, COLOR: 16,}],
                                      }, {
                POSITION: [  4,     12,      0,       135,    360,   0, ],  
                    TYPE: [exports.stream, { CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],INDEPENDENT: false, COLOR: 16,}],
                                        }, {
                POSITION: [  4,     12,      0,       225,    360,   0, ],  
                    TYPE: [exports.stream, { CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],INDEPENDENT: false, COLOR: 16,}],
                                          }, {
                POSITION: [  4,     12,      0,       315,    360,   0, ],  
                    TYPE: [exports.stream, { CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],INDEPENDENT: false, COLOR: 16,}],
                            },
                ],
            };
exports.modearenacloser = {
            PARENT: [exports.genericTank],
            LABEL: 'Arena Closer',
          NAME: 'Arena Closer',
  //TYPE: 'miniboss',
            SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9,],
            LEVEL: -1,
            BODY: { // def
                SHIELD: 1000,
                REGEN: 1000,
                HEALTH: 1000,
                DAMAGE: 1000,
                DENSITY: 2000,
                FOV: 100,
            },
            SIZE: 25,
    VALUE: 0,
  LEVEL: 45,
    CONTROLLERS: ['nearestDifferentMaster', 'minion', 'canRepel'],
    AI: { NO_LEAD: true, },
  HITS_OWN_TYPE: 'hard',
    CAN_BE_ON_LEADERBOARD: false,
    GIVE_KILL_MESSAGE: true,
    ACCEPTS_SCORE: false,
           GUNS: [{
        POSITION: [15, 10, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.ac ]),
            TYPE: exports.bullet
                
        }
    }, ]
        };
exports.juggernaught = {
    PARENT: [exports.miniboss],
    LABEL: 'Juggernaught',
    DANGER: 10,
  BODY: {
    HEALTH: 500,
    DAMAGE: 10,
    SHIELD: 10,
    SPEED: 3,
    FOV: 2,
  },
  SIZE: 30,
  COLOR: 19,
    FACING_TYPE: 'autospin',
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
         POSITION: [25, 0, 0, 0, 360, 0, ],
        TYPE: exports.dominationBody,
    }, {
        POSITION: [25, 0, 0, 180, 360, 0, ],
        TYPE: exports.dominationBody,
    }, {
      POSITION: [30, 0, 0, 0, 0, 0, ],
        TYPE: exports.dominationBody, 
    }, {
        POSITION: [7, 8, 0, 45, 360, 1],
        TYPE: exports.sniper3gun,
    },  {
        POSITION: [7, 8, 0, 135, 360, 1],
        TYPE: exports.sniper3gun,
    }, {
        POSITION: [7, 8, 0, -135, 360, 1],
        TYPE: exports.sniper3gun,
    }, {
        POSITION: [7, 8, 0, -45, 360, 1],
        TYPE: exports.sniper3gun,
    }, {
        POSITION: [8, 0, 0, 360, 360, 1],
        TYPE: [exports.bigauto4gun, {
               INDEPENDENT: true
        }
               ],
    }, ],
};
exports.superboss = {
    PARENT: [exports.miniboss],
    TYPE: 'miniboss',
    DANGER: 100,
  VALUE: 750000,
     SKILL: skillSet({
        rld: 1,
        dam: 1, 
        pen: 1,
        str: 1,
        spd: 1,
        atk: 1,
        hlt: 1,
        shi: 1,
        rgn: 1,
        mob: 1,        
    }),
   BODY: {
    HEALTH: 1000,
    DAMAGE: 20,
    SHIELD: 15,
    SPEED: 0.25,
    FOV: 1.5,
  },
    LEVEL: 60,
    DISPLAY_NAME: true,
    CONTROLLERS: ['nearestDifferentMaster', 'minion', 'canRepel', 'fleeAtLowHealth',],
    AI: {
        NO_LEAD: true,
    },
    HITS_OWN_TYPE: 'hard',
    BROADCAST_MESSAGE: 'A SUPERBOSS has been killed!',
};


exports.space = {
                PARENT: [exports.miniboss],
                LABEL: 'Demolisher',
   FACING_TYPE: 'smoothToTarget',
                SHAPE: 4,
                SIZE: 30,
                DANGER: 7,
                BODY: {
                    FOV: 1.6,
                    HEALTH: 7,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  25,     8,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  23,     8,      1,      0,      0,      0,     0.2, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  21,     8,      1,      0,      0,      0,     0.4, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  19,     8,      1,      0,      0,      0,     0.6, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  17,     8,      1,      0,      0,      0,     0.8, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                          }, }, {
                          POSITION: [   17,    5,    0.6,     7,      3,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Guided'                
                        }, }, {
                    POSITION: [   17,    5,    0.6,     7,     -3,     90,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Autonomous',        
                        }, }, {
                    POSITION: [   17,    5,    0.6,     7,      3,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Autonomous',         
                        }, }, {
                    POSITION: [   17,    5,    0.6,     7,     -3,     270,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Guided'       
                          }, }, {   
                POSITION: [  16,     8,      1.4,      0,      0,     180,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.mach, g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                        }, },
                ],
     TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
       
              POSITION: [4, 0, 0, 0, 360, 0],
        TYPE: exports.mod_ring,
    }],
            };
exports.sigma = {
  PARENT: [exports.superboss],
  LABEL: 'Sigma',
   SIZE: 30,
  COLOR: 19,
    FACING_TYPE: 'autospin',
  SHAPE: 201,   /* GUNS: [{
        POSITION: [0, 12, 1.2, 8, 0, 90, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
             TYPE: [exports.hybridminiminion, {
          PERSISTS_AFTER_DEATH: true,
        }],
            AUTOFIRE: true,
           MAX_CHILDREN: 1,
            SYNCS_SKILLS: true,
         
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, {
        POSITION: [0, 12, 1.2, 8, 0, 180, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
             TYPE: [exports.hybridminiminion, {
          PERSISTS_AFTER_DEATH: true,
        }],
            AUTOFIRE: true,
           MAX_CHILDREN: 1,
            SYNCS_SKILLS: true,
         
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, {
        POSITION: [0, 12, 1.2, 8, 0, 270, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
             TYPE: [exports.hybridminiminion, {
          PERSISTS_AFTER_DEATH: true,
        }],
            AUTOFIRE: true,
           MAX_CHILDREN: 1,
            SYNCS_SKILLS: true,
         
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, {
        POSITION: [0, 12, 1.2, 8, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: [exports.hybridminiminion, {
          PERSISTS_AFTER_DEATH: true,
        }],
            AUTOFIRE: true,
           MAX_CHILDREN: 1,
            SYNCS_SKILLS: true,
         
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, 
    
    ],*/
   TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [3, 10, 0, 30, 360, 1],
        TYPE: exports.sniper3gun,
    },  {
        POSITION: [3, 10, 0, 90, 360, 1],
        TYPE: exports.sniper3gun,
    }, {
        POSITION: [3, 10, 0, 150, 360, 1],
        TYPE: exports.sniper3gun,
    }, {
        POSITION: [3, 10, 0, 210, 360, 1],
        TYPE: exports.sniper3gun,
    },  {
        POSITION: [3, 10, 0, 270, 360, 1],
        TYPE: exports.sniper3gun,
    }, {
        POSITION: [3, 10, 0, 330, 360, 1],
        TYPE: exports.sniper3gun,
    }, {
        POSITION: [8, 0, 0, 360, 360, 1],
        TYPE: [exports.skimmer, {
          COLOR: 19,
        }
               ],
    }, {
              POSITION: [4, 0, 0, 0, 360, 0],
        TYPE: exports.mod_ring,
    }],
};
exports.skimboss = {
        PARENT: [exports.miniboss],
  LABEL: 'Elite Skimmer',
        BODY: {
            HEALTH: 300,
            DAMAGE: 2,
            SHIELD: 20,
          SPEED: 1,
          FOV: 1.3,
        },
        SHAPE: 3, 
        COLOR: 2,
        FACING_TYPE: 'autospin',
        TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [  15,     5,      0,     60,     170, 0], 
                TYPE: exports.skimturret,
                    }, {
            POSITION: [  15,     5,      0,     180,    170, 0], 
                TYPE: exports.skimturret,
                    }, {
            POSITION: [  15,     5,      0,     300,    170, 0], 
                TYPE: exports.skimturret,
                    },
        ],
    };
exports.sassairis = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 13,
   FACING_TYPE: 'looseToTarget',
};

exports.sassaeye = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 3,
    },
     FACING_TYPE: 'looseToTarget',
    COLOR: 19,
    TURRETS: [ { /****  SIZE      X       Y     ANGLE    ARC  LAYER */
        POSITION: [    10.75,     2,      0,        0,   -15,   1, ],
            TYPE: exports.sassairis,
        }
    ],
};
exports.sassaminion = {
    PARENT: [exports.genericTank],
    LABEL: 'Minion of Sassafras', 
    TYPE: 'miniboss',
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 5,
        SPEED: 10,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
  INDEPENDENT: true,
  SHAPE: 6,
  VALUE: 100000,
    DRAW_HEALTH: true,
    CLEAR_ON_MASTER_UPGRADE: false,
    GIVE_KILL_MESSAGE: true,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
          
            POSITION: [  12,     0,      0,     0,     0,  1], 
                TYPE: exports.sassaeye,
                    }, 
        ],
     GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     2,      1,      0,    -2.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     2,      1,      0,     2.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  12,    11,      1,      0,      0,      0,      0,   ],
                        }, 
                ],
};
let sassaprops = {
            SHOOT_SETTINGS: combineStats([g.factory, g.pound,]),
            TYPE: exports.sassaminion,
            STAT_CALCULATOR: gunCalcNames.drone,                        
            AUTOFIRE: true,
            MAX_CHILDREN: 1,
            SYNCS_SKILLS: true,   
            WAIT_TO_CYCLE: true,
        };
exports.sassafras = {
   PARENT: [exports.miniboss],
  LABEL: 'Sassafras',
  VALUE: 500000,
        BODY: {
            HEALTH: 500,
            DAMAGE: 5,
            SHIELD: 20,
          SPEED: 1,
          FOV: 1.3,
        },
        SHAPE: 6, 
        COLOR: 2,
        SIZE: 50,
        FACING_TYPE: 'autospin',
   GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   4,      6,    1.6,     8,      0,      0,      0,   ], 
                    PROPERTIES: sassaprops, }, {
                POSITION: [   4,      6,    1.6,     8,      0,     60,      0,   ], 
                    PROPERTIES: sassaprops, }, {
                POSITION: [   4,      6,    1.6,     8,      0,     120,     0,   ], 
                    PROPERTIES: sassaprops, }, {
                POSITION: [   4,      6,    1.6,     8,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
                        TYPE: exports.sassaminion,
                        STAT_CALCULATOR: gunCalcNames.drone,                        
                        AUTOFIRE: true,
                        MAX_CHILDREN: 1,
                        SYNCS_SKILLS: true, 
                        WAIT_TO_CYCLE: true,  
                    }, }, {
                POSITION: [   4,      6,    1.6,     8,      0,     240,     0,   ], 
                    PROPERTIES: sassaprops, }, {
                POSITION: [   4,      6,    1.6,     8,      0,     300,     0,   ], 
                    PROPERTIES: sassaprops, },
            ],
        TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
          
            POSITION: [  7,     0,      0,     0,     0,  1], 
                TYPE: exports.sassaeye,
                    }, {
                       POSITION: [  4,     7,      0,     0,     360,  1], 
                TYPE: exports.buildergun,
                    }, {
                       POSITION: [  4,     7,      0,     120,     360,  1], 
                TYPE: exports.buildergun,
                    }, {
                       POSITION: [  4,     7,      0,     240,     360,  1], 
                TYPE: exports.buildergun,
                    },  {
                       POSITION: [  4,     7,      0,     60,     360,  1], 
                TYPE: exports.singlegun,
                    }, {
                       POSITION: [  4,     7,      0,     -60,     360,  1], 
                TYPE: exports.singlegun,
                    }, {
                       POSITION: [  4,     7,      0,     180,     360,  1], 
                TYPE: exports.singlegun,
                    },
        ],
  
  
  
};
    exports.crasherSpawner = {
        PARENT: [exports.genericTank],
        LABEL: 'Spawned',  
        STAT_NAMES: statnames.drone,
        CONTROLLERS: ['nearestDifferentMaster'], 
        COLOR: 5, 
        INDEPENDENT: true, 
        AI: { chase: true, },
        MAX_CHILDREN: 4,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.weak, g.weak]),
                    TYPE: [exports.drone, { LABEL: 'Crasher', VARIES_IN_SIZE: true, DRAW_HEALTH: true }],
                    SYNCS_SKILLS: true,
                    AUTOFIRE: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, },
        ],
    };
    exports.elite = {
        PARENT: [exports.miniboss],
        LABEL: 'Elite Crasher',
        COLOR: 5,
        SHAPE: 3,
        SIZE: 20,
        VARIES_IN_SIZE: true,
        VALUE: 150000,
        BODY: {
            FOV: 1.3,
            SPEED: base.SPEED * 0.25,
            HEALTH: base.HEALTH * 1.5,
            SHIELD: base.SHIELD * 1.25,
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 2.5,
        },
    };
exports.elite_trapper = {
  PARENT: [exports.elite],
  TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  7,     6,      0,     180,     190, 0], 
                    TYPE: [exports.elitetrapturret, { COLOR: 5, }],
                        }, {
                           POSITION: [  7,     6,      8,     180,     190, 0], 
                    TYPE: [exports.trapper, { COLOR: 5, }],
                        }, {
                           POSITION: [  7,     6,      -8,     180,     190, 0], 
                    TYPE: [exports.trapper, { COLOR: 5, }],
                        }, {
                POSITION: [  7,     6,      0,      60,    190, 0], 
                    TYPE: [exports.elitetrapturret, { COLOR: 5, }],
                        }, {
                           POSITION: [  7,     6,      8,     60,     190, 0], 
                    TYPE: [exports.trapper, { COLOR: 5, }],
                        }, {
                           POSITION: [  7,     6,      -8,     60,     190, 0], 
                    TYPE: [exports.trapper, { COLOR: 5, }],
                        }, {
                POSITION: [  7,     6,      0,     -60,    190, 0], 
                    TYPE: [exports.elitetrapturret, { COLOR: 5, }],
                        }, {
                           POSITION: [  7,     6,      8,     -60,     190, 0], 
                    TYPE: [exports.trapper, { COLOR: 5, }],
                        }, {
                           POSITION: [  7,     6,      -8,     -60,     190, 0], 
                    TYPE: [exports.trapper, { COLOR: 5, }],
                        },  {
                POSITION: [  11,     0,      0,       0,    360,   1, ],  
                    TYPE: [exports.bigauto4gun, { INDEPENDENT: true, COLOR: 5, }]
                    },
            ],
  
  
  
};
        exports.elite_destroyer = {
            PARENT: [exports.elite],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [    5,    16,     1,      6,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
                        TYPE: exports.bullet,
                        LABEL: 'Devastator',
                    }, }, {
                POSITION: [    5,    16,     1,      6,      0,      60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
                        TYPE: exports.bullet,
                        LABEL: 'Devastator',
                    }, }, {
                POSITION: [    5,    16,     1,      6,      0,     -60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
                        TYPE: exports.bullet,
                        LABEL: 'Devastator',
                    }, },
            ],
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     0,      0,     180,    360,   0, ], 
                    TYPE: [exports.crasherSpawner]
                    }, {
                POSITION: [  11,     0,      0,      60,    360,   0, ],  
                    TYPE: [exports.crasherSpawner]
                    }, {
                POSITION: [  11,     0,      0,     -60,    360,   0, ],  
                    TYPE: [exports.crasherSpawner]
                    }, {
                POSITION: [  11,     0,      0,       0,    360,   1, ],  
                    TYPE: [exports.bigauto4gun, { INDEPENDENT: true, COLOR: 5, }]
                    },
            ],
        };
        exports.elite_gunner = {
            PARENT: [exports.elite],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  14,    16,      1,      0,      0,     180,     0,   ],
                    }, {
                POSITION: [   4,    16,     1.5,    14,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                        TYPE: [exports.pillbox, { INDEPENDENT: true, }],
                    }, }, {                
                POSITION: [   6,    14,     -2,      2,      0,      60,     0,   ],
                    }, {                
                POSITION: [   6,    14,     -2,      2,      0,     300,     0,   ],
                    }
            ],
            AI: { NO_LEAD: false, },
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  14,     8,      0,     60,     180,   0, ], 
                    TYPE: [exports.auto4gun],
                    }, {
                POSITION: [  14,     8,      0,     300,    180,   0, ],
                    TYPE: [exports.auto4gun],
            }],
        };
        exports.elite_sprayer = { 
            PARENT: [exports.elite],
            AI: { NO_LEAD: false, },
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  14,     6,      0,     180,     190, 0], 
                    TYPE: [exports.spray, { COLOR: 5, }],
                        }, {
                POSITION: [  14,     6,      0,      60,    190, 0], 
                    TYPE: [exports.spray, { COLOR: 5, }],
                        }, {
                POSITION: [  14,     6,      0,     -60,    190, 0], 
                    TYPE: [exports.spray, { COLOR: 5, }],
                        },
            ],
        };
 exports.elite_bombadier = { 
            PARENT: [exports.elite],
            AI: { NO_LEAD: false, },
    SKILL: skillSet({
        rld: 1,
        dam: 1, 
        pen: 1,
        str: 1,
        spd: 1,
        atk: 1,
        hlt: 1,
        shi: 1,
        rgn: 1,
        mob: 1,        
    }),
    SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, bomb, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl,],
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  14,     6,      0,     180,     190, 0], 
                    TYPE: [exports.bombadier, { COLOR: 5, }],
                        }, {
                POSITION: [  14,     6,      0,      60,    190, 0], 
                    TYPE: [exports.bombadier, { COLOR: 5, }],
                        }, {
                POSITION: [  14,     6,      0,     -60,    190, 0], 
                    TYPE: [exports.bombadier, { COLOR: 5, }],
                        }, {
                POSITION: [  14,     0,      0,     0,    360, 1], 
                    TYPE: [exports.bazooka, { COLOR: 5, }],
                        },
            ],
        };

    exports.palisade = (() => {
        let props = {
            SHOOT_SETTINGS: combineStats([g.factory, g.pound,]),
            TYPE: exports.minion,
            STAT_CALCULATOR: gunCalcNames.drone,                        
            AUTOFIRE: true,
            MAX_CHILDREN: 1,
            SYNCS_SKILLS: true,   
            WAIT_TO_CYCLE: true,
        };
        return {
            PARENT: [exports.miniboss],
            LABEL: 'Rogue Palisade',
            COLOR: 17,
            SHAPE: 6,
            SIZE: 28,
            VALUE: 500000,
            BODY: {
                FOV: 1.3,
                SPEED: base.SPEED * 0.1,
                HEALTH: base.HEALTH * 2,
                SHIELD: base.SHIELD * 2,
                REGEN: base.REGEN,
                DAMAGE: base.DAMAGE * 3,
            },
            GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   4,      6,    -1.6,     8,      0,      0,      0,   ], 
                    PROPERTIES: props, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     60,      0,   ], 
                    PROPERTIES: props, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     120,     0,   ], 
                    PROPERTIES: props, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
                        TYPE: exports.minion,
                        STAT_CALCULATOR: gunCalcNames.drone,                        
                        AUTOFIRE: true,
                        MAX_CHILDREN: 1,
                        SYNCS_SKILLS: true, 
                        WAIT_TO_CYCLE: true,  
                    }, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     240,     0,   ], 
                    PROPERTIES: props, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     300,     0,   ], 
                    PROPERTIES: props, },
            ],
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [   5,    10,      0,      30,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,      90,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     150,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     210,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     270,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     330,    110, 0], 
                    TYPE: exports.trapTurret,
                        },
            ],
        };
    })();
let mothershipProperties = {
    MAX_CHILDREN: 2,
    SHOOT_SETTINGS: combineStats([g.drone, g.over, g.mothership]),
    TYPE: exports.drone,
    AUTOFIRE: true,
    SYNCS_SKILLS: true,
    STAT_CALCULATOR: gunCalcNames.drone,
    WAIT_TO_CYCLE: true
};

let mothershipAutoProperties = {
    MAX_CHILDREN: 2,
    SHOOT_SETTINGS: combineStats([g.drone, g.over, g.mothership]),
    TYPE: [exports.drone, {
        AI: {
            skynet: true,
        },
        INDEPENDENT: true,
    }],
    AUTOFIRE: true,
    SYNCS_SKILLS: true,
    STAT_CALCULATOR: gunCalcNames.drone,
    WAIT_TO_CYCLE: true
};

exports.mothership = {
    PARENT: [exports.genericTank],
    LABEL: 'Mothership',
    NAME: 'Mothership',
    DANGER: 7,
   
    SIZE: 50,
    STAT_NAMES: statnames.drone,
    SKILL: skillSet({
        rld: 1,
        dam: 1,
        pen: 1,
        str: 1,
        spd: 1,
        atk: 1,
        hlt: 1,
        shi: 1,
        rgn: 1,
        mob: 1,
    }),
    VALUE: 400000,
    BODY: {
        REGEN: 0,
        FOV: 2.4,
        SHIELD: 0,
        ACCEL: 0.5,
        SPEED: 2,
        HEALTH: 500,
        PUSHABILITY: 0.15,
        DENSITY: 0.2,
    },
    GUNS: [{
        POSITION: [4.3, 3.1, 1.2, 8, 0, 22.5, 1],
        PROPERTIES: mothershipProperties
    }, {
        POSITION: [4.3, 3.1, 1.2, 8, 0, 45, 0.0625],
        PROPERTIES: mothershipAutoProperties
    }, {
        POSITION: [4.3, 3.1, 1.2, 8, 0, 67.5, 0.9375],
        PROPERTIES: mothershipProperties
    }, {
        POSITION: [4.3, 3.1, 1.2, 8, 0, 90, 0.125],
        PROPERTIES: mothershipAutoProperties
    }, {
        POSITION: [4.3, 3.1, 1.2, 8, 0, 112.5, 0.875],
        PROPERTIES: mothershipProperties
    }, {
        POSITION: [4.3, 3.1, 1.2, 8, 0, 135, 0.1875],
        PROPERTIES: mothershipAutoProperties
    }, {
        POSITION: [4.3, 3.1, 1.2, 8, 0, 157.5, 0.8125],
        PROPERTIES: mothershipProperties
    }, {
        POSITION: [4.3, 3.1, 1.2, 8, 0, 180, 0.25],
        PROPERTIES: mothershipAutoProperties
    }, {
        POSITION: [4.3, 3.1, 1.2, 8, 0, 202.5, 0.75],
        PROPERTIES: mothershipProperties
    }, {
        POSITION: [4.3, 3.1, 1.2, 8, 0, 225, 0.3125],
        PROPERTIES: mothershipAutoProperties
    }, {
        POSITION: [4.3, 3.1, 1.2, 8, 0, 247.5, 0.6875],
        PROPERTIES: mothershipProperties
    }, {
        POSITION: [4.3, 3.1, 1.2, 8, 0, 270, 0.375],
        PROPERTIES: mothershipAutoProperties
    }, {
        POSITION: [4.3, 3.1, 1.2, 8, 0, 292.5, 0.625],
        PROPERTIES: mothershipProperties
    }, {
        POSITION: [4.3, 3.1, 1.2, 8, 0, 315, 0.4375],
        PROPERTIES: mothershipAutoProperties
    }, {
        POSITION: [4.3, 3.1, 1.2, 8, 0, 337.5, 0.5625],
        PROPERTIES: mothershipProperties
    }, {
        POSITION: [4.3, 3.1, 1.2, 8, 0, 360, 0.5],
        PROPERTIES: mothershipAutoProperties
    }],
    LIFETIME: true
};
exports.modemothership = {
    PARENT: [exports.genericTank],
    LABEL: 'Mothership',
    NAME: 'Mothership',
    TYPE: 'mothership',
    DANGER: 7,
    CONTROLLERS: ['nearestDifferentMaster', 'minion', 'canRepel', 'fleeAtLowHealth',],
    AI: {
        NO_LEAD: true,
    },
  
    HITS_OWN_TYPE: 'hard',
    BROADCAST_MESSAGE: 'A Mothership has been killed!',
    SIZE: 50,
   TURRETS: [ {/******  SIZE      X       Y     ANGLE    ARC  LAYER */
    POSITION: [     0.1,  0,      0,        0,   -15,    0],
            TYPE: [exports.genericTank,
            {CONTROLLERS: ['onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'] }],
        },],
    STAT_NAMES: statnames.drone,
    SKILL: skillSet({
        rld: 1,
        dam: 1,
        pen: 1,
        str: 1,
        spd: 1,
        atk: 1,
        hlt: 1,
        shi: 1,
        rgn: 1,
        mob: 1,
    }),
    VALUE: 400000,
    BODY: {
        REGEN: 0,
        FOV: 2.4,
        SHIELD: 0,
        ACCEL: 0.5,
        SPEED: 2,
        HEALTH: 500,
        PUSHABILITY: 0.15,
        DENSITY: 0.2,
    },
    GUNS: [{
        POSITION: [4.3, 3.1, 1.2, 8, 0, 22.5, 1],
        PROPERTIES: mothershipProperties
    }, {
        POSITION: [4.3, 3.1, 1.2, 8, 0, 45, 0.0625],
        PROPERTIES: mothershipAutoProperties
    }, {
        POSITION: [4.3, 3.1, 1.2, 8, 0, 67.5, 0.9375],
        PROPERTIES: mothershipProperties
    }, {
        POSITION: [4.3, 3.1, 1.2, 8, 0, 90, 0.125],
        PROPERTIES: mothershipAutoProperties
    }, {
        POSITION: [4.3, 3.1, 1.2, 8, 0, 112.5, 0.875],
        PROPERTIES: mothershipProperties
    }, {
        POSITION: [4.3, 3.1, 1.2, 8, 0, 135, 0.1875],
        PROPERTIES: mothershipAutoProperties
    }, {
        POSITION: [4.3, 3.1, 1.2, 8, 0, 157.5, 0.8125],
        PROPERTIES: mothershipProperties
    }, {
        POSITION: [4.3, 3.1, 1.2, 8, 0, 180, 0.25],
        PROPERTIES: mothershipAutoProperties
    }, {
        POSITION: [4.3, 3.1, 1.2, 8, 0, 202.5, 0.75],
        PROPERTIES: mothershipProperties
    }, {
        POSITION: [4.3, 3.1, 1.2, 8, 0, 225, 0.3125],
        PROPERTIES: mothershipAutoProperties
    }, {
        POSITION: [4.3, 3.1, 1.2, 8, 0, 247.5, 0.6875],
        PROPERTIES: mothershipProperties
    }, {
        POSITION: [4.3, 3.1, 1.2, 8, 0, 270, 0.375],
        PROPERTIES: mothershipAutoProperties
    }, {
        POSITION: [4.3, 3.1, 1.2, 8, 0, 292.5, 0.625],
        PROPERTIES: mothershipProperties
    }, {
        POSITION: [4.3, 3.1, 1.2, 8, 0, 315, 0.4375],
        PROPERTIES: mothershipAutoProperties
    }, {
        POSITION: [4.3, 3.1, 1.2, 8, 0, 337.5, 0.5625],
        PROPERTIES: mothershipProperties
    }, {
        POSITION: [4.3, 3.1, 1.2, 8, 0, 360, 0.5],
        PROPERTIES: mothershipAutoProperties
    }],
    LIFETIME: true
};
exports.Turkey_Iris = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 19,
};

exports.Turkey_Eye = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 3,
    },
    FACING_TYPE: 'toTarget',
    COLOR: 18,
    TURRETS: [ { /****  SIZE      X       Y     ANGLE    ARC  LAYER */
        POSITION: [    10.75,     1,      0,        0,   -15,   1, ],
            TYPE: exports.Turkey_Iris,
        }
    ],
};

exports.Turkey_Head = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 2,
    },
    CONTROLLERS: ['onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
    TURRETS: [ {/*** SIZE      X       Y     ANGLE      ARC  LAYER */
        POSITION: [  6.5,   5.97,    -5.07,      0,      -15, 1],
            TYPE: exports.Turkey_Eye,
            }, {
        POSITION: [  6.5,   5.97,     5.07,      0,      -15, 1],
            TYPE: exports.Turkey_Eye,
            },
    ],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [ 19.81,  8.09,   -1.76,  5.48,      0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                TYPE: exports.bullet,
              AUTOFIRE: true,
            }, },
    ],
};

let TurkeyProperties = {
    MAX_CHILDREN: 4,
    SHOOT_SETTINGS: combineStats([g.drone, g.over, g.mothership]),
    TYPE: exports.drone,
    AUTOFIRE: true,
    SYNCS_SKILLS: true,
    STAT_CALCULATOR: gunCalcNames.drone,
    WAIT_TO_CYCLE: true
};

let TurkeyAutoProperties = {
    MAX_CHILDREN: 4,
    SHOOT_SETTINGS: combineStats([g.drone, g.over, g.mothership]),
    TYPE: [exports.drone, {
        AI: {
            skynet: true,
        },
        INDEPENDENT: true,
    }],
    AUTOFIRE: true,
    SYNCS_SKILLS: true,
    STAT_CALCULATOR: gunCalcNames.drone,
    WAIT_TO_CYCLE: true
};

exports.Turkey_Mothership = {
    PARENT: [exports.genericTank],
    LABEL: 'Turkey',
    NAME: 'Turkey',
    DANGER: 7,
    SIZE: 50,
    STAT_NAMES: statnames.drone,
    SKILL: skillSet({
        rld: 1,
        dam: 1,
        pen: 1,
        str: 1,
        spd: 1,
        atk: 1,
        hlt: 1,
        shi: 1,
        rgn: 1,
        mob: 1,
    }),
    VALUE: 400000,
    BODY: {
        REGEN: 0,
        FOV: 2.4,
        SHIELD: 0,
        ACCEL: 0.5,
        SPEED: 2,
        HEALTH: 500,
        PUSHABILITY: 0.15,
        DENSITY: 0.2,
    },
    LIFETIME: true,
TURRETS: [ {/******  SIZE      X       Y     ANGLE    ARC  LAYER */
    POSITION: [     10.76,  8.75,      0,        0,   -15,    1],
            TYPE: [exports.Turkey_Head,
            {CONTROLLERS: ['onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'] }],
        },],
GUNS: [ {/***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
    POSITION: [ 18.00,  4.69,     1,    0,      0,     135,    2/3,],
        PROPERTIES: TurkeyAutoProperties,
        }, {
    POSITION: [ 20.96,  6.69,     1,    0,      0,   157.5,    1/3,],
        PROPERTIES: TurkeyProperties,
        }, {
    POSITION: [ 18.00,  4.69,     1,    0,     0,      225,    2/3,],
        PROPERTIES: TurkeyAutoProperties,
        }, {
    POSITION: [ 20.96,  6.69,     1,    0,      0,   202.5,    1/3,],
        PROPERTIES: TurkeyProperties,
        }, {
    POSITION: [ 24.09,  8.69,     1,    0,      0,     180,      0,],
        PROPERTIES: TurkeyAutoProperties,
        }, {
    POSITION: [ 24.09,  8.69,     1,    0,      0,     180,      0,],
        PROPERTIES: TurkeyAutoProperties,
        }, {
    POSITION: [  4,     5,      1,     10,      0,     105,    0.1,],
        PROPERTIES: TurkeyProperties,
        }, {
    POSITION: [  4,     5,      1,     10,      0,    -105,    0.1,],
        PROPERTIES: TurkeyProperties,
        },
    ],
};
exports.summoner = {
        PARENT: [exports.miniboss],
        LABEL: 'Summoner',
        DANGER: 8,
        SHAPE: 4,
        COLOR: 13,
        SIZE: 25,
        MAX_CHILDREN: 28,
        FACING_TYPE: 'autospin',
        VARIES_IN_SIZE: true,
        VALUE: 200000,
        BODY: {
            FOV: 1.3,
            SPEED: base.SPEED * 0.1,
            HEALTH: base.HEALTH * 7,
            DAMAGE: base.DAMAGE * 2.6
        },
        SKILL: skillSet({
            atk: 1,
            hlt: 1,
            spd: 0.3,
            str: 0.6,
            pen: 0.6,
            dam: 0.5,
            rld: 1,
            rgn: 0.2,
            shi: 0.2
        }),
  TURRETS: [ {/******  SIZE      X       Y     ANGLE    ARC  LAYER */
    POSITION: [     10.76,  0,      0,        0,   -15,    0],
            TYPE: [exports.Turkey_Iris,
            {CONTROLLERS: ['onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'] }],
        },],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [ 3.5,   8.65,    1.2,     8,      0,     90,      0,   ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.summoner]),
                    TYPE: exports.sunchip,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.necro,
                    WAIT_TO_CYCLE: true,
                }, }, {
            POSITION: [ 3.5,   8.65,    1.2,     8,      0,     270,    0.5,  ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.summoner]),
                    TYPE: exports.sunchip,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.necro,
                    WAIT_TO_CYCLE: true,
                }, }, {
            POSITION: [ 3.5,   8.65,    1.2,     8,      0,      0,     0.25, ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.summoner]),
                    TYPE: exports.sunchip,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.necro,
                    WAIT_TO_CYCLE: true,
                }, }, {
            POSITION: [ 3.5,   8.65,    1.2,     8,      0,     180,    0.75  ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.summoner]),
                    TYPE: exports.sunchip,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.necro,
                    WAIT_TO_CYCLE: true,
                }, },
            ],
    };
exports.summonermk2eyeback = {
  PARENT: [exports.genericTank],
  COLOR: 7,
};
exports.summonermk2back = {
  PARENT: [exports.genericTank],
  COLOR: 17,
  FACING_TYPE: 'autospin',
  SHAPE: 4,
};
exports.summonermk2yellow = {
  PARENT: [exports.genericTank],
  COLOR: 13,
  FACING_TYPE: 'autospin',
  SHAPE: 4,
};
exports.summonermk2eye = {
  PARENT: [exports.genericTank],
  COLOR: 12,
};
exports.summonermk2part = {
  PARENT: [exports.genericTank],
  COLOR: 7,
  SKILL: skillSet({ 
                rld: 1,
                dam: 1,
                pen: 1,
                spd: 1,
                str: 1,
            }),
  SHAPE: 4,
   TURRETS: [ {/******  SIZE      X       Y     ANGLE    ARC  LAYER */
   
           POSITION: [     11,  0,      0,        0,   -15,    1],
            TYPE: [exports.summonermk2eye,
            {CONTROLLERS: ['onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'] }],
        }, {
           POSITION: [     7,  0,      0,        0,   360,    1],
            TYPE: [exports.sniper3gun,
            {CONTROLLERS: ['onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'] }],
        }, 
        ],
};
exports.summonermk2 = {
        PARENT: [exports.miniboss],
        LABEL: 'Summoner MK. II',
        DANGER: 8,
        SHAPE: 4,
        COLOR: 13,
        SIZE: 25,
        MAX_CHILDREN: 28,
        FACING_TYPE: 'autospin',
        VARIES_IN_SIZE: true,
        VALUE: 200000,
        BODY: {
            FOV: 1.3,
            SPEED: base.SPEED * 0.3,
            HEALTH: base.HEALTH * 10,
            DAMAGE: base.DAMAGE * 3
        },
        SKILL: skillSet({
            atk: 1,
            hlt: 1,
            spd: 0.3,
            str: 0.6,
            pen: 0.6,
            dam: 0.5,
            rld: 1,
            rgn: 0.2,
            shi: 0.2
        }),
  TURRETS: [ {/******  SIZE      X       Y     ANGLE    ARC  LAYER */
    POSITION: [     25,  0,      0,        0,   0,    1],
            TYPE: [exports.summonermk2back,
            {CONTROLLERS: ['onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'] }],
        }, {
           POSITION: [     20,  0,      0,        0,   0,    1],
            TYPE: [exports.summonermk2yellow,
            {CONTROLLERS: ['onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'] }],
        }, {
    POSITION: [     10.76,  0,      0,        0,   -15,    0],
            TYPE: [exports.Turkey_Iris,
            {CONTROLLERS: ['onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'] }],
        }, {
           POSITION: [     5,  0,      0,        0,   -15,    1],
            TYPE: [exports.summonermk2eyeback,
            {CONTROLLERS: ['onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'] }],
        }, {
           POSITION: [     2.5,  0,      0,        0,   -15,    1],
            TYPE: [exports.summonermk2eye,
            {CONTROLLERS: ['onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'] }],
        }, {
           POSITION: [     7,  8,      -8,        0,   -15,    1],
            TYPE: [exports.summonermk2part,
            ],
        }, {
           POSITION: [     7,  -8,      8,        0,   -15,    1],
            TYPE: [exports.summonermk2part,
            ],
        }, {
           POSITION: [     7,  8,      8,        0,   -15,    1],
            TYPE: [exports.summonermk2part,
            ],
        }, {
           POSITION: [     7,  -8,      -8,        0,   -15,    1],
            TYPE: [exports.summonermk2part,
            ],
        },
        ],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [ 5,   8.65,    1.2,     8,      0,     90,      0,   ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.summoner2]),
                    TYPE: exports.sunchip,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.necro,
                    WAIT_TO_CYCLE: true,
                }, }, {
            POSITION: [ 5,   8.65,    1.2,     8,      0,     270,    0.5,  ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.summoner2]),
                    TYPE: exports.sunchip,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.necro,
                    WAIT_TO_CYCLE: true,
                }, }, {
            POSITION: [ 5,   8.65,    1.2,     8,      0,      0,     0.25, ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.summoner2]),
                    TYPE: exports.sunchip,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.necro,
                    WAIT_TO_CYCLE: true,
                }, }, {
            POSITION: [ 5,   8.65,    1.2,     8,      0,     180,    0.75  ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.summoner2]),
                    TYPE: exports.sunchip,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.necro,
                    WAIT_TO_CYCLE: true,
                }, },
            ],
    };
exports.bot = {
     AUTO_UPGRADE: 'random',
    FACING_TYPE: 'looseToTarget',
    BODY: {
        SIZE: 10,
      FOV: 5,
    },
    //COLOR: 17,
  VALUE: 24000,
 SKILL: skillSet({ 
                rld: 1,
                dam: 1,
                pen: 1,
                spd: 1,
                str: 1,
            }),
    NAME: "ai_",
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'fleeAtLowHealth'
    ],
    AI: { STRAFE: true, },
};
exports.group = {
    LABEL: 'Drone',
    TYPE: 'Grouper',
    ACCEPTS_SCORE: false,
    DANGER: 2,
    CONTROL_RANGE: 0,
    SHAPE: [[-0.607,0.446],[-1.15,0],[-1.147,0.006],[-0.607,-0.414],[-0.61,-0.98],[0.8,-0.6],[0.81,0.6],[-0.607,1.006]],
    MOTION_TYPE: 'chase',
    FACING_TYPE: 'smoothToTarget',
    CONTROLLERS: [
        'nearestDifferentMaster',
        'canRepel',
        'mapTargetToGoal',
        'hangOutNearMaster'
    ],
    AI: { BLIND: true, },
    BODY: {
        PENETRATION: 1.2,
        PUSHABILITY: 0.6,
        ACCELERATION: 0.05,
        HEALTH: 0.6 * wepHealthFactor,
        DAMAGE: 1.25 * wepDamageFactor,
        SPEED: 3.8,
        RANGE: 200,
        DENSITY: 0.03,
        RESIST: 1.5,
        FOV: 0.8,
    },
    HITS_OWN_TYPE: 'hard',
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    BUFF_VS_FOOD: true,
};
 exports.trapefighter = {
    PARENT: [exports.miniboss],
    LABEL: 'Trape Fighter',
    SIZE: 30,
    COLOR: 2,
    FACING_TYPE: 'locksFacing',
    SHAPE: [[-0.607,0.446],[-1.15,0],[-1.147,0.006],[-0.607,-0.414],[-0.61,-0.98],[0.8,-0.6],[0.81,0.6],[-0.607,1.006]],
      BODY: {
                    FOV: 1.3,
                    HEALTH: base.HEALTH * 20,
                    SHIELD: base.SHIELD * 5,
                    DENSITY: base.DENSITY * 5,
                   SPEED: base.SPEED * 0.75
                },
    TURRETS: [ {/******  SIZE      X       Y     ANGLE    ARC  LAYER */
    POSITION: [     10.76,  0,      0,        0,   -15,    0],
            TYPE: [exports.Turkey_Iris,
            {CONTROLLERS: ['onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'] }],
        },],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  13,     2,      1,      0,    -2.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  13,     2,      1,      0,     2.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin]),
                            TYPE: exports.bullet,
                        }, }, {
            POSITION: [   4,     9,    1.2,     6,      1,      75,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                    TYPE: exports.group,
                    MAX_CHILDREN: 5,
                    AUTOFIRE: true,
                  }, }, {
                  POSITION: [   4,     9,    1.2,     6,      -1,      -75,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                    TYPE: exports.group,
                     MAX_CHILDREN: 5,
                    AUTOFIRE: true,
                }, },
        ],
    };
exports.neut = {
    PARENT: [exports.miniboss],
    LABEL: 'NEUTRALIZER',
    SIZE: 30,
   FACING_TYPE: 'locksFacing',
    COLOR: 1,
     SHAPE: [[-0.99,-0.6],[1.2,-0.227],[1.2,0.2],[-0.99,0.587]],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  13,     2,      1,      0,    -2.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  13,     2,      1,      0,     2.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin]),
                            TYPE: exports.bullet,
                        }, }, {
            POSITION: [   4,     9,    1.2,     6,      1,      80,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                    TYPE: exports.group,
                    MAX_CHILDREN: 5,
                    AUTOFIRE: true,
                  }, }, {
                  POSITION: [   4,     9,    1.2,     6,      -1,      -80,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                    TYPE: exports.group,
                     MAX_CHILDREN: 5,
                    AUTOFIRE: true,
                  }, }, {
                  POSITION: [    12,     10,     1.4,     8,      0,      180,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
                }, },
        ],
    };
 exports.visultima = {
            PARENT: [exports.miniboss],
            LABEL: 'Vis Ultima',
    FACING_TYPE: 'locksFacing',
            SIZE: 40,
            COLOR: 11,
            RESET_UPGRADES: false,
            SHAPE: [[-0.01,0.25],[-0.31,0.97],[0.81,0.21],[0.81,-0.21],[-0.27,-0.95],[-0.007,-0.24],[0.43,-0.01]],
   BODY: {
                    FOV: 1.3,
                    HEALTH: base.HEALTH * 50,
                    SHIELD: base.SHIELD * 10,
                    DENSITY: base.DENSITY * 5,
                   SPEED: base.SPEED * 0.25
                },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  7,     5,      1,      5,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.halfreload]),
            TYPE: exports.nade4,
          }, },  {
          POSITION: [  4,     7,      1,      -3.7,      0,      180,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.doublereload]),
            TYPE: exports.VisDrone,
            MAX_CHILDREN: 15,
        }, },
            ],
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  3,     2,      4,       0,    360,   1, ],  
                    TYPE: [exports.VisTurret, { INDEPENDENT: false, COLOR: 16, }]
              }, {
              POSITION: [  3,     2,      -4,       0,    360,   1, ],  
                    TYPE: [exports.VisTurret, { INDEPENDENT: false, COLOR: 16, }]
                    },
            ],
        } 
//exports.testbed.UPGRADES_TIER_1.push(exports.summonermk2, exports.sassafras);
exports.bosses.UPGRADES_TIER_1.push(exports.elite_sprayer, exports.elite_destroyer, exports.elite_gunner, exports.elite_trapper, exports.skimboss, exports.palisade, exports.summoner, exports.sigma, exports.summonermk2, exports.sassafras, exports.aquamarine, exports.arrasian, exports.trapefighter, exports.neut, exports.visultima,);
exports.bosses2.UPGRADES_TIER_1.push(exports.bow, exports.bowShard,exports.bowCore, exports.blitzkrieg, exports.sheathBoss, exports.elite_bombadier,exports.xyv);
exports.misc.UPGRADES_TIER_1.push(exports.mothership, exports.Turkey_Mothership, exports.baseProtector, exports.arenacloser);
