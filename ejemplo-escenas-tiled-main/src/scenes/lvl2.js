var player;
var stars;
var bombs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;
var star2;
 export class lvl2 extends Phaser.Scene {

    constructor() {
      // Se asigna una key para despues poder llamar a la escena
      super("lvl2");
    }
    

  
    preload() {
        this.load.image("fondoespacio", "public/assets/images/esp3.png");
        this.load.image("ground", "public/assets/images/plataform2.png");
        this.load.image("star", "public/assets/images/star.png");
        this.load.image("bomb", "public/assets/images/bomb.png");
        this.load.spritesheet("dude", "public/assets/images/dude2.png", {
            frameWidth: 32,
            frameHeight: 48,
        });
        this.load.image("star2", "public/assets/images/star2.png");
    }

   create() {
        //  A simple background for our game
        this.add.image(400, 300, "fondoespacio"); //.setScale(0);

        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = this.physics.add.staticGroup();

        //  Here we create the ground.
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        platforms.create(400, 568, "ground").setScale(2).refreshBody();

        //  Now let's create some ledges
        platforms.create(350, 400, "ground");
        platforms.create(4, 250, "ground");
        platforms.create(600, 100, "ground");

        // The player and its settings
        player = this.physics.add.sprite(70, 380, "dude");

        //  Player physics properties. Give the little guy a slight bounce.
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        //  Our player animations, turning, walking left and walking right.
        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 0,
                end: 3,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "turn",
            frames: [{ key: "dude", frame: 4 }],
            frameRate: 20,
        });

        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 5,
                end: 8,
            }),
            frameRate: 10,
            repeat: -1,
        });

        //  Input Events
        cursors = this.input.keyboard.createCursorKeys();

        //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
        stars = this.physics.add.group({
            key: "star",
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 },
        });

        star2 = this.physics.add.group({
            key: "star2",
            repeat: 5,
            setXY: { x: 40, y: 0, stepX: 140 },
        });

        stars.children.iterate(function (child) {
            //  Give each star a slightly different bounce
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        star2.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.3, 1));
        });

        bombs = this.physics.add.group();

        //  The score
        scoreText = this.add.text(630, 16, "Puntos: 0", {
            fontSize: "32px",
            fill: "#FFFFFF",
            fontFamily: "verdana, arial, sans-self",
        });

        //  Collide the player and the stars with the platforms
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(stars, platforms);
        this.physics.add.collider(bombs, platforms);
        this.physics.add.collider(star2, platforms);

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        this.physics.add.overlap(
            player,
            stars,
            collectStar,
            null,
            this
        );
        this.physics.add.overlap(
            player,
            star2,
            collectStar2,
            null,
            this
        );
        this.physics.add.collider(player, bombs, hitBomb, null, this);

    }

  update() {
        if (gameOver) {
        this.scene.restart();
        gameOver = false;
            return;
        }

        if (cursors.left.isDown) {
            player.setVelocityX(-160);

            player.anims.play("left", true);
        } else if (cursors.right.isDown) {
            player.setVelocityX(160);

            player.anims.play("right", true);
        } else {
            player.setVelocityX(0);

            player.anims.play("turn");
        }

        if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-330);
        }
    }

     collectStar(player, star) {
        star.disableBody(true, true);

        //  Add and update the score
        score += 10;
        scoreText.setText("Puntos: " + score);

        if (stars.countActive(true) === 0) {
            //  A new batch of stars to collect
            stars.children.iterate(function (child) {
                child.enableBody(true, child.x, 0, true, true);
            });

            var x =
                player.x < 400
                    ? Phaser.Math.Between(400, 800)
                    : Phaser.Math.Between(0, 400);

            var bomb = bombs.create(x, 16, "bomb");
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;
        }
    }
     collectStar2(player, star) {
        star.disableBody(true, true);

        //  Add and update the score
        score += 15;
        scoreText.setText("Puntos: " + score);

        if (star2.countActive(true) === 0) {
            //  A new batch of stars to collect
            star2.children.iterate(function (child) {
                child.enableBody(true, child.x, 0, true, true);
            });
        }
    }

     hitBomb(player, bomb) {
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play("turn");
        gameOver = true;
    }

 }