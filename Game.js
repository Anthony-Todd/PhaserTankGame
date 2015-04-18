
BasicGame.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

    this.map;
    this.background;

    this.playerTank;
};

BasicGame.Game.prototype = {

    create: function () {

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

        //  Because we're loading CSV map data we have to specify the tile size here or we can't render it
        this.map = this.add.tilemap('testMap', 10, 10);

        //  Now add in the tileset
        this.map.addTilesetImage('grass');
        //this.map.addTilesetImage('grass');  
        //  Create our.background
        this.background = this.map.createLayer('test_0');

        //  Resize the world
        this.background.resizeWorld();

        this.cursors = this.input.keyboard.createCursorKeys();


        this.playerTank = this.game.add.group();
        var body = this.playerTank.create(0,0,'tanks','tankBlue.png',true);
        body.anchor.setTo(0.5, 0.5);
        var barrel = this.playerTank.create(-8,0,'tanks','barrelBlue.png',true);
        body.anchor.setTo(0.5, 0.0);

        this.playerTank.position.setTo(64,64);
        this.playerTank.scale.setTo(0.5, 0.5);

        this.playButton = this.add.button(8, 8, 'buttons', this.quitGame, this, 'quit_over', 'quit_normal', 'quit_pressed');
        this.playButton.fixedToCamera = true;

    },

    update: function () {

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

        if (this.cursors.left.isDown)
        {
            this.camera.x -= 4;
        }
        else if (this.cursors.right.isDown)
        {
            this.camera.x += 4;
        }

        if (this.cursors.up.isDown)
        {
            this.camera.y -= 4;
        }
        else if (this.cursors.down.isDown)
        {
            this.camera.y += 4;
        }

        this.camera.update();
    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    }

};
