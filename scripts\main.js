
// Import any other script files here, e.g.:
// import * as myModule from "./mymodule.js";


const NUM_PROJECTILES = 100;
const NUM_COMPS = 100;

runOnStartup(async runtime =>
{
	// Code to run on the loading screen.
	// Note layouts, objects etc. are not yet available.
	
	runtime.addEventListener("beforeprojectstart", () => OnBeforeProjectStart(runtime));
});

async function OnBeforeProjectStart(runtime)
{
	// Code to run just before 'On start of layout' on
	// the first layout. Loading has finished and initial
	// instances are created and available to use here.
	
	runtime.addEventListener("tick", () => Tick(runtime));
}

		const SCREEN_WIDTH = 800;
		const SCREEN_HEIGHT = 600;
		

function yeniseiMove(player, keyboard, playerSpeed, dt) 
{
	if (keyboard.isKeyDown("ArrowRight"))
		{
			player.x += playerSpeed*dt;
			if(player.x > SCREEN_WIDTH)
				player.x = SCREEN_WIDTH;
		}

		if (keyboard.isKeyDown("ArrowLeft"))
		{
			player.x -= playerSpeed*dt;
			if(player.x < 0)
				player.x = 0;
		}
}

function hildegardeMove(hildegarde, keyboard) {
    if(hildegarde.death)
      hildegarde.animationFrame = 7;
	  else {
    if (keyboard.isKeyDown("ArrowUp"))
		{

      hildegarde.attackDirectionTicks++;
      if(hildegarde.attackDirectionTicks % 5 == 0)
		hildegarde.attackDirection--;
    }
    if(keyboard.isKeyDown("ArrowDown")){
	hildegarde.aimed = true;
      hildegarde.attackDirectionTicks++;
      if(hildegarde.attackDirectionTicks % 5 == 0)
		hildegarde.attackDirection++;
    }
	
		if(hildegarde.attackDirection > 5)
		hildegarde.attackDirection = 5;
		if(hildegarde.aimed) {
		if(hildegarde.attackDirection < 1)
		hildegarde.attackDirection = 1;
		} else {
		if(hildegarde.attackDirection < 0)
		hildegarde.attackDirection = 0;
		}
		
    switch(hildegarde.attackDirection) {
    case 0: hildegarde.animationFrame = 0; break;
    case 1: hildegarde.animationFrame = 1; break;
    case 2: hildegarde.animationFrame = 2; break;
    case 3: hildegarde.animationFrame = 3; break;
    case 4: hildegarde.animationFrame = 4; break;
    case 5: hildegarde.animationFrame = 5; break;
    }
	}
	
}

function moveBackground(background, number) {
	background.x -= number;
	background.supplement.x -= number;
	if(background.x <= -background.width)
		background.x = 0;
	if(background.supplement.x <= 0)
		background.supplement.x = background.width;
}

function shootHG(proj, spd, shotProj, attackDirection, dt) {
if(!shotProj) {
	let multp = 45;
    switch(attackDirection) {
    case 0:
      break;
    case 1: proj.dx = spd*dt*multp;
      proj.dy = 0;
      proj.angleDegrees = 0.0;
      break;
    case 2: proj.dx = 10.6*dt*multp;
      proj.dy = -10.6*dt*multp;
      proj.angleDegrees = 315.0;
      break;
    case 3: proj.dx = 0;
      proj.dy = -spd*dt*multp;
      proj.angleDegrees = 270.0;
      break;
    case 4: proj.dx = -10.6*dt*multp;
      proj.dy = -10.6*dt*multp;
      proj.angleDegrees = 225.0;
      break;
    case 5: proj.dx = -spd*dt*multp;
      proj.dy = 0;
      proj.angleDegrees = 180.0;
      break;
    }
	}
	proj.x += proj.dx;
	proj.y += proj.dy;
}

