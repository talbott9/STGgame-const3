
// Import any other script files here, e.g.:
// import * as myModule from "./mymodule.js";

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

let backgroundTicks = 0;
let initialized = false;
function Tick(runtime)
{
	// Code to run every tick
		const keyboard = runtime.keyboard;
	const dt = runtime.dt;
	const floor1 = runtime.objects.floor1.getFirstInstance();
	const floor1Sup = runtime.objects.floor1Sup.getFirstInstance();	
	const yenisei = runtime.objects.yenisei.getFirstInstance();	
	const hildegarde = runtime.objects.hildegarde.getFirstInstance();	
	const lombard = runtime.objects.lombard.getFirstInstance();
	const playerSpeed = 500;
	const mountainSky = runtime.objects.mountSky.getFirstInstance();
	const mountainBack = runtime.objects.mountBack.getFirstInstance();	
	const mountainFront = runtime.objects.mountFront.getFirstInstance();	
	const mountainClouds = runtime.objects.mountClouds.getFirstInstance();
	
	if(!initialized)  {
	initialized = true;
	hildegarde.attackDirection = 0;
	hildegarde.attackDirectionTicks = 0;
	hildegarde.death = false;
	hildegarde.aimed = false;
	mountainBack.supplement = runtime.objects.mountBack2.getFirstInstance();	
	mountainFront.supplement = runtime.objects.mountFront2.getFirstInstance();	
	mountainClouds.supplement = runtime.objects.mountClouds2.getFirstInstance();
	}
	
	backgroundTicks++;

	console.log(hildegarde.attackDirectionTicks);

	moveBackground(mountainClouds, 0.1);
	moveBackground(mountainBack, 1);
	moveBackground(mountainFront, 2);
	
	floor1.x -= 5;
	floor1Sup.x -= 5;
	if(floor1.x <= -SCREEN_WIDTH)
		floor1.x = 0;
	if(floor1Sup.x <= 0)
		floor1Sup.x = SCREEN_WIDTH;
		
	yeniseiMove(yenisei, keyboard, playerSpeed, dt);
	hildegardeMove(hildegarde, keyboard);
	lombard.x = yenisei.x+4;
	hildegarde.x = yenisei.x-10;
	if(yenisei.animationFrame == 10)
		hildegarde.y = yenisei.y-21;
	else
		hildegarde.y = yenisei.y-20;
}
