// Charles Emerson
// Started: 10 Nov 2018
// Updated: 11 Nov 2018
// 
// For Hackathon 2018

function getIndex(i : number, j : number) : number {
    return 9*i + j;
}

class HackathonApp {
    renderingContext: FxRenderingContext;
    t0 = 0;
    t1 = 0;
    dt = 0;
    uiUpdateTime = 0;

    controls: MyControls;
    skipBehind: boolean = true;

    shaderProgram: WebGLProgram | null = null;

    aVertexLocation : number = 0;
    aColorLocation : number = 0;
    uModelViewMatrixLocation : WebGLUniformLocation | null = null;
    uProjectionMatrixLocation : WebGLUniformLocation | null = null;
    uColor : WebGLUniformLocation | null = null;
    uWorldMatrixLocation : WebGLUniformLocation | null = null;

    surfaces : MyShape = new MyShape();
    subfaces : Array<number> = new Array<number>(54);

    constructor(public width: number = 512, public height: number = 384) {
        hflog.logElement = "log";
        width = Math.floor(document.body.clientWidth);
        height = Math.floor(width * 3.0 / 4.0);
        this.renderingContext = new FxRenderingContext(width, height, "app");
        this.width = this.renderingContext.width;
        this.height = this.renderingContext.height;
        if (!this.renderingContext) {
            hflog.log('Unable to create new FxRenderingContext');
        }

        this.controls = new MyControls();
    }

    run(): void {
        this.init();
        this.mainloop(0);
    }

    private init(): void {
        this.loadShaders();
        this.loadScenegraph();
    }