function checkCollision(a, b)
{
    //The sides of the rectangles
    let leftA, leftB;
    let rightA, rightB;
    let topA, topB;
    let bottomA, bottomB;

    //Calculate the sides of rect A
    leftA = a.x;
    rightA = a.x + a.width;
    topA = a.y;
    bottomA = a.y + a.height;

    //Calculate the sides of rect B
    leftB = b.x;
    rightB = b.x + b.width;
    topB = b.y;
    bottomB = b.y + b.height;

    //If any of the sides from A are outside of B
    if( bottomA <= topB )
    {
        return false;
    }

    if( topA >= bottomB )
    {
        return false;
    }

    if( rightA <= leftB )
    {
        return false;
    }

    if( leftA >= rightB )
    {
        return false;
    }

    //If none of the sides from A are outside B
    return true;
}

function moveToXY(foo, x, y, speed, drag, stopAtTarget) {
  if(foo.changeMove) {
    foo.changeMove = false;
    foo.moved = false;
  }
  if(!foo.moved) {
    const side1 = y - foo.y;
    const side2 = foo.x - x;
    const r = Math.sqrt(side1 * side1 + side2 * side2);
    let sinAngle = (side1/r);
    let cosAngle = (side2/r);
    foo.distance = r;
    if(foo.x > x) {
      foo.dx = -speed*cosAngle;
    }
    else {
      cosAngle = -cosAngle;
      foo.dx = speed*cosAngle;
    }
    if(foo.y < y)
      foo.dy = speed*sinAngle;
    else {
      sinAngle = -sinAngle;
      foo.dy = -speed*sinAngle;
    }
	//console.log(foo.dx + "/" + foo.dy + "/" + r + "/" + sinAngle + "/" + cosAngle + "/" + speed + "/" + side1 + "/" + side2 + "/" + foo.x + "/" + foo.y + "/" + foo.moved + "/" + speed);
    foo.reachedTarget = false;
    foo.moved = true;
  }
    const distanceX = foo.x - x;
  const distanceY = y - foo.y;
  if(drag) {
  if(Math.abs(distanceX) > Math.abs(foo.dx) || Math.abs(distanceY) > Math.abs(foo.dy)) {
    let speedMod = Math.sqrt(distanceX*distanceX + distanceY*distanceY)/foo.distance;
    if(speedMod > 1)
      speedMod = 0.1;
    foo.dx *= speedMod;	
    foo.dy *= speedMod;
    foo.x += foo.dx; foo.y += foo.dy;
    if(speedMod != 0) {
      foo.dx /= speedMod;
      foo.dy /= speedMod;
    }
    //printf("%g/%g/%g/%g/%g/%g/%g/%g\n", distanceX, distanceY, distance, speedMod, dx, dy, x, y);
  } else {
    foo.x = x; foo.y = y;
    foo.dx = 0; foo.dy = 0;
    foo.reachedTarget = true;
  }	
  } else {
  if((Math.abs(distanceX) > Math.abs(foo.dx) || Math.abs(distanceY) > Math.abs(foo.dy)) || !stopAtTarget) {
  	foo.x += foo.dx;
	foo.y += foo.dy;
	} else {
	  foo.x = x; foo.y = y;
    foo.dx = 0; foo.dy = 0;
	foo.reachedTarget = true;
	}
	
  }

}

function isOnScreen(foo) {
	if(foo.x < 0 || foo.x > SCREEN_WIDTH || foo.y < 0 || foo.y > SCREEN_HEIGHT)
		return false;
	else
		return true;
}

function createGhost1(ghost1) {

	  ghost1.switchMove = false;
	  ghost1.changeMove = false;
	  ghost1.moved = false;
	  ghost1.reachedTarget = false;
	  ghost1.enemyDead = false;
	  ghost1.moveY = 25;
	  ghost1.actionTicks = 0;
	  ghost1.moveX = SCREEN_WIDTH - ghost1.width;
	  ghost1.dx = 0;
	  ghost1.dy = 0;
	  ghost1.distance = 0;
	  ghost1.projectileTicks = 0;
	  ghost1.projs = [];
	  ghost1.shootProj = [];
	  for(let j = 0; j < NUM_PROJECTILES; j++) {
	  	ghost1.shootProj[j] = false; 
		}
}