    private loadShaders(): void {
        let gl = this.renderingContext.gl;

        const vsSource = `#version 100
        #extension GL_OES_standard_derivatives: enable

        attribute vec4 aVertexPosition;
        attribute vec4 aColor;

        uniform mat4 uModelViewMatrix;
        uniform mat4 uProjectionMatrix;
        uniform mat4 uWorldMatrix;

        void main() {
            vec4 worldPosition = uWorldMatrix * aVertexPosition;

            gl_Position = uProjectionMatrix * uModelViewMatrix * worldPosition;
            gl_PointSize = 3.0;
        }
        `;
        const vertexShader = this.loadShader(gl.VERTEX_SHADER, vsSource);

        const fsSource = `#version 100
        #extension GL_OES_standard_derivatives: enable

        precision mediump float;
        uniform vec3 uColor;
        void main() {
            gl_FragColor = vec4(uColor, 1.0);
        }
        `;

        const fragmentShader = this.loadShader(gl.FRAGMENT_SHADER, fsSource);

        const shaderProgram = gl.createProgram();
        if (shaderProgram && vertexShader && fragmentShader) {
            gl.attachShader(shaderProgram, vertexShader);
            gl.attachShader(shaderProgram, fragmentShader);
            gl.linkProgram(shaderProgram);

            if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
                hflog.error("Unable to initialize shader program: " + gl.getProgramInfoLog(shaderProgram));
                this.shaderProgram = null;
            }

            this.shaderProgram = shaderProgram;

            this.aVertexLocation = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
            this.aColorLocation = gl.getAttribLocation(shaderProgram, 'aColor');
            this.uModelViewMatrixLocation = gl.getUniformLocation(shaderProgram, 'uModelViewMatrix');
            this.uProjectionMatrixLocation = gl.getUniformLocation(shaderProgram, 'uProjectionMatrix');
            this.uColor = gl.getUniformLocation(shaderProgram, "uColor");
            this.uWorldMatrixLocation = gl.getUniformLocation(shaderProgram, "uWorldMatrix");
        }
    }

    private loadShader(type: number, source: string): null | WebGLShader {
        let gl = this.renderingContext.gl;
        const shader = gl.createShader(type);
        if (!shader) return null;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            hflog.error("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }

    resetRubriksCube() : void {
        for (let i = 0; i < this.subfaces.length; ++i) {
            switch (Math.floor(i / 9)) {
                case 0: // front
                    this.subfaces[i] = 0; // green - front
                    break;
                case 1: // left
                    this.subfaces[i] = 1; // orange - left
                    break;
                case 2: // right
                    this.subfaces[i] = 2; // red - right
                    break;
                case 3: // back
                    this.subfaces[i] = 3; // yellow - back
                    break;
                case 4: // bottom
                    this.subfaces[i] = 5; // blue - bottom
                    break;
                case 5: // top
                    this.subfaces[i] = 4; // white - top
                    break;
                default:
                    this.subfaces[i] = -1;
            }
        }
    }

    private loadScenegraph(): void {
        this.resetRubriksCube();

        let gl = this.renderingContext.gl;

        this.surfaces.newSurface(gl.TRIANGLE_FAN);
        this.surfaces.vertex(-0.5, -0.5, 0.0);
        this.surfaces.vertex(0.5, -0.5, 0.0);
        this.surfaces.vertex(0.5, 0.5, 0.0);
        this.surfaces.vertex(-0.5, 0.5, 0.0);

        this.surfaces.buildBuffers(gl);
    }

    private mainloop(timestamp: number): void {
        let self = this;
        this.t0 = this.t1;
        this.t1 = timestamp / 1000.0;
        this.dt = this.t1 - this.t0;
        if (timestamp - this.uiUpdateTime > 50) {
            this.uiUpdateTime = timestamp;
            this.updateUI();
        }
        if (this.dt < 1.0 / 30) {
            setTimeout(() => { }, 17);
        }
        window.requestAnimationFrame((t: number) => {
            self.update();
            self.display();

            self.mainloop(t);
        });
    }

    private updateUI(): void {
        // Nothing here currently
    }

    rotateCW(i : number) {
        let temp = new Array<number>(9);

        temp[0] = this.subfaces[i*9+6];
        temp[1] = this.subfaces[i*9+3];
        temp[2] = this.subfaces[i*9+0];

        temp[3] = this.subfaces[i*9+7];
        temp[4] = this.subfaces[i*9+4];
        temp[5] = this.subfaces[i*9+1];

        temp[6] = this.subfaces[i*9+8];
        temp[7] = this.subfaces[i*9+5];
        temp[8] = this.subfaces[i*9+2];

        for (let j = 0; j < 9; ++j) {
            this.subfaces[i*9 + j] = temp[j];
        }
    }

    rotateRubriksUp(): void {
        let temp = new Array<number>(54);

        for (let i = 0; i < 9; ++i) {
            temp[5*9 + i] = this.subfaces[0*9 + i];
            temp[3*9 + i] = this.subfaces[5*9 + 8-i];
            temp[4*9 + i] = this.subfaces[3*9 + 8-i];
            temp[0*9 + i] = this.subfaces[4*9 + i];
        }

        temp[1*9 + 0] = this.subfaces[1*9 + 2];
        temp[1*9 + 1] = this.subfaces[1*9 + 5];
        temp[1*9 + 2] = this.subfaces[1*9 + 8];
        temp[1*9 + 3] = this.subfaces[1*9 + 1];
        temp[1*9 + 4] = this.subfaces[1*9 + 4];
        temp[1*9 + 5] = this.subfaces[1*9 + 7];
        temp[1*9 + 6] = this.subfaces[1*9 + 0];
        temp[1*9 + 7] = this.subfaces[1*9 + 3];
        temp[1*9 + 8] = this.subfaces[1*9 + 6];

        temp[2*9 + 2] = this.subfaces[2*9 + 0];
        temp[2*9 + 5] = this.subfaces[2*9 + 1];
        temp[2*9 + 8] = this.subfaces[2*9 + 2];
        temp[2*9 + 1] = this.subfaces[2*9 + 3];
        temp[2*9 + 4] = this.subfaces[2*9 + 4];
        temp[2*9 + 7] = this.subfaces[2*9 + 5];
        temp[2*9 + 0] = this.subfaces[2*9 + 6];
        temp[2*9 + 3] = this.subfaces[2*9 + 7];
        temp[2*9 + 6] = this.subfaces[2*9 + 8];

        for (let i = 0; i < 54; ++i) {
            if (temp[i] != undefined) {
                this.subfaces[i] = temp[i];
            }
        }
    }
    rotateRubriksRight(): void {
        
        let temp = new Array<number>(54);

        for (let i = 0; i < 9; ++i) {
            temp[0*9 + i] = this.subfaces[1*9 + i];
            temp[1*9 + i] = this.subfaces[3*9 + i];
            temp[2*9 + i] = this.subfaces[0*9 + i];
            temp[3*9 + i] = this.subfaces[2*9 + i];
        }

        temp[5*9 + 0] = this.subfaces[5*9 + 2];
        temp[5*9 + 1] = this.subfaces[5*9 + 5];
        temp[5*9 + 2] = this.subfaces[5*9 + 8];
        temp[5*9 + 3] = this.subfaces[5*9 + 1];
        temp[5*9 + 4] = this.subfaces[5*9 + 4];
        temp[5*9 + 5] = this.subfaces[5*9 + 7];
        temp[5*9 + 6] = this.subfaces[5*9 + 0];
        temp[5*9 + 7] = this.subfaces[5*9 + 3];
        temp[5*9 + 8] = this.subfaces[5*9 + 6];

        temp[4*9 + 2] = this.subfaces[4*9 + 0];
        temp[4*9 + 5] = this.subfaces[4*9 + 1];
        temp[4*9 + 8] = this.subfaces[4*9 + 2];
        temp[4*9 + 1] = this.subfaces[4*9 + 3];
        temp[4*9 + 4] = this.subfaces[4*9 + 4];
        temp[4*9 + 7] = this.subfaces[4*9 + 5];
        temp[4*9 + 0] = this.subfaces[4*9 + 6];
        temp[4*9 + 3] = this.subfaces[4*9 + 7];
        temp[4*9 + 6] = this.subfaces[4*9 + 8];

        for (let i = 0; i < 54; ++i) {
            if (temp[i] != undefined) {
                this.subfaces[i] = temp[i];
            }
        }
    }

    rotateFrontFaceCW(): void {
        let temp = new Array<number>(54);

        this.rotateCW(0);

        temp[getIndex(1,2)] = this.subfaces[getIndex(4,0)];
        temp[getIndex(1,5)] = this.subfaces[getIndex(4,1)];
        temp[getIndex(1,8)] = this.subfaces[getIndex(4,2)];

        temp[getIndex(2,0)] = this.subfaces[getIndex(5,6)];
        temp[getIndex(2,3)] = this.subfaces[getIndex(5,7)];
        temp[getIndex(2,6)] = this.subfaces[getIndex(5,8)];

        temp[getIndex(4,0)] = this.subfaces[getIndex(2,6)];
        temp[getIndex(4,1)] = this.subfaces[getIndex(2,3)];
        temp[getIndex(4,2)] = this.subfaces[getIndex(2,0)];

        temp[getIndex(5,6)] = this.subfaces[getIndex(1,8)];
        temp[getIndex(5,7)] = this.subfaces[getIndex(1,5)];
        temp[getIndex(5,8)] = this.subfaces[getIndex(1,2)];

        for (let i = 0; i < 54; ++i) {
            if (temp[i] != undefined) {
                this.subfaces[i] = temp[i];
            }
        }
    }

    rotateLeftFaceCW(): void {
        let temp = new Array<number>(54);

        this.rotateCW(1);

        temp[getIndex(4,0)] = this.subfaces[getIndex(0,0)];
        temp[getIndex(4,3)] = this.subfaces[getIndex(0,3)];
        temp[getIndex(4,6)] = this.subfaces[getIndex(0,6)];

        temp[getIndex(5,0)] = this.subfaces[getIndex(3,8)];
        temp[getIndex(5,3)] = this.subfaces[getIndex(3,5)];
        temp[getIndex(5,6)] = this.subfaces[getIndex(3,2)];

        temp[getIndex(0,0)] = this.subfaces[getIndex(5,0)];
        temp[getIndex(0,3)] = this.subfaces[getIndex(5,3)];
        temp[getIndex(0,6)] = this.subfaces[getIndex(5,6)];

        temp[getIndex(3,2)] = this.subfaces[getIndex(4,6)];
        temp[getIndex(3,5)] = this.subfaces[getIndex(4,3)];
        temp[getIndex(3,8)] = this.subfaces[getIndex(4,0)];
        // this.cameraPosition.z += 10.0*zoom_speed*this.dt;
        
        for (let i = 0; i < 54; ++i) {
            if (temp[i] != undefined) {
                this.subfaces[i] = temp[i];
            }
        }
    }

    rotateRightFaceCW(): void {
        let temp = new Array<number>(54);

        this.rotateCW(2);

        temp[getIndex(0,2)] = this.subfaces[getIndex(4,2)];
        temp[getIndex(0,5)] = this.subfaces[getIndex(4,5)];
        temp[getIndex(0,8)] = this.subfaces[getIndex(4,8)];

        temp[getIndex(3,0)] = this.subfaces[getIndex(5,8)];
        temp[getIndex(3,3)] = this.subfaces[getIndex(5,5)];
        temp[getIndex(3,6)] = this.subfaces[getIndex(5,2)];

        temp[getIndex(4,2)] = this.subfaces[getIndex(3,6)];
        temp[getIndex(4,5)] = this.subfaces[getIndex(3,3)];
        temp[getIndex(4,8)] = this.subfaces[getIndex(3,0)];

        temp[getIndex(5,2)] = this.subfaces[getIndex(0,2)];
        temp[getIndex(5,5)] = this.subfaces[getIndex(0,5)];
        temp[getIndex(5,8)] = this.subfaces[getIndex(0,8)];

        for (let i = 0; i < 54; ++i) {
            if (temp[i] != undefined) {
                this.subfaces[i] = temp[i];
            }
        }
    }

    rotateBackFaceCW(): void {
        let temp = new Array<number>(54);

        this.rotateCW(3);

        temp[getIndex(5,0)] = this.subfaces[getIndex(2,2)];
        temp[getIndex(5,1)] = this.subfaces[getIndex(2,5)];
        temp[getIndex(5,2)] = this.subfaces[getIndex(2,8)];

        temp[getIndex(2,2)] = this.subfaces[getIndex(4,8)];
        temp[getIndex(2,5)] = this.subfaces[getIndex(4,7)];
        temp[getIndex(2,8)] = this.subfaces[getIndex(4,6)];

        temp[getIndex(4,6)] = this.subfaces[getIndex(1,0)];
        temp[getIndex(4,7)] = this.subfaces[getIndex(1,3)];
        temp[getIndex(4,8)] = this.subfaces[getIndex(1,6)];

        temp[getIndex(1,0)] = this.subfaces[getIndex(5,2)];
        temp[getIndex(1,3)] = this.subfaces[getIndex(5,1)];
        temp[getIndex(1,6)] = this.subfaces[getIndex(5,0)];

        for (let i = 0; i < 54; ++i) {
            if (temp[i] != undefined) {
                this.subfaces[i] = temp[i];
            }
        }
    }

    rotateTopFaceCW(): void {
        let temp = new Array<number>(54);

        this.rotateCW(5);

        temp[getIndex(3,0)] = this.subfaces[getIndex(1,0)];
        temp[getIndex(3,1)] = this.subfaces[getIndex(1,1)];
        temp[getIndex(3,2)] = this.subfaces[getIndex(1,2)];

        temp[getIndex(2,0)] = this.subfaces[getIndex(3,0)];
        temp[getIndex(2,1)] = this.subfaces[getIndex(3,1)];
        temp[getIndex(2,2)] = this.subfaces[getIndex(3,2)];

        temp[getIndex(1,0)] = this.subfaces[getIndex(0,0)];
        temp[getIndex(1,1)] = this.subfaces[getIndex(0,1)];
        temp[getIndex(1,2)] = this.subfaces[getIndex(0,2)];

        temp[getIndex(0,0)] = this.subfaces[getIndex(2,0)];
        temp[getIndex(0,1)] = this.subfaces[getIndex(2,1)];
        temp[getIndex(0,2)] = this.subfaces[getIndex(2,2)];

        for (let i = 0; i < 54; ++i) {
            if (temp[i] != undefined) {
                this.subfaces[i] = temp[i];
            }
        }
    }

    rotateBottomFaceCW(): void {
        let temp = new Array<number>(54);

        this.rotateCW(4);

        temp[getIndex(0,6)] = this.subfaces[getIndex(1,6)];
        temp[getIndex(0,7)] = this.subfaces[getIndex(1,7)];
        temp[getIndex(0,8)] = this.subfaces[getIndex(1,8)];

        temp[getIndex(2,6)] = this.subfaces[getIndex(0,6)];
        temp[getIndex(2,7)] = this.subfaces[getIndex(0,7)];
        temp[getIndex(2,8)] = this.subfaces[getIndex(0,8)];

        temp[getIndex(1,6)] = this.subfaces[getIndex(3,6)];
        temp[getIndex(1,7)] = this.subfaces[getIndex(3,7)];
        temp[getIndex(1,8)] = this.subfaces[getIndex(3,8)];

        temp[getIndex(3,6)] = this.subfaces[getIndex(2,6)];
        temp[getIndex(3,7)] = this.subfaces[getIndex(2,7)];
        temp[getIndex(3,8)] = this.subfaces[getIndex(2,8)];

        for (let i = 0; i < 54; ++i) {
            if (temp[i] != undefined) {
                this.subfaces[i] = temp[i];
            }
        }
    }

    scrambleRubiksCube(): void {
        let randFace = Math.floor(6 * Math.random());
        let randRotations = 1 + Math.floor(3 * Math.random());

        for(let i = 0; i < randRotations; ++i) {
            switch (randFace) {
                default:
                case 0:
                    this.rotateFrontFaceCW();
                    break;
                case 1:
                    this.rotateBackFaceCW();
                    break;
                case 2:
                    this.rotateLeftFaceCW();
                    break;
                case 3:
                    this.rotateRightFaceCW();
                    break;
                case 4:
                    this.rotateBottomFaceCW();
                    break;
                case 5:
                    this.rotateTopFaceCW();
                    break;
            }
        }
        
    }

    private update(): void {
        // The first time through will dynamically build key listener list
        // The list is physical keyboard keys, see KeyboardEvent.code documentation
        let keys = this.controls;

        let doOpposite = false;
        
        /***** CAMERA / WORLD CONTROLS *****/
        if (keys.isKeyDown(["ShiftLeft", "ShiftRight"])) {
            doOpposite = true;
        }
        if (keys.isKeyClick(["Tab"])) {
            this.skipBehind = !this.skipBehind;
        }
        if (keys.isKeyClick(["ArrowUp", "ArrowDown"])) {
            this.rotateRubriksUp();
            this.rotateRubriksUp();
            this.rotateRubriksRight();
            this.rotateRubriksRight();
            this.rotateRubriksRight();
        }

        if (keys.isKeyClick(["ArrowRight"])) {
            this.rotateRubriksRight();
        }
        if (keys.isKeyClick(["ArrowLeft"])) {
            this.rotateRubriksRight();
            this.rotateRubriksRight();
            this.rotateRubriksRight();
        }
        if (keys.isKeyClick(["KeyR"])) {
            this.resetRubriksCube();
        }


        /***** OTHER CONTROLS *****/
        if (keys.isKeyClick(["KeyA"])) {
            this.rotateLeftFaceCW();
            if (doOpposite) {
                this.rotateLeftFaceCW();
                this.rotateLeftFaceCW();
            }
        } else if (keys.isKeyClick(["KeyD"])) {
            this.rotateFrontFaceCW();
            if (doOpposite) {
                this.rotateFrontFaceCW();
                this.rotateFrontFaceCW();
            }
        } else if (!this.skipBehind && keys.isKeyClick(["KeyQ"])) {
            this.rotateBackFaceCW();
            if (doOpposite) {
                this.rotateBackFaceCW();
                this.rotateBackFaceCW();
            }
        } else if (!this.skipBehind && keys.isKeyClick(["KeyE"])) {
            this.rotateRightFaceCW();
            if (doOpposite) {
                this.rotateRightFaceCW();
                this.rotateRightFaceCW();
            }
        } else if (keys.isKeyClick(["KeyW"])) {
            this.rotateTopFaceCW();
            if (doOpposite) {
                this.rotateTopFaceCW();
                this.rotateTopFaceCW();
            }
        } else if (!this.skipBehind && keys.isKeyClick(["KeyS"])) {
            this.rotateBottomFaceCW();
            if (doOpposite) {
                this.rotateBottomFaceCW();
                this.rotateBottomFaceCW();
            }
        } else if (keys.isKeyDown(["KeyG"])) {
            this.scrambleRubiksCube();
        }
    }

    getWorldMatrix(i : number) : Matrix4 {
        let x = 0, y = 0, z = 0;

        z = 1.7;

        let temp = Math.floor(i % 3);
        if (temp == 0) {
            x = -1.1;
        } else if (temp == 1) {
            x = 0.0;
        } else if (temp == 2) {
            x = 1.1;
        } else {
            // hflog.log('invalid temp_x ' + temp);
        }

        temp = Math.floor((i % 9) / 3);
        if (temp == 0) {
            y = 1.1;
        } else if (temp == 1) {
            y = 0.0;
        } else if (temp == 2) {
            y = -1.1;
        } else {
            // hflog.log('invalid temp_y ' + temp);
        }

        let w = Matrix4.makeTranslation(x, y, z);

        if (Math.floor(i/9) == 1) {
            w.Rotate(-90, 0.0, 1.0, 0.0);
        } else if (Math.floor(i/9) == 2) {
            w.Rotate(90, 0.0, 1.0, 0.0);
        } else if (Math.floor(i/9) == 3) {
            w.Rotate(180, 0.0, 1.0, 0.0);
        } else if (Math.floor(i/9) == 4) {
            w.Rotate(90, 1.0, 0.0, 0.0);
        } else if (Math.floor(i/9) == 5) {
            w.Rotate(-90, 1.0, 0.0, 0.0);
        }

        return w;
    }

    private display(): void {
        let gl = this.renderingContext.gl;

        let sine = Math.abs(Math.sin(this.t1));
        gl.clearColor(sine * 0.1, sine * 0.1, sine * 0.3, 1.0);
        gl.clearDepth(1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        let p = Matrix4.makePerspectiveX(45.0, this.renderingContext.aspectRatio, 0.1, 1000.0);
        let c = Matrix4.makeRotation(45, 0.0, 1.0, 0.0);
            c.Rotate(45, 1.0, 0.0, 0.0);
            c.Translate(0.0, 0.0, -10.0);

        gl.useProgram(this.shaderProgram);
        if (this.uProjectionMatrixLocation)
            gl.uniformMatrix4fv(this.uProjectionMatrixLocation, false, p.toColMajorArray());
        if (this.uModelViewMatrixLocation)
            gl.uniformMatrix4fv(this.uModelViewMatrixLocation, false, c.toColMajorArray());

        let color = new Vector3(0.0, 1.0, 0.0);
        if (this.uColor)
            gl.uniform3fv(this.uColor, color.toFloat32Array());

        let w = Matrix4.makeIdentity();
        gl.useProgram(this.shaderProgram);
        for (let i = 0; i < 54; ++i) {
            if (i == 18 && this.skipBehind){
                i = 54 - 9; // Skip 18 - 44
            }

            w = this.getWorldMatrix(i);
            gl.uniformMatrix4fv(this.uWorldMatrixLocation, false, w.toColMajorArray());
            switch (this.subfaces[i]) {
                case 0:
                    color = new Vector3(0.0, 1.0, 0.0);
                    break;
                case 1:
                    color = new Vector3(255/255, 140/255, 0.0);
                    break;
                case 2:
                    color = new Vector3(1.0, 0.0, 0.0);
                    break;
                case 3:
                    color = new Vector3(1.0, 1.0, 0.0);
                    break;
                case 4:
                    color = new Vector3(0.0, 0.0, 1.0);
                    break;
                case 5:
                    color = new Vector3(1.0, 1.0, 1.0);
                    break;
                default:
                    color = new Vector3();

            }
            gl.uniform3fv(this.uColor, color.toFloat32Array());
            this.surfaces.draw(gl, this.aVertexLocation, this.aColorLocation);
        }
    }
}