function bulletsOutOfScreen(ghost) {
	let outOfScreen = true;
	for(let i = 0; i < NUM_PROJECTILES; i++) {
		if(ghost.shootProj[i]) {
			outOfScreen = false;
			break;
		}
	}
	return outOfScreen;
}

let actualScore = 0; let score = 0; let levelTicks = 0; let backgroundTicks = 0; let initialized = false; let showedStartSign = false; const HGProjs = []; const HGShootProj = []; const ghost1 = []; const ghost1Exists = []; const ghost1Projs = []; const ghost1ShootProj = []; let difficulty =0;

function Tick(runtime)
{
	// Code to run every tick
	const keyboard = runtime.keyboard; const dt = runtime.dt;const floor1 = runtime.objects.floor1.getFirstInstance();const floor1Sup = runtime.objects.floor1Sup.getFirstInstance();	const yenisei = runtime.objects.yenisei.getFirstInstance();	const hildegarde = runtime.objects.hildegarde.getFirstInstance();	let HGBox = {x:hildegarde.x+hildegarde.width/2, y:hildegarde.y+hildegarde.h/2, width:6, height:6};const lombard = runtime.objects.lombard.getFirstInstance();const playerSpeed = 500;const mountainSky = runtime.objects.mountSky.getFirstInstance();const mountainBack = runtime.objects.mountBack.getFirstInstance();	
	const mountainFront = runtime.objects.mountFront.getFirstInstance();	
	const mountainClouds = runtime.objects.mountClouds.getFirstInstance();
	const startSign = runtime.objects.Start.getFirstInstance();
	const scoreText = runtime.objects.Score.getFirstInstance();
	
	if(!initialized)  {
		for(let i = 0; i < NUM_PROJECTILES; i++) {
			HGShootProj[i] = false;
			ghost1ShootProj[i] = false;
	}
	for(let i = 0; i < NUM_COMPS; i++) 
	ghost1Exists[i] = false;
	hildegarde.projectilesShot = 0;
	initialized = true;
	hildegarde.projectileTicks = 0;
	hildegarde.attackDirection = 0;
	hildegarde.attackDirectionTicks = 0;
	hildegarde.death = false;
	hildegarde.aimed = false;
	mountainBack.supplement = runtime.objects.mountBack2.getFirstInstance();	
	mountainFront.supplement = runtime.objects.mountFront2.getFirstInstance();	
	mountainClouds.supplement = runtime.objects.mountClouds2.getFirstInstance();
	startSign.moved = false;
	startSign.changeMove = false;
	}
	
	if(score < actualScore)
		score += 20;
	if(!hildegarde.death)
		scoreText.text = "Score: " + score;
	else {
		scoreText.sizePt = 50;
		if(score < 100)scoreText.x = SCREEN_WIDTH/2-SCREEN_WIDTH/6; else if(score < 1000) scoreText.x = SCREEN_WIDTH/2-SCREEN_WIDTH/5; else if(score < 10000) scoreText.x = SCREEN_WIDTH/2-SCREEN_WIDTH/5; else if(score >= 10000) scoreText.x = SCREEN_WIDTH/2-SCREEN_WIDTH/4;
		scoreText.y = SCREEN_HEIGHT/2-SCREEN_HEIGHT/6;
		scoreText.text = "Score: " + score;
		startSign.text = "Thank you for playing!"; startSign.sizePt = 20; startSign.fontColor = [255, 255, 255]; startSign.x = SCREEN_WIDTH/2-SCREEN_WIDTH/6+5; startSign.y = scoreText.y + 100;
	}
	
	backgroundTicks++;
	levelTicks++;
	
	HGBox.x = hildegarde.x;
	HGBox.y = hildegarde.y;
	HGBox.width = 8;
	HGBox.height = 8;

	//console.log(hildegarde.projectilesShot + "/" + HGShootProj[hildegarde.projectilesShot]);

	moveBackground(mountainClouds, 0.1); moveBackground(mountainBack, 1); moveBackground(mountainFront, 2);
	
	floor1.x -= 5;
	floor1Sup.x -= 5;
	if(floor1.x <= -SCREEN_WIDTH)
		floor1.x = 0;
	if(floor1Sup.x <= 0)
		floor1Sup.x = SCREEN_WIDTH;
	
	if(!showedStartSign) {
	if(levelTicks < 90)
		moveToXY(startSign, SCREEN_WIDTH/2-SCREEN_WIDTH/8, startSign.y, 15, false, true);
	else if(levelTicks == 90) {
		startSign.changeMove = true;
	} else {
		if(isOnScreen(startSign))
			moveToXY(startSign, SCREEN_WIDTH+50, startSign.y, 15, false, true);
		else {
			//startSign.destroy();
			showedStartSign = true;
			}
	}
	}
	let addPerWave = 5;	
	if(levelTicks == 1) {
	//levelTicks = 3000;
	for(let i = 0; i < 10 + difficulty*addPerWave; i++)  {	
	  if(!ghost1Exists[i]) {
	  ghost1[i] = runtime.objects.ghost1.createInstance(4, 0 - i*(25 + 10), 0 - 25);
	  createGhost1(ghost1[i]);
	  ghost1Exists[i] = true;
	  moveToXY(ghost1[i], ghost1[i].moveX, ghost1[i].moveY, 5, false, true);
	  }
	  }
     } 
	 
	 else if(levelTicks == 300) {
	 	for(let i = 10 + difficulty*addPerWave; i < 20 + difficulty*addPerWave*2; i++)  {	
			  if(!ghost1Exists[i]) {
	 	ghost1[i] = runtime.objects.ghost1.createInstance(4, SCREEN_WIDTH + (i-20)*(25 + 10), 0 - 25);
	  createGhost1(ghost1[i]);
	  //ghost1[i].switchMove = true;
	  ghost1Exists[i] = true;
	  moveToXY(ghost1[i], ghost1[i].moveX, ghost1[i].moveY, 5, false, true);
	  }
	  }
	  }
	  
	  else if(levelTicks == 600) {
	  levelTicks = 0;
	  	if(actualScore < 5000) difficulty = 0; else if(actualScore < 10000) difficulty = 1; else if(actualScore < 15000) difficulty = 2; //else if(actualScore < 10000) difficulty = 3;
			
		if(20+difficulty*addPerWave*2 > NUM_COMPS)
			difficulty--;
		}
	 
	 for(let i = 0; i < NUM_COMPS; i++)  {	
	 if(ghost1Exists[i]) {
	 if(ghost1[i].y < SCREEN_HEIGHT && !ghost1[i].enemyDead) {
	 ghost1[i].actionTicks++;
	  if(!ghost1[i].switchMove) {
	moveToXY(ghost1[i], ghost1[i].moveX, ghost1[i].moveY, 5, false, true);
	if(ghost1[i].reachedTarget) {
	  ghost1[i].changeMove = true;
	  ghost1[i].switchMove = true;
	  ghost1[i].moveY = ghost1[i].actionTicks;
	}
      } else {
	moveToXY(ghost1[i], -ghost1[i].moveX + (SCREEN_WIDTH - ghost1[i].width), ghost1[i].moveY, 5, false, true);
	if(ghost1[i].reachedTarget) {
	  ghost1[i].changeMove = true;
	  ghost1[i].switchMove = false;
	  ghost1[i].moveY = ghost1[i].actionTicks;
	}
      }
	  if(ghost1[i].projectileTicks % 60 == 0) {
	  	ghost1[i].projs[ghost1[i].projectileTicks/60] = runtime.objects.bullet1.createInstance(4, ghost1[i].x, ghost1[i].y);
	    ghost1[i].projs[ghost1[i].projectileTicks/60].moveX = HGBox.x;
		ghost1[i].projs[ghost1[i].projectileTicks/60].moveY = HGBox.y;
		ghost1[i].shootProj[ghost1[i].projectileTicks/60] = true;
	  }
	  ghost1[i].projectileTicks++;
	  if(ghost1[i].projectileTicks/60 > NUM_PROJECTILES)
	  	ghost1[i].projectileTicks = 0;
	   for(let j = 0; j < NUM_PROJECTILES; j++) {
	   if(ghost1[i].shootProj[j]) {
	   	moveToXY(ghost1[i].projs[j], ghost1[i].projs[j].moveX, ghost1[i].projs[j].moveY, 5, false, false);
		if(checkCollision(ghost1[i].projs[j], HGBox)) {
			hildegarde.death = true;
			ghost1[i].shootProj[j] = false;
		}
		
		if(!isOnScreen(ghost1[i].projs[j])) {
			ghost1[i].shootProj[j] = false;
		}
		if(!ghost1[i].shootProj[j])
			ghost1[i].projs[j].destroy();
	   } 
	   	if(HGShootProj[j]) {
	  		if(checkCollision(HGProjs[j], ghost1[i])) {
				ghost1[i].enemyDead = true;
				HGProjs[j].destroy();
				HGShootProj[j] = false;
				actualScore += 100;
			}
		}
	  }
	  } else {
	  ghost1[i].isVisible= false;
	  	for(let j = 0; j < NUM_PROJECTILES; j++) {
	   if(ghost1[i].shootProj[j]) {
	   	moveToXY(ghost1[i].projs[j], ghost1[i].projs[j].moveX, ghost1[i].projs[j].moveY, 5, false, false);
		if(checkCollision(ghost1[i].projs[j], HGBox)) {
			hildegarde.death = true;
			ghost1[i].shootProj[j] = false;
		}
		
		if(!isOnScreen(ghost1[i].projs[j])) {
			ghost1[i].shootProj[j] = false;
		}
		if(!ghost1[i].shootProj[j])
			ghost1[i].projs[j].destroy();
	   } 
	   }
	  	if(bulletsOutOfScreen(ghost1[i])) {
	  		ghost1[i].destroy();
			ghost1Exists[i] = false;
		}
	  }
	  }
	  }
		
	yeniseiMove(yenisei, keyboard, playerSpeed, dt);
	hildegardeMove(hildegarde, keyboard);
	
	if(keyboard.isKeyDown("KeyZ") && !hildegarde.death && !hildegarde.attackDirection == 0){
		hildegarde.projectileTicks++;
		if(hildegarde.projectileTicks % 15 == 0) { 
		HGProjs[hildegarde.projectilesShot] = runtime.objects.HGArrow.createInstance(4, hildegarde.x, hildegarde.y);
		HGProjs[hildegarde.projectilesShot].dx = 0;
		HGProjs[hildegarde.projectilesShot].dy = 0;
		shootHG(HGProjs[hildegarde.projectilesShot], 15, HGShootProj[hildegarde.projectilesShot], hildegarde.attackDirection, dt);
		HGShootProj[hildegarde.projectilesShot] = true;
		hildegarde.projectilesShot++;
		if(hildegarde.projectilesShot >= NUM_PROJECTILES)
			hildegarde.projectilesShot = 0;
    }
    }
	
	for(let i = 0; i < NUM_PROJECTILES; i++) {
		if(HGShootProj[i]) {
			shootHG(HGProjs[i], 15, HGShootProj[i], hildegarde.attackDirection, dt);
			if(HGProjs[i].y < 0 || HGProjs[i].x < 0 || HGProjs[i].x > SCREEN_WIDTH) {
				HGProjs[i].destroy();
				HGShootProj[i] = false;
			}
		}
	}
	lombard.x = yenisei.x+4;
	hildegarde.x = yenisei.x-10;
	if(yenisei.animationFrame == 10)
		hildegarde.y = yenisei.y-21;
	else
		hildegarde.y = yenisei.y-20;
}
