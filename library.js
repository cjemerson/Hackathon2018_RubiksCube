"use strict";
// Fluxions WebGL Library
// Copyright (c) 2017 - 2018 Jonathan Metzgar
// All Rights Reserved.
//
// MIT License
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
//
/// <reference path="GTE.ts" />
class Vector2 {
    constructor(x = 0.0, y = 0.0) {
        this.x = x;
        this.y = y;
    }
    copy(v) {
        this.x = v.x;
        this.y = v.y;
        return this;
    }
    clone() {
        return new Vector2(this.x, this.y);
    }
    reset(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
    add(v) {
        return new Vector2(this.x + v.x, this.y + v.y);
    }
    sub(v) {
        return new Vector2(this.x - v.x, this.y - v.y);
    }
    mul(multiplicand) {
        return new Vector2(this.x * multiplicand, this.y * multiplicand);
    }
    // returns 0 if denominator is 0
    div(divisor) {
        if (divisor == 0.0)
            return new Vector2();
        return new Vector2(this.x / divisor, this.y / divisor);
    }
    neg() {
        return new Vector2(-this.x, -this.y);
    }
    toFloat32Array() {
        return new Float32Array([this.x, this.y]);
    }
    toVector2() {
        return new Vector2(this.x, this.y);
    }
    toVector3() {
        return new Vector3(this.x, this.y, 0.0);
    }
    toVector4() {
        return new Vector4(this.x, this.y, 0.0, 0.0);
    }
    project() {
        return this.x / this.y;
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    lengthSquared() {
        return this.x * this.x + this.y * this.y;
    }
    norm() {
        let len = this.lengthSquared();
        if (len == 0.0)
            return new Vector2();
        else
            len = Math.sqrt(len);
        return new Vector2(this.x / len, this.y / len);
    }
    static make(x, y) {
        return new Vector2(x, y);
    }
    static dot(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
    }
    static cross(a, b) {
        return a.x * b.y - a.y * b.x;
    }
    static normalize(v) {
        let len = v.length();
        if (len == 0.0) {
            v.reset(0.0, 0.0);
        }
        else {
            v.x /= len;
            v.y /= len;
        }
        return v;
    }
}
// Fluxions WebGL Library
// Copyright (c) 2017 - 2018 Jonathan Metzgar
// All Rights Reserved.
//
// MIT License
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
//
/// <reference path="./GTE.ts" />
class Vector3 {
    constructor(x = 0.0, y = 0.0, z = 0.0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    get r() { return this.x; }
    get g() { return this.y; }
    get b() { return this.z; }
    set r(r) { this.x = r; }
    set g(g) { this.g = g; }
    set b(b) { this.z = b; }
    copy(v) {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
        return this;
    }
    clone() {
        return new Vector3(this.x, this.y, this.z);
    }
    reset(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }
    static makeFromSpherical(theta, phi) {
        return new Vector3(Math.cos(phi) * Math.cos(theta), Math.sin(phi), -Math.cos(phi) * Math.sin(theta));
    }
    // Converts (rho, theta, phi) so that rho is distance from origin,
    // theta is inclination away from positive y-axis, and phi is azimuth
    // from positive z-axis towards the positive x-axis.
    static makeFromSphericalISO(rho, thetaInRadians, phiInRadians) {
        return new Vector3(rho * Math.sin(thetaInRadians) * Math.cos(phiInRadians), rho * Math.cos(thetaInRadians), rho * Math.sin(thetaInRadians) * Math.sin(phiInRadians));
    }
    // Converts (rho, theta, phi) so that rho is distance from origin,
    // phi is inclination away from positive y-axis, and theta is azimuth
    // from positive z-axis towards the positive x-axis.
    static makeFromSphericalMath(rho, thetaInRadians, phiInRadians) {
        return new Vector3(rho * Math.sin(phiInRadians) * Math.sin(thetaInRadians), rho * Math.cos(phiInRadians), rho * Math.sin(phiInRadians) * Math.cos(thetaInRadians));
    }
    // theta represents angle from +x axis on xz plane going counterclockwise
    // phi represents angle from xz plane going towards +y axis
    setFromSpherical(theta, phi) {
        this.x = Math.cos(theta) * Math.cos(phi);
        this.y = Math.sin(phi);
        this.z = -Math.sin(theta) * Math.cos(phi);
        return this;
    }
    get theta() {
        return Math.atan2(this.x, -this.z) + ((this.z <= 0.0) ? 0.0 : 2.0 * Math.PI);
    }
    get phi() {
        return Math.asin(this.y);
    }
    static make(x, y, z) {
        return new Vector3(x, y, z);
    }
    static makeUnit(x, y, z) {
        return (new Vector3(x, y, z)).norm();
    }
    add(v) {
        return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
    }
    sub(v) {
        return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
    }
    mul(multiplicand) {
        return new Vector3(this.x * multiplicand, this.y * multiplicand, this.z * multiplicand);
    }
    // returns 0 if denominator is 0
    div(divisor) {
        if (divisor == 0.0)
            return new Vector3();
        return new Vector3(this.x / divisor, this.y / divisor, this.z / divisor);
    }
    neg() {
        return new Vector3(-this.x, -this.y, -this.z);
    }
    // multiplicative inverse (1/x)
    reciprocal() {
        return new Vector3(1.0 / this.x, 1.0 / this.y, 1.0 / this.z);
    }
    pow(power) {
        return new Vector3(Math.pow(this.x, power), Math.pow(this.y, power), Math.pow(this.z, power));
    }
    compdiv(divisor) {
        return new Vector3(this.x / divisor.x, this.y / divisor.y, this.z / divisor.z);
    }
    compmul(multiplicand) {
        return new Vector3(this.x * multiplicand.x, this.y * multiplicand.y, this.z * multiplicand.z);
    }
    toArray() {
        return [this.x, this.y, this.z];
    }
    toFloat32Array() {
        return new Float32Array([this.x, this.y, this.z]);
    }
    toVector2() {
        return new Vector2(this.x, this.y);
    }
    toVector4(w) {
        return new Vector4(this.x, this.y, this.z, w);
    }
    project() {
        return new Vector2(this.x / this.z, this.y / this.z);
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    lengthSquared() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }
    norm() {
        let len = this.lengthSquared();
        if (len == 0.0)
            return new Vector3();
        else
            len = Math.sqrt(len);
        return new Vector3(this.x / len, this.y / len, this.z / len);
    }
    normalize() {
        let len = this.lengthSquared();
        if (len == 0.0)
            return new Vector3();
        else
            len = Math.sqrt(len);
        this.x /= len;
        this.y /= len;
        this.z /= len;
        return this;
    }
    get(index) {
        switch (index) {
            case 0: return this.x;
            case 1: return this.y;
            case 2: return this.z;
        }
        return 0.0;
    }
    set(index, value) {
        switch (index) {
            case 0:
                this.x = value;
                return;
            case 1:
                this.y = value;
                return;
            case 2:
                this.z = value;
                return;
        }
    }
    static dot(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
    }
    static cross(a, b) {
        return new Vector3(a.y * b.z - b.y * a.z, a.z * b.x - b.z * a.x, a.x * b.y - b.x * a.y);
    }
    static add(a, b) {
        return new Vector3(a.x + b.x, a.y + b.y, a.z + b.z);
    }
    static sub(a, b) {
        return new Vector3(a.x - b.x, a.y - b.y, a.z - b.z);
    }
    static mul(a, b) {
        return new Vector3(a.x * b.x, a.y * b.y, a.z * b.z);
    }
    static div(a, b) {
        return new Vector3(a.x / b.x, a.y / b.y, a.z / b.z);
    }
}
// Fluxions WebGL Library
// Copyright (c) 2017 - 2018 Jonathan Metzgar
// All Rights Reserved.
//
// MIT License
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
//
/// <reference path="GTE.ts" />
class Vector4 {
    constructor(x = 0.0, y = 0.0, z = 0.0, w = 1.0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    copy(v) {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
        this.w = v.w;
        return this;
    }
    clone() {
        return new Vector4(this.x, this.y, this.z, this.w);
    }
    reset(x = 0.0, y = 0.0, z = 0.0, w = 1.0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        return this;
    }
    add(v) {
        return new Vector4(this.x + v.x, this.y + v.y, this.z + v.z, this.w + v.w);
    }
    sub(v) {
        return new Vector4(this.x - v.x, this.y - v.y, this.z - v.z, this.w - v.w);
    }
    mul(multiplicand) {
        return new Vector4(this.x * multiplicand, this.y * multiplicand, this.z * multiplicand, this.w * multiplicand);
    }
    // returns 0 if denominator is 0
    div(divisor) {
        if (divisor == 0.0)
            return new Vector4();
        return new Vector4(this.x / divisor, this.y / divisor, this.z / divisor, this.w / divisor);
    }
    neg() {
        return new Vector4(-this.x, -this.y, -this.z, -this.w);
    }
    toFloat32Array() {
        return new Float32Array([this.x, this.y, this.z, this.w]);
    }
    toArray() {
        return [this.x, this.y, this.z, this.w];
    }
    toVector2() {
        return new Vector2(this.x, this.y);
    }
    toVector3() {
        return new Vector3(this.x, this.y, this.z);
    }
    project() {
        return new Vector3(this.x / this.w, this.y / this.w, this.z / this.w);
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    }
    lengthSquared() {
        return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
    }
    norm() {
        let len = this.lengthSquared();
        if (len == 0.0)
            return new Vector4();
        else
            len = Math.sqrt(len);
        return new Vector4(this.x / len, this.y / len, this.z / len, this.w / len);
    }
    static dot(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z + v1.w * v2.w;
    }
    static normalize(v) {
        let len = v.length();
        if (len == 0.0) {
            v.reset(0.0, 0.0, 0.0, 0.0);
        }
        else {
            v.x /= len;
            v.y /= len;
            v.z /= len;
            v.w /= len;
        }
        return v;
    }
    static make(x, y, z, w) {
        return new Vector4(x, y, z, w);
    }
    static makeUnit(x, y, z, w) {
        return (new Vector4(x, y, z, w)).norm();
    }
}
// Fluxions WebGL Library
// Copyright (c) 2017 - 2018 Jonathan Metzgar
// All Rights Reserved.
//
// MIT License
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
//
/// <reference path="GTE.ts" />
class Matrix2 {
    constructor(m11, m21, m12, m22) {
        this.m11 = m11;
        this.m21 = m21;
        this.m12 = m12;
        this.m22 = m22;
    }
    static makeIdentity() {
        return new Matrix2(1, 0, 0, 1);
    }
    static makeZero() {
        return new Matrix2(0, 0, 0, 0);
    }
    static makeColMajor(m11, m21, m12, m22) {
        return new Matrix2(m11, m21, m12, m22);
    }
    static makeRowMajor(m11, m12, m21, m22) {
        return new Matrix2(m11, m21, m12, m22);
    }
    static fromRowMajorArray(v) {
        if (v.length >= 4)
            return new Matrix2(v[0], v[2], v[1], v[3]);
        return new Matrix2(0, 0, 0, 0);
    }
    static fromColMajorArray(v) {
        if (v.length >= 4)
            return new Matrix2(v[0], v[1], v[2], v[3]);
        return new Matrix2(0, 0, 0, 0);
    }
    static makeScale(x, y) {
        return Matrix2.makeRowMajor(x, 0, 0, y);
    }
    static makeRotation(angleInDegrees, x, y, z) {
        var c = Math.cos(angleInDegrees * Math.PI / 180.0);
        var s = Math.sin(angleInDegrees * Math.PI / 180.0);
        return Matrix2.makeRowMajor(c, -s, s, c);
    }
    asColMajorArray() {
        return [
            this.m11, this.m21,
            this.m12, this.m22
        ];
    }
    asRowMajorArray() {
        return [
            this.m11, this.m12,
            this.m21, this.m22
        ];
    }
    static multiply(m1, m2) {
        return new Matrix2(m1.m11 * m2.m11 + m1.m21 * m2.m12, m1.m11 * m2.m21 + m1.m21 * m2.m22, m1.m12 * m2.m11 + m1.m22 * m2.m12, m1.m12 * m2.m21 + m1.m22 * m2.m22);
    }
    copy(m) {
        this.m11 = m.m11;
        this.m21 = m.m21;
        this.m12 = m.m12;
        this.m22 = m.m22;
        return this;
    }
    concat(m) {
        this.copy(Matrix2.multiply(this, m));
        return this;
    }
    transform(v) {
        return new Vector2(this.m11 * v.x + this.m12 * v.y, this.m21 * v.x + this.m22 * v.y);
    }
    asInverse() {
        var tmpD = 1.0 / (this.m11 * this.m22 - this.m12 * this.m21);
        return Matrix2.makeRowMajor(this.m22 * tmpD, -this.m12 * tmpD, -this.m21 * tmpD, this.m11 * tmpD);
    }
    asTranspose() {
        return Matrix2.makeRowMajor(this.m11, this.m21, this.m12, this.m22);
    }
} // class Matrix2
// Fluxions WebGL Library
// Copyright (c) 2017 - 2018 Jonathan Metzgar
// All Rights Reserved.
//
// MIT License
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
//
/// <reference path="GTE.ts"/>
class Matrix3 {
    constructor(m11, m21, m31, m12, m22, m32, m13, m23, m33) {
        this.m11 = m11;
        this.m21 = m21;
        this.m31 = m31;
        this.m12 = m12;
        this.m22 = m22;
        this.m32 = m32;
        this.m13 = m13;
        this.m23 = m23;
        this.m33 = m33;
    }
    static makeIdentity() {
        return new Matrix3(1, 0, 0, 0, 1, 0, 0, 0, 1);
    }
    static makeZero() {
        return new Matrix3(0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
    static makeColMajor(m11, m21, m31, m12, m22, m32, m13, m23, m33) {
        return new Matrix3(m11, m21, m31, m12, m22, m32, m13, m23, m33);
    }
    static makeRowMajor(m11, m12, m13, m21, m22, m23, m31, m32, m33) {
        return new Matrix3(m11, m21, m31, m12, m22, m32, m13, m23, m33);
    }
    static fromRowMajorArray(v) {
        if (v.length >= 9)
            return new Matrix3(v[0], v[3], v[6], v[1], v[4], v[7], v[2], v[5], v[8]);
        return new Matrix3(0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
    static fromColMajorArray(v) {
        if (v.length >= 9)
            return new Matrix3(v[0], v[1], v[2], v[3], v[4], v[5], v[6], v[7], v[8]);
        return new Matrix3(0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
    static makeScale(x, y, z) {
        return Matrix3.makeRowMajor(x, 0, 0, 0, y, 0, 0, 0, z);
    }
    static makeRotation(angleInDegrees, x, y, z) {
        var c = Math.cos(angleInDegrees * Math.PI / 180.0);
        var s = Math.sin(angleInDegrees * Math.PI / 180.0);
        var invLength = 1.0 / Math.sqrt(x * x + y * y + z * z);
        x *= invLength;
        y *= invLength;
        z *= invLength;
        return Matrix3.makeRowMajor(x * x * (1 - c) + c, x * y * (1 - c) - z * s, x * z * (1 - c) + y * s, y * x * (1 - c) + z * s, y * y * (1 - c) + c, y * z * (1 - c) - x * s, x * z * (1 - c) - y * s, y * z * (1 - c) + x * s, z * z * (1 - c) + c);
    }
    static makeCubeFaceMatrix(face) {
        // +X
        if (face == 0)
            return Matrix3.makeRotation(90.0, 0.0, 1.0, 0.0);
        // -X
        if (face == 1)
            return Matrix3.makeRotation(270.0, 0.0, 1.0, 0.0);
        // +Y
        if (face == 2)
            return Matrix3.makeRotation(90.0, 1.0, 0.0, 0.0);
        // -Y
        if (face == 3)
            return Matrix3.makeRotation(270.0, 1.0, 0.0, 0.0);
        // +Z
        if (face == 4)
            return Matrix3.makeIdentity();
        // -Z
        if (face == 5)
            return Matrix3.makeRotation(180.0, 0.0, 1.0, 0.0);
        return new Matrix3(0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
    asColMajorArray() {
        return [
            this.m11, this.m21, this.m31,
            this.m12, this.m22, this.m32,
            this.m13, this.m23, this.m33
        ];
    }
    asRowMajorArray() {
        return [
            this.m11, this.m12, this.m13,
            this.m21, this.m22, this.m23,
            this.m31, this.m32, this.m33
        ];
    }
    static multiply(m1, m2) {
        return new Matrix3(m1.m11 * m2.m11 + m1.m21 * m2.m12 + m1.m31 * m2.m13, m1.m11 * m2.m21 + m1.m21 * m2.m22 + m1.m31 * m2.m23, m1.m11 * m2.m31 + m1.m21 * m2.m32 + m1.m31 * m2.m33, m1.m12 * m2.m11 + m1.m22 * m2.m12 + m1.m32 * m2.m13, m1.m12 * m2.m21 + m1.m22 * m2.m22 + m1.m32 * m2.m23, m1.m12 * m2.m31 + m1.m22 * m2.m32 + m1.m32 * m2.m33, m1.m13 * m2.m11 + m1.m23 * m2.m12 + m1.m33 * m2.m13, m1.m13 * m2.m21 + m1.m23 * m2.m22 + m1.m33 * m2.m23, m1.m13 * m2.m31 + m1.m23 * m2.m32 + m1.m33 * m2.m33);
    }
    LoadIdentity() {
        return this.copy(Matrix3.makeIdentity());
    }
    MultMatrix(m) {
        return this.copy(Matrix3.multiply(this, m));
    }
    LoadColMajor(m11, m21, m31, m12, m22, m32, m13, m23, m33) {
        this.m11 = m11;
        this.m12 = m12;
        this.m13 = m13;
        this.m21 = m21;
        this.m22 = m22;
        this.m23 = m23;
        this.m31 = m31;
        this.m32 = m32;
        this.m33 = m33;
        return this;
    }
    LoadRowMajor(m11, m12, m13, m21, m22, m23, m31, m32, m33) {
        this.m11 = m11;
        this.m12 = m12;
        this.m13 = m13;
        this.m21 = m21;
        this.m22 = m22;
        this.m23 = m23;
        this.m31 = m31;
        this.m32 = m32;
        this.m33 = m33;
        return this;
    }
    toMatrix4() {
        return Matrix4.makeRowMajor(this.m11, this.m12, this.m13, 0.0, this.m21, this.m22, this.m23, 0.0, this.m31, this.m32, this.m33, 0.0, 0.0, 0.0, 0.0, 1.0);
    }
    copy(m) {
        this.m11 = m.m11;
        this.m21 = m.m21;
        this.m31 = m.m31;
        this.m12 = m.m12;
        this.m22 = m.m22;
        this.m32 = m.m32;
        this.m13 = m.m13;
        this.m23 = m.m23;
        this.m33 = m.m33;
        return this;
    }
    clone() {
        return Matrix3.makeRowMajor(this.m11, this.m12, this.m13, this.m21, this.m22, this.m23, this.m31, this.m32, this.m33);
    }
    concat(m) {
        this.copy(Matrix3.multiply(this, m));
        return this;
    }
    transform(v) {
        return new Vector3(this.m11 * v.x + this.m12 * v.y + this.m13 * v.z, this.m21 * v.x + this.m22 * v.y + this.m23 * v.z, this.m31 * v.x + this.m32 * v.y + this.m33 * v.z);
    }
    asInverse() {
        var tmpA = this.m22 * this.m33 - this.m23 * this.m32;
        var tmpB = this.m21 * this.m32 - this.m22 * this.m31;
        var tmpC = this.m23 * this.m31 - this.m21 * this.m33;
        var tmpD = 1.0 / (this.m11 * tmpA + this.m12 * tmpC + this.m13 * tmpB);
        return new Matrix3(tmpA * tmpD, (this.m13 * this.m32 - this.m12 * this.m33) * tmpD, (this.m12 * this.m23 - this.m13 * this.m22) * tmpD, tmpC * tmpD, (this.m11 * this.m33 - this.m13 * this.m31) * tmpD, (this.m13 * this.m21 - this.m11 * this.m23) * tmpD, tmpB * tmpD, (this.m12 * this.m31 - this.m11 * this.m32) * tmpD, (this.m11 * this.m22 - this.m12 * this.m21) * tmpD);
    }
    asTranspose() {
        return new Matrix3(this.m11, this.m12, this.m13, this.m21, this.m22, this.m23, this.m31, this.m32, this.m33);
    }
} // class Matrix3
// Fluxions WebGL Library
// Copyright (c) 2017 - 2018 Jonathan Metzgar
// All Rights Reserved.
//
// MIT License
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
//
///<reference path="GTE.ts"/>
class Matrix4 {
    constructor(m11 = 1, m21 = 0, m31 = 0, m41 = 0, m12 = 0, m22 = 1, m32 = 0, m42 = 0, m13 = 0, m23 = 0, m33 = 1, m43 = 0, m14 = 0, m24 = 0, m34 = 0, m44 = 1) {
        this.m11 = m11;
        this.m21 = m21;
        this.m31 = m31;
        this.m41 = m41;
        this.m12 = m12;
        this.m22 = m22;
        this.m32 = m32;
        this.m42 = m42;
        this.m13 = m13;
        this.m23 = m23;
        this.m33 = m33;
        this.m43 = m43;
        this.m14 = m14;
        this.m24 = m24;
        this.m34 = m34;
        this.m44 = m44;
    }
    copy(m) {
        return this.LoadMatrix(m);
    }
    clone() {
        return new Matrix4(this.m11, this.m21, this.m31, this.m41, this.m12, this.m22, this.m32, this.m42, this.m13, this.m23, this.m33, this.m43, this.m14, this.m24, this.m34, this.m44);
    }
    row(i) {
        switch (i) {
            case 0: return new Vector4(this.m11, this.m12, this.m13, this.m14);
            case 1: return new Vector4(this.m21, this.m22, this.m23, this.m24);
            case 2: return new Vector4(this.m31, this.m32, this.m33, this.m34);
            case 3: return new Vector4(this.m41, this.m42, this.m43, this.m44);
        }
        return new Vector4(0, 0, 0, 0);
    }
    col(i) {
        switch (i) {
            case 0: return new Vector4(this.m11, this.m21, this.m31, this.m41);
            case 1: return new Vector4(this.m12, this.m22, this.m32, this.m42);
            case 2: return new Vector4(this.m13, this.m23, this.m33, this.m43);
            case 3: return new Vector4(this.m14, this.m24, this.m34, this.m44);
        }
        return new Vector4(0, 0, 0, 0);
    }
    row3(i) {
        switch (i) {
            case 0: return new Vector3(this.m11, this.m12, this.m13);
            case 1: return new Vector3(this.m21, this.m22, this.m23);
            case 2: return new Vector3(this.m31, this.m32, this.m33);
            case 3: return new Vector3(this.m41, this.m42, this.m43);
        }
        return new Vector3(0, 0, 0);
    }
    col3(i) {
        switch (i) {
            case 0: return new Vector3(this.m11, this.m21, this.m31);
            case 1: return new Vector3(this.m12, this.m22, this.m32);
            case 2: return new Vector3(this.m13, this.m23, this.m33);
            case 3: return new Vector3(this.m14, this.m24, this.m34);
        }
        return new Vector3(0, 0, 0);
    }
    diag3() {
        return new Vector3(this.m11, this.m22, this.m33);
    }
    LoadRowMajor(m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44) {
        this.m11 = m11;
        this.m12 = m12;
        this.m13 = m13;
        this.m14 = m14;
        this.m21 = m21;
        this.m22 = m22;
        this.m23 = m23;
        this.m24 = m24;
        this.m31 = m31;
        this.m32 = m32;
        this.m33 = m33;
        this.m34 = m34;
        this.m41 = m41;
        this.m42 = m42;
        this.m43 = m43;
        this.m44 = m44;
        return this;
    }
    LoadColMajor(m11, m21, m31, m41, m12, m22, m32, m42, m13, m23, m33, m43, m14, m24, m34, m44) {
        this.m11 = m11;
        this.m12 = m12;
        this.m13 = m13;
        this.m14 = m14;
        this.m21 = m21;
        this.m22 = m22;
        this.m23 = m23;
        this.m24 = m24;
        this.m31 = m31;
        this.m32 = m32;
        this.m33 = m33;
        this.m34 = m34;
        this.m41 = m41;
        this.m42 = m42;
        this.m43 = m43;
        this.m44 = m44;
        return this;
    }
    LoadIdentity() {
        return this.LoadMatrix(Matrix4.makeIdentity());
    }
    Translate(x, y, z) {
        return this.MultMatrix(Matrix4.makeTranslation(x, y, z));
    }
    Rotate(angleInDegrees, x, y, z) {
        return this.MultMatrix(Matrix4.makeRotation(angleInDegrees, x, y, z));
    }
    Scale(sx, sy, sz) {
        return this.MultMatrix(Matrix4.makeScale(sx, sy, sz));
    }
    LookAt(eye, center, up) {
        return this.MultMatrix(Matrix4.makeLookAt2(eye, center, up));
    }
    Frustum(left, right, bottom, top, near, far) {
        return this.MultMatrix(Matrix4.makeFrustum(left, right, bottom, top, near, far));
    }
    Ortho(left, right, bottom, top, near, far) {
        return this.MultMatrix(Matrix4.makeOrtho(left, right, bottom, top, near, far));
    }
    Ortho2D(left, right, bottom, top) {
        return this.MultMatrix(Matrix4.makeOrtho2D(left, right, bottom, top));
    }
    PerspectiveX(fovx, aspect, near, far) {
        return this.MultMatrix(Matrix4.makePerspectiveX(fovx, aspect, near, far));
    }
    PerspectiveY(fovy, aspect, near, far) {
        return this.MultMatrix(Matrix4.makePerspectiveY(fovy, aspect, near, far));
    }
    ShadowBias() {
        return this.MultMatrix(Matrix4.makeShadowBias());
    }
    CubeFaceMatrix(face) {
        return this.MultMatrix(Matrix4.makeCubeFaceMatrix(face));
    }
    static makeIdentity() {
        return new Matrix4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }
    static makeZero() {
        return new Matrix4(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
    static makeColMajor(m11, m21, m31, m41, m12, m22, m32, m42, m13, m23, m33, m43, m14, m24, m34, m44) {
        return new Matrix4(m11, m21, m31, m41, m12, m22, m32, m42, m13, m23, m33, m43, m14, m24, m34, m44);
    }
    static makeRowMajor(m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44) {
        return new Matrix4(m11, m21, m31, m41, m12, m22, m32, m42, m13, m23, m33, m43, m14, m24, m34, m44);
    }
    static fromRowMajorArray(v) {
        if (v.length >= 16)
            return new Matrix4(v[0], v[4], v[8], v[12], v[1], v[5], v[9], v[13], v[2], v[6], v[10], v[14], v[3], v[7], v[11], v[15]);
        return new Matrix4(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
    static fromColMajorArray(v) {
        if (v.length >= 16)
            return new Matrix4(v[0], v[1], v[2], v[3], v[4], v[5], v[6], v[7], v[8], v[9], v[10], v[11], v[12], v[13], v[14], v[15]);
        return new Matrix4(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
    static makeTranslation(x, y, z) {
        return Matrix4.makeRowMajor(1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1);
    }
    static makeScale(x, y, z) {
        return Matrix4.makeRowMajor(x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1);
    }
    static makeRotation(angleInDegrees, x, y, z) {
        var c = Math.cos(angleInDegrees * Math.PI / 180.0);
        var s = Math.sin(angleInDegrees * Math.PI / 180.0);
        var invLength = 1.0 / Math.sqrt(x * x + y * y + z * z);
        x *= invLength;
        y *= invLength;
        z *= invLength;
        return Matrix4.makeRowMajor(x * x * (1 - c) + c, x * y * (1 - c) - z * s, x * z * (1 - c) + y * s, 0.0, y * x * (1 - c) + z * s, y * y * (1 - c) + c, y * z * (1 - c) - x * s, 0.0, x * z * (1 - c) - y * s, y * z * (1 - c) + x * s, z * z * (1 - c) + c, 0.0, 0.0, 0.0, 0.0, 1.0);
    }
    static makeOrtho(left, right, bottom, top, near, far) {
        var tx = -(right + left) / (right - left);
        var ty = -(top + bottom) / (top - bottom);
        var tz = -(far + near) / (far - near);
        return Matrix4.makeRowMajor(2 / (right - left), 0, 0, tx, 0, 2 / (top - bottom), 0, ty, 0, 0, -2 / (far - near), tz, 0, 0, 0, 1);
    }
    static makeOrtho2D(left, right, bottom, top) {
        return Matrix4.makeOrtho(left, right, bottom, top, -1, 1);
    }
    static makeFrustum(left, right, bottom, top, near, far) {
        var A = (right + left) / (right - left);
        var B = (top + bottom) / (top - bottom);
        var C = -(far + near) / (far - near);
        var D = -2 * far * near / (far - near);
        return Matrix4.makeRowMajor(2 * near / (right - left), 0, A, 0, 0, 2 * near / (top - bottom), B, 0, 0, 0, C, D, 0, 0, -1, 0);
    }
    static makePerspectiveY(fovy, aspect, near, far) {
        let f = 1.0 / Math.tan(Math.PI * fovy / 360.0);
        return Matrix4.makeRowMajor(f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) / (near - far), 2 * far * near / (near - far), 0, 0, -1, 0);
    }
    static makePerspectiveX(fovx, aspect, near, far) {
        var f = 1.0 / Math.tan(Math.PI * fovx / 360.0);
        return Matrix4.makeRowMajor(f, 0, 0, 0, 0, f * aspect, 0, 0, 0, 0, (far + near) / (near - far), 2 * far * near / (near - far), 0, 0, -1, 0);
    }
    static makeLookAt(eye, center, up) {
        let F = Vector3.sub(center, eye).norm();
        let UP = up.norm();
        let S = (Vector3.cross(F, UP)).norm();
        let U = (Vector3.cross(S, F)).norm();
        return Matrix4.multiply(Matrix4.makeRowMajor(S.x, S.y, S.z, 0, U.x, U.y, U.z, 0, -F.x, -F.y, -F.z, 0, 0, 0, 0, 1), Matrix4.makeTranslation(-eye.x, -eye.y, -eye.z));
    }
    static makeLookAt2(eye, center, up) {
        let F = Vector3.sub(center, eye).norm();
        let UP = up.norm();
        let S = (Vector3.cross(F, UP)).norm();
        let U = (Vector3.cross(S, F)).norm();
        return Matrix4.multiply(Matrix4.makeTranslation(-eye.x, -eye.y, -eye.z), Matrix4.makeRowMajor(S.x, S.y, S.z, 0, U.x, U.y, U.z, 0, -F.x, -F.y, -F.z, 0, 0, 0, 0, 1));
    }
    static makeShadowBias() {
        return Matrix4.makeRowMajor(0.5, 0.0, 0.0, 0.5, 0.0, 0.5, 0.0, 0.5, 0.0, 0.0, 0.5, 0.5, 0.0, 0.0, 0.0, 1.0);
    }
    static makeCubeFaceMatrix(face) {
        // +X
        if (face == 0)
            return Matrix4.makeRotation(90.0, 0.0, 1.0, 0.0);
        // -X
        if (face == 1)
            return Matrix4.makeRotation(270.0, 0.0, 1.0, 0.0);
        // +Y
        if (face == 2)
            return Matrix4.makeRotation(90.0, 1.0, 0.0, 0.0);
        // -Y
        if (face == 3)
            return Matrix4.makeRotation(270.0, 1.0, 0.0, 0.0);
        // +Z
        if (face == 4)
            return Matrix4.makeIdentity();
        // -Z
        if (face == 5)
            return Matrix4.makeRotation(180.0, 0.0, 1.0, 0.0);
        return new Matrix4(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
    toColMajorArray() {
        return [
            this.m11, this.m21, this.m31, this.m41,
            this.m12, this.m22, this.m32, this.m42,
            this.m13, this.m23, this.m33, this.m43,
            this.m14, this.m24, this.m34, this.m44
        ];
    }
    toRowMajorArray() {
        return [
            this.m11, this.m12, this.m13, this.m14,
            this.m21, this.m22, this.m23, this.m24,
            this.m31, this.m32, this.m33, this.m34,
            this.m41, this.m42, this.m43, this.m44
        ];
    }
    static multiply3(a, b, c) {
        return Matrix4.multiply(a, Matrix4.multiply(b, c));
    }
    static multiply(a, b) {
        return new Matrix4(a.m11 * b.m11 + a.m21 * b.m12 + a.m31 * b.m13 + a.m41 * b.m14, a.m11 * b.m21 + a.m21 * b.m22 + a.m31 * b.m23 + a.m41 * b.m24, a.m11 * b.m31 + a.m21 * b.m32 + a.m31 * b.m33 + a.m41 * b.m34, a.m11 * b.m41 + a.m21 * b.m42 + a.m31 * b.m43 + a.m41 * b.m44, a.m12 * b.m11 + a.m22 * b.m12 + a.m32 * b.m13 + a.m42 * b.m14, a.m12 * b.m21 + a.m22 * b.m22 + a.m32 * b.m23 + a.m42 * b.m24, a.m12 * b.m31 + a.m22 * b.m32 + a.m32 * b.m33 + a.m42 * b.m34, a.m12 * b.m41 + a.m22 * b.m42 + a.m32 * b.m43 + a.m42 * b.m44, a.m13 * b.m11 + a.m23 * b.m12 + a.m33 * b.m13 + a.m43 * b.m14, a.m13 * b.m21 + a.m23 * b.m22 + a.m33 * b.m23 + a.m43 * b.m24, a.m13 * b.m31 + a.m23 * b.m32 + a.m33 * b.m33 + a.m43 * b.m34, a.m13 * b.m41 + a.m23 * b.m42 + a.m33 * b.m43 + a.m43 * b.m44, a.m14 * b.m11 + a.m24 * b.m12 + a.m34 * b.m13 + a.m44 * b.m14, a.m14 * b.m21 + a.m24 * b.m22 + a.m34 * b.m23 + a.m44 * b.m24, a.m14 * b.m31 + a.m24 * b.m32 + a.m34 * b.m33 + a.m44 * b.m34, a.m14 * b.m41 + a.m24 * b.m42 + a.m34 * b.m43 + a.m44 * b.m44);
    }
    LoadMatrix(m) {
        this.m11 = m.m11;
        this.m21 = m.m21;
        this.m31 = m.m31;
        this.m41 = m.m41;
        this.m12 = m.m12;
        this.m22 = m.m22;
        this.m32 = m.m32;
        this.m42 = m.m42;
        this.m13 = m.m13;
        this.m23 = m.m23;
        this.m33 = m.m33;
        this.m43 = m.m43;
        this.m14 = m.m14;
        this.m24 = m.m24;
        this.m34 = m.m34;
        this.m44 = m.m44;
        return this;
    }
    MultMatrix(m) {
        this.LoadMatrix(Matrix4.multiply(this, m));
        return this;
    }
    transform(v) {
        return new Vector4(this.m11 * v.x + this.m12 * v.y + this.m13 * v.z + this.m14 * v.w, this.m21 * v.x + this.m22 * v.y + this.m23 * v.z + this.m24 * v.w, this.m31 * v.x + this.m32 * v.y + this.m33 * v.z + this.m34 * v.w, this.m41 * v.x + this.m42 * v.y + this.m43 * v.z + this.m44 * v.w);
    }
    asInverse() {
        var tmp1 = this.m32 * this.m43 - this.m33 * this.m42;
        var tmp2 = this.m32 * this.m44 - this.m34 * this.m42;
        var tmp3 = this.m33 * this.m44 - this.m34 * this.m43;
        var tmp4 = this.m22 * tmp3 - this.m23 * tmp2 + this.m24 * tmp1;
        var tmp5 = this.m31 * this.m42 - this.m32 * this.m41;
        var tmp6 = this.m31 * this.m43 - this.m33 * this.m41;
        var tmp7 = -this.m21 * tmp1 + this.m22 * tmp6 - this.m23 * tmp5;
        var tmp8 = this.m31 * this.m44 - this.m34 * this.m41;
        var tmp9 = this.m21 * tmp2 - this.m22 * tmp8 + this.m24 * tmp5;
        var tmp10 = -this.m21 * tmp3 + this.m23 * tmp8 - this.m24 * tmp6;
        var tmp11 = 1 / (this.m11 * tmp4 + this.m12 * tmp10 + this.m13 * tmp9 + this.m14 * tmp7);
        var tmp12 = this.m22 * this.m43 - this.m23 * this.m42;
        var tmp13 = this.m22 * this.m44 - this.m24 * this.m42;
        var tmp14 = this.m23 * this.m44 - this.m24 * this.m43;
        var tmp15 = this.m22 * this.m33 - this.m23 * this.m32;
        var tmp16 = this.m22 * this.m34 - this.m24 * this.m32;
        var tmp17 = this.m23 * this.m34 - this.m24 * this.m33;
        var tmp18 = this.m21 * this.m43 - this.m23 * this.m41;
        var tmp19 = this.m21 * this.m44 - this.m24 * this.m41;
        var tmp20 = this.m21 * this.m33 - this.m23 * this.m31;
        var tmp21 = this.m21 * this.m34 - this.m24 * this.m31;
        var tmp22 = this.m21 * this.m42 - this.m22 * this.m41;
        var tmp23 = this.m21 * this.m32 - this.m22 * this.m31;
        return new Matrix4(tmp4 * tmp11, (-this.m12 * tmp3 + this.m13 * tmp2 - this.m14 * tmp1) * tmp11, (this.m12 * tmp14 - this.m13 * tmp13 + this.m14 * tmp12) * tmp11, (-this.m12 * tmp17 + this.m13 * tmp16 - this.m14 * tmp15) * tmp11, tmp10 * tmp11, (this.m11 * tmp3 - this.m13 * tmp8 + this.m14 * tmp6) * tmp11, (-this.m11 * tmp14 + this.m13 * tmp19 - this.m14 * tmp18) * tmp11, (this.m11 * tmp17 - this.m13 * tmp21 + this.m14 * tmp20) * tmp11, tmp9 * tmp11, (-this.m11 * tmp2 + this.m12 * tmp8 - this.m14 * tmp5) * tmp11, (this.m11 * tmp13 - this.m12 * tmp19 + this.m14 * tmp22) * tmp11, (-this.m11 * tmp16 + this.m12 * tmp21 - this.m14 * tmp23) * tmp11, tmp7 * tmp11, (this.m11 * tmp1 - this.m12 * tmp6 + this.m13 * tmp5) * tmp11, (-this.m11 * tmp12 + this.m12 * tmp18 - this.m13 * tmp22) * tmp11, (this.m11 * tmp15 - this.m12 * tmp20 + this.m13 * tmp23) * tmp11);
    }
    asTranspose() {
        return new Matrix4(this.m11, this.m12, this.m13, this.m14, this.m21, this.m22, this.m23, this.m24, this.m31, this.m32, this.m33, this.m34, this.m41, this.m42, this.m43, this.m44);
    }
} // class Matrix4
// Fluxions WebGL Library
// Copyright (c) 2017 - 2018 Jonathan Metzgar
// All Rights Reserved.
//
// MIT License
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
//
/// <reference path="./Vector2.ts" />
/// <reference path="./Vector3.ts" />
/// <reference path="./Vector4.ts" />
/// <reference path="./Matrix2.ts" />
/// <reference path="./Matrix3.ts" />
/// <reference path="./Matrix4.ts" />
var GTE;
(function (GTE) {
    function clamp(x, a, b) {
        return x < a ? a : x > b ? b : x;
    }
    GTE.clamp = clamp;
    // 0 <= mix <= 1
    function lerp(a, b, mix) {
        return mix * a + (1 - mix) * b;
    }
    GTE.lerp = lerp;
    function distancePointLine2(point, linePoint1, linePoint2) {
        let v = linePoint2.sub(linePoint1);
        let d = v.length();
        let n = Math.abs(v.y * point.x - v.x * point.y + linePoint2.x * linePoint1.y - linePoint2.y * linePoint1.x);
        if (d != 0.0)
            return n / d;
        return 1e30;
    }
    GTE.distancePointLine2 = distancePointLine2;
    function gaussian(x, center, sigma) {
        let t = (x - center) / sigma;
        return 1 / (sigma * Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * t * t);
        //return 1 / (Math.sqrt(2.0 * sigma * sigma * Math.PI)) * Math.exp(-Math.pow(x - center, 2) / (2 * sigma * sigma));
    }
    GTE.gaussian = gaussian;
    function min3(a, b, c) {
        return Math.min(Math.min(a, b), c);
    }
    GTE.min3 = min3;
    function max3(a, b, c) {
        return Math.max(Math.max(a, b), c);
    }
    GTE.max3 = max3;
})(GTE || (GTE = {}));
// Fluxions WebGL Library
// Copyright (c) 2017 - 2018 Jonathan Metzgar
// All Rights Reserved.
//
// MIT License
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
//
/// <reference path="../gte/GTE.ts" />
/// <reference path="Utils.ts" />
/// <reference path="RenderConfig.ts" />
/// // <reference path="Scenegraph.ts" />
/// // <reference path="IndexedGeometryMesh.ts" />
/// // <reference path="Texture.ts" />
/// // <reference path="MaterialLibrary.ts" />
class FxRenderingContext {
    constructor(width = 512, height = 384, id = "") {
        this.width = width;
        this.height = height;
        this.id = id;
        this.enabledExtensions = new Map();
        this.divElement_ = null;
        this.canvasElement_ = null;
        this.aspectRatio = 1.0;
        this._visible = false;
        if (id && id.length > 0) {
            let e = document.getElementById(id);
            if (e) {
                this.divElement_ = e;
            }
            else {
                e = document.createElement("div");
                e.id = id;
                document.body.appendChild(e);
                this.divElement_ = e;
            }
        }
        if (!this.divElement_) {
            this.divElement_ = document.createElement("div");
            this.divElement_.id = "fluxions";
        }
        this.canvasElement_ = document.createElement("canvas");
        this.canvasElement_.width = width;
        this.canvasElement_.height = height;
        if (this.canvasElement_) {
            let gl = this.canvasElement_.getContext("webgl");
            if (!gl) {
                gl = this.canvasElement_.getContext("experimental-webgl");
            }
            if (!gl) {
                this.divElement_.innerText = "WebGL not supported.";
                throw "Unable to create rendering context!";
            }
            else {
                this.gl = gl;
                this.divElement_.appendChild(this.canvasElement_);
                this.divElement_.align = "center";
                this.aspectRatio = width / height;
                let debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                if (debugInfo) {
                    let vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
                    let renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
                    hflog.log(vendor);
                    hflog.log(renderer);
                }
            }
        }
        else {
            throw "Unable to create canvas!";
        }
        // let self=this;
        // document.addEventListener("", (ev) {
        //     self._visible=true;
        // });
        // this.canvasElement_.addEventListener("de")
        this.EnableExtensions([
            "OES_standard_derivatives",
            "WEBGL_depth_texture",
            "OES_texture_float",
            "OES_element_index_uint",
            "EXT_texture_filter_anisotropic",
            "OES_texture_float",
            "OES_texture_float_linear"
        ]);
    }
    get visible() {
        return this._visible;
    }
    get canvas() {
        if (!this.canvasElement_)
            return new HTMLCanvasElement();
        return this.canvasElement_;
    }
    // ...
    EnableExtensions(names) {
        let supportedExtensions = this.gl.getSupportedExtensions();
        if (!supportedExtensions)
            return false;
        let allFound = true;
        for (let name of names) {
            let found = false;
            for (let ext of supportedExtensions) {
                if (name == ext) {
                    this.enabledExtensions.set(name, this.gl.getExtension(name));
                    hflog.log("Extension " + name + " enabled");
                    found = true;
                    break;
                }
            }
            if (!found) {
                hflog.log("Extension " + name + " not enabled");
                allFound = false;
                break;
            }
        }
        return allFound;
    }
    GetExtension(name) {
        if (this.enabledExtensions.has(name)) {
            return this.enabledExtensions.get(name);
        }
        return null;
    }
}
class Hatchetfish {
    constructor(logElementId = "") {
        this._logElementId = "";
        this._logElement = null;
        this._numLines = 0;
        this.logElement = logElementId;
    }
    set logElement(id) {
        let el = document.getElementById(id);
        if (el instanceof HTMLDivElement) {
            this._logElement = el;
            this._logElementId = id;
        }
    }
    clear() {
        this._numLines = 0;
        if (this._logElement) {
            this._logElement.innerHTML = "";
        }
        let errorElement = document.getElementById("errors");
        if (errorElement) {
            errorElement.remove();
            //errorElement.innerHTML = "";
        }
    }
    writeToLog(prefix, message, ...optionalParams) {
        let text = prefix + ": " + message;
        for (let op of optionalParams) {
            if (op.toString) {
                text += " " + op.toString();
            }
            else {
                text += " <unknown>";
            }
        }
        if (this._logElement) {
            let newHTML = "<br/>" + text + this._logElement.innerHTML;
            this._logElement.innerHTML = newHTML;
            //this._logElement.appendChild(document.createElement("br"));
            //this._logElement.appendChild(document.createTextNode(text));
        }
    }
    log(message, ...optionalParams) {
        this.writeToLog("[LOG]", message, ...optionalParams);
        console.log(message, ...optionalParams);
    }
    info(message, ...optionalParams) {
        this.writeToLog("[INF]", message, ...optionalParams);
        console.info(message, ...optionalParams);
    }
    error(message, ...optionalParams) {
        this.writeToLog("[ERR]", message, ...optionalParams);
        console.error(message, ...optionalParams);
    }
    warn(message, ...optionalParams) {
        this.writeToLog("[WRN]", message, ...optionalParams);
        console.warn(message, optionalParams);
    }
    debug(message, ...optionalParams) {
        console.log(message, ...optionalParams);
    }
}
var hflog = new Hatchetfish();
class FresnelDataPoint {
    constructor() {
        this.x = 0;
        this.value = Vector3.make(0, 0, 0);
    }
}
class FresnelMetalDataPoint {
    constructor(wavelength, n2, k2) {
        this.wavelength = wavelength;
        this.n2 = n2;
        this.k2 = k2;
        this.rgbWeight = new Vector3();
        this.Fgroundtruth = 0.0;
        this.Fspectral = 0.0;
    }
}
class CIEHorseshoeDataPoint {
    constructor(wavelength = 0, x = 0, y = 0, z = 0) {
        this.wavelength = wavelength;
        this.x = x;
        this.y = y;
        this.z = z;
    }
    get point2() { return new Vector2(this.x, this.y); }
    get point3() { return new Vector3(this.x, this.y, this.z); }
}
function within(x, a, b) {
    if (x < a)
        return false;
    if (x > b)
        return false;
    return true;
}
function notwithin(x, a, b) {
    if (x < a)
        return true;
    if (x > b)
        return true;
    return false;
}
function copyText(text) {
    try {
        let e = document.createElement("div");
        e.innerText = text;
        document.body.appendChild(e);
        let r = document.createRange();
        r.selectNode(e);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(r);
        document.execCommand("copy", false, text);
        e.remove();
    }
    catch (_a) {
        console.error("Unable to copy text to clipboard");
    }
}
class FresnelGraph {
    // n samples between a and b inclusively
    constructor(a = 0, b = 90, xName = "angle") {
        this.a = a;
        this.b = b;
        this.xName = xName;
        this.DATA_INDEX = 0;
        this.COMP1_INDEX = 1;
        this.COMP2_INDEX = 2;
        this.DIFF_INDEX = 3;
        this.TOTAL_GRAPHS = 4;
        //readonly n: number;
        this.graphs = [];
        this.fresnelData = [];
        this.fresnelComp1 = [];
        this.fresnelComp2 = [];
        this.fresnelDiff = [];
        this.n = b + 1;
        this.graphs.length = this.TOTAL_GRAPHS;
        let dAngle = (90) / (this.n - 1);
        for (let g = 0; g < this.TOTAL_GRAPHS; g++) {
            this.graphs[g] = [];
            this.graphs[g].length = this.n;
            for (let i = this.a; i <= this.b; i++) {
                this.graphs[g][i] = new FresnelDataPoint();
                this.graphs[g][i].x = i;
            }
        }
    }
    plot(graphIndex, x, wavelengthIndex, value) {
        if (notwithin(graphIndex, 0, this.TOTAL_GRAPHS))
            return;
        if (notwithin(wavelengthIndex, 0, 2))
            return;
        if (notwithin(x, this.a, this.b))
            return;
        //let i = Math.floor(x * (this.n - 1) / 90);
        let i = Math.floor(x);
        this.graphs[graphIndex][i].value.set(wavelengthIndex, value);
    }
    copydata(metalName, fm) {
        let graphIndex = 0;
        if (fm.comp1 != fm.comp2)
            graphIndex = 1;
        if (notwithin(graphIndex, 0, this.TOTAL_GRAPHS))
            return;
        let result = "# '" + this.makedataname(metalName, fm) + ".txt'\n";
        if (graphIndex == 0) {
            result += "# " + this.xName + "       r      g      b\n";
        }
        else {
            result += "# " + this.xName + "    fc1r   fc1g   fc1b   fc2r   fc2g   fc2b   diffr   diffg   diffb\n";
        }
        for (let i = 0; i < this.n; i++) {
            result += this.graphs[0][i].x + "\t";
            if (graphIndex == 0) {
                result += this.graphs[0][i].value.get(0).toFixed(5) + "\t";
                result += this.graphs[0][i].value.get(1).toFixed(5) + "\t";
                result += this.graphs[0][i].value.get(2).toFixed(5) + "\n";
            }
            if (graphIndex > 0) {
                result += this.graphs[1][i].value.get(0).toFixed(5) + "\t";
                result += this.graphs[1][i].value.get(1).toFixed(5) + "\t";
                result += this.graphs[1][i].value.get(2).toFixed(5) + "\t";
                result += this.graphs[2][i].value.get(0).toFixed(5) + "\t";
                result += this.graphs[2][i].value.get(1).toFixed(5) + "\t";
                result += this.graphs[2][i].value.get(2).toFixed(5) + "\t";
                result += this.graphs[3][i].value.get(0).toFixed(5) + "\t";
                result += this.graphs[3][i].value.get(1).toFixed(5) + "\t";
                result += this.graphs[3][i].value.get(2).toFixed(5) + "\n";
            }
        }
        copyText(result);
    }
    methodToString(i) {
        switch (i) {
            case 0: return "Specular";
            case 1: return "Schlick";
            case 2: return "Lazani";
            case 3: return "Glassner";
            case 4: return "Fresnel";
            case 5: return "Spectral";
        }
        return "What!?";
    }
    makedataname(metalName, fm) {
        if (fm.comp1 == fm.comp2) {
            let method = this.methodToString(fm.method);
            let datafile = metalName + "_" + method;
            return datafile;
        }
        else {
            let method1 = this.methodToString(fm.comp1);
            let method2 = this.methodToString(fm.comp2);
            let datafile = metalName + "_" + method1 + "_" + method2;
            return datafile;
        }
    }
    copygnuplot(metalName, fm) {
        let dataname = this.makedataname(metalName, fm);
        let result = "# '" + dataname + ".gp'\n\n";
        result += "set terminal pdfcairo size 9,4 enhanced font 'PragmataPro,16'\n";
        result += "set output '" + dataname + ".pdf'\n";
        result += "set key right center\n\n";
        result += "set style line 1 dt 1 lw 2 lc rgb '#ff0000'\n";
        result += "set style line 2 dt 1 lw 2 lc rgb '#00bf00'\n";
        result += "set style line 3 dt 1 lw 2 lc rgb '#0000ff'\n";
        result += "set style line 4 dt 2 lw 2 lc rgb '#ff0000'\n";
        result += "set style line 5 dt 2 lw 2 lc rgb '#00bf00'\n";
        result += "set style line 6 dt 2 lw 2 lc rgb '#0000ff'\n";
        result += "set style line 7 lt 1 lw 2 lc rgb '#00bfbf'\n";
        result += "set style line 8 lt 2 lw 2 lc rgb '#bf00bf'\n";
        result += "set style line 9 lt 3 lw 2 lc rgb '#bf6f00'\n\n";
        let datafile = "'" + dataname + ".txt'";
        if (fm.comp1 == fm.comp2) {
            let method = this.methodToString(fm.method);
            result += "plot " + datafile + " using 1:2 with lines ls 1 t '" + method + " R',\\\n";
            result += "     " + datafile + " using 1:3 with lines ls 2 t '" + method + " G',\\\n";
            result += "     " + datafile + " using 1:4 with lines ls 3 t '" + method + " B'\n\n";
        }
        else {
            let method1 = this.methodToString(fm.comp1);
            let method2 = this.methodToString(fm.comp2);
            result += "plot " + datafile + " using 1:2 with lines ls 1 t '" + method1 + " R',\\\n";
            result += "     " + datafile + " using 1:3 with lines ls 2 t '" + method1 + " G',\\\n";
            result += "     " + datafile + " using 1:4 with lines ls 3 t '" + method1 + " B',\\\n";
            result += "     " + datafile + " using 1:5 with lines ls 4 t '" + method2 + " R',\\\n";
            result += "     " + datafile + " using 1:6 with lines ls 5 t '" + method2 + " G',\\\n";
            result += "     " + datafile + " using 1:7 with lines ls 6 t '" + method2 + " B',\\\n";
            result += "     " + datafile + " using 1:8 with lines ls 7 t '|R| difference',\\\n";
            result += "     " + datafile + " using 1:9 with lines ls 8 t '|G| difference',\\\n";
            result += "     " + datafile + " using 1:10 with lines ls 9 t '|B| difference'\n\n";
        }
        copyText(result);
    }
    copyiordata(metalName, colorSpaceName, fm) {
        let dataname = metalName + "_" + colorSpaceName;
        let result = "# '" + dataname + ".txt'\n";
        result += "# " + this.xName + "       n2    k2    r      g      b\n";
        for (let i = this.a; i <= this.b; i++) {
            result += this.graphs[0][i].x + "\t";
            result += this.graphs[0][i].value.get(0).toFixed(5) + "\t";
            result += this.graphs[0][i].value.get(1).toFixed(5) + "\t";
            result += this.graphs[1][i].value.get(0).toFixed(5) + "\t";
            result += this.graphs[1][i].value.get(1).toFixed(5) + "\t";
            result += this.graphs[1][i].value.get(2).toFixed(5) + "\n";
        }
        copyText(result);
    }
    copyiorgnuplot(metalName, colorSpaceName, fm) {
        let dataname = metalName + "_" + colorSpaceName;
        let result = "# '" + dataname + ".gp'\n\n";
        result += "set terminal pdfcairo size 9,4 enhanced font 'PragmataPro,16'\n";
        result += "set output '" + dataname + ".pdf'\n";
        result += "set key right center\n\n";
        result += "set style line 1 dt 1 lw 4 lc rgb '#1f1f1f'\n";
        result += "set style line 2 dt 1 lw 4 lc rgb '#bfbfbf'\n";
        result += "set style line 3 dt 2 lw 2 lc rgb '#ff0000'\n";
        result += "set style line 4 dt 2 lw 2 lc rgb '#00bf00'\n";
        result += "set style line 5 dt 2 lw 2 lc rgb '#0000ff'\n\n";
        let datafile = "'" + dataname + ".txt'";
        result += "plot " + datafile + " using 1:2 with lines ls 1 t '" + metalName + " n2',\\\n";
        result += "     " + datafile + " using 1:3 with lines ls 2 t '" + metalName + " k2',\\\n";
        result += "     " + datafile + " using 1:4 with lines ls 3 t '" + colorSpaceName + " R',\\\n";
        result += "     " + datafile + " using 1:5 with lines ls 4 t '" + colorSpaceName + " G',\\\n";
        result += "     " + datafile + " using 1:6 with lines ls 5 t '" + colorSpaceName + " B'\n\n";
        copyText(result);
    }
    render(ctx2d, graphIndex, index, color, xoffset, yoffset, width, height) {
        ctx2d.strokeStyle = color;
        ctx2d.beginPath();
        let x = 0;
        let dx = (width + 1) / (this.n - 1);
        for (let i = 0; i < this.n; i++) {
            let y = (height - 1) * GTE.clamp(this.graphs[graphIndex][i].value.get(index), 0, 1);
            if (i == 0) {
                ctx2d.moveTo(x + xoffset, y + yoffset);
            }
            else {
                ctx2d.lineTo(x + xoffset, y + yoffset);
            }
            x += dx;
        }
        ctx2d.stroke();
    }
}
class FresnelMetal {
    constructor() {
        this.data = [];
        this.fresnelGraph = new FresnelGraph();
        this.iorGraph = new FresnelGraph(390, 830, "nm");
        this.canvas = null;
        this.div = null;
        this.context = null;
        this.width = 441;
        this.height = 201;
        this.middleY = 100;
        this.nmA = 3900;
        this.nmB = 8300;
        this.fresnelScale = 1.0;
        this.fresnelMin = 1e6;
        this.fresnelMax = -1e6;
        this.ismono = false;
        this.ciehs = [];
        this._wht = new Vector3();
        this._red = new Vector3();
        this._grn = new Vector3();
        this._blu = new Vector3();
        this.rednm = 0;
        this.grnnm = 0;
        this.blunm = 0;
        this.signm = 0;
        this.n2 = new Vector3();
        this.k2 = new Vector3();
        this.F0 = new Vector3();
        this.F1 = new Vector3();
        this.method = 1;
        this.comp1 = 1;
        this.comp2 = 1;
        this.data.length = 10000;
        for (let i = 0; i < this.data.length; i++) {
            this.data[i] = new FresnelMetalDataPoint(i / 10.0, 1.0, 0.0);
        }
        this.initHorseshoe();
    }
    setChromaticities(red, green, blue, white, sigma = 25) {
        this.ismono = false;
        this._wht.copy(white);
        this._red.copy(red);
        this._grn.copy(green);
        this._blu.copy(blue);
        // search for the best RGB wavelengths
        let whtpt = this._wht.toVector2();
        let points = [
            this._red.toVector2(),
            this._grn.toVector2(),
            this._blu.toVector2()
        ];
        let bestDistances = [1e30, 1e30, 1e30];
        let bestnm = [0, 0, 0];
        let currentDistances = [0.0, 0.0, 0.0];
        for (let hs of this.ciehs) {
            for (let i = 0; i < 3; i++) {
                // calculate distance to line from white point
                currentDistances[i] = GTE.distancePointLine2(hs.point2, whtpt, points[i]);
                if (currentDistances[i] < bestDistances[i]) {
                    bestDistances[i] = currentDistances[i];
                    bestnm[i] = hs.wavelength;
                }
            }
        }
        this.rednm = bestnm[0];
        this.grnnm = bestnm[1];
        this.blunm = bestnm[2];
        this.signm = sigma;
        this.calcRGBWeights();
    }
    calcRGBWeights() {
        // hflog.info("Found wavelengths R: " + this.rednm + " G: " + this.grnnm + " B: " + this.blunm);
        let area = Vector3.make(0, 0, 0);
        let irednm = (this.rednm * 10) | 0;
        let igrnnm = (this.grnnm * 10) | 0;
        let iblunm = (this.blunm * 10) | 0;
        // plot gaussian weights
        for (let i = this.nmA; i <= this.nmB; i++) {
            let wavelength = i / 10.0;
            if (this.signm > 0.01) {
                this.data[i].rgbWeight.x = GTE.gaussian(wavelength, this.rednm, this.signm);
                this.data[i].rgbWeight.y = GTE.gaussian(wavelength, this.grnnm, this.signm);
                this.data[i].rgbWeight.z = GTE.gaussian(wavelength, this.blunm, this.signm);
            }
            else {
                this.data[i].rgbWeight.reset((i == irednm) ? 10.0 : 0, (i == igrnnm) ? 10.0 : 0, (i == iblunm) ? 10.0 : 0);
            }
            // Riemann sum to calculate area under guassian curve. It should be one to be energy preserving.
            area = area.add(this.data[i].rgbWeight.mul(1.0 / 10.0));
        }
        let area_reciprocal = area.reciprocal();
        let area2 = Vector3.make(0, 0, 0);
        for (let i = this.nmA; i <= this.nmB; i++) {
            this.data[i].rgbWeight = this.data[i].rgbWeight.compdiv(area_reciprocal);
            area2 = area2.add(this.data[i].rgbWeight.mul(1.0 / 10.0));
        }
        this.recalcCoefs();
        // hflog.info("Area Before: " + Utils.niceVector(area));
        // hflog.info("Area After:  " + Utils.niceVector(area2));
    }
    recalcCoefs() {
        this.n2.reset();
        this.k2.reset();
        for (let i = this.nmA; i <= this.nmB; i++) {
            this.n2 = this.n2.add(this.data[i].rgbWeight.mul(this.data[i].n2 * .1));
            this.k2 = this.k2.add(this.data[i].rgbWeight.mul(this.data[i].k2 * .1));
        }
        let one = Vector3.make(1, 1, 1);
        let t = (one.sub(this.n2)).compdiv(one.add(this.n2));
        //this.F0 = t.compmul(t);
        this.F0.reset(this.fresnelExact(0, 0), this.fresnelExact(0, 1), this.fresnelExact(0, 2));
        let t1 = one.sub(this.n2).pow(2);
        let t2 = one.add(this.n2).pow(2);
        let n = t1.add(this.k2.pow(2));
        let d = t2.add(this.k2.pow(2));
        this.F1 = n.compdiv(d);
        // hflog.info("n2: " + Utils.niceVector(this.n2));
        // hflog.info("k2: " + Utils.niceVector(this.k2));
        // hflog.info("F0: " + Utils.niceVector(this.F0));
        // hflog.info("F1: " + Utils.niceVector(this.F1));
    }
    copydata(metalName, colorSpaceName) {
        for (let x = this.iorGraph.a; x <= this.iorGraph.b; x++) {
            this.iorGraph.plot(0, x, 0, this.data[x * 10].n2);
            this.iorGraph.plot(0, x, 1, this.data[x * 10].k2);
            this.iorGraph.plot(1, x, 0, 100 * this.data[x * 10].rgbWeight.r);
            this.iorGraph.plot(1, x, 1, 100 * this.data[x * 10].rgbWeight.g);
            this.iorGraph.plot(1, x, 2, 100 * this.data[x * 10].rgbWeight.b);
        }
        this.iorGraph.copyiordata(metalName, colorSpaceName, this);
    }
    copygnuplot(metalName, colorSpaceName) {
        this.iorGraph.copyiorgnuplot(metalName, colorSpaceName, this);
    }
    setSRGBChromaticies() {
        const srgbRed = Vector3.make(0.6400, 0.3300, 0.2126);
        const srgbGrn = Vector3.make(0.3000, 0.6000, 0.7152);
        const srgbBlu = Vector3.make(0.1500, 0.0600, 0.0722);
        const srgbD65Wht = Vector3.make(0.3127, 0.3290, 1.0000);
        this.setChromaticities(srgbRed, srgbGrn, srgbBlu, srgbD65Wht);
    }
    setDCIP3Chromaticies() {
        const dcip3Red = Vector3.make(0.680, 0.320, 0.999);
        const dcip3Grn = Vector3.make(0.265, 0.690, 0.999);
        const dcip3Blu = Vector3.make(0.150, 0.060, 0.999);
        const dcip3D65Wht = Vector3.make(0.3127, 0.3290, 1.000);
        const dcip3TheaterWht = Vector3.make(0.314, 0.351, 1.000);
        this.setChromaticities(dcip3Red, dcip3Grn, dcip3Blu, dcip3D65Wht);
    }
    setDCIP3TheaterChromaticies() {
        const dcip3Red = Vector3.make(0.680, 0.320, 0.999);
        const dcip3Grn = Vector3.make(0.265, 0.690, 0.999);
        const dcip3Blu = Vector3.make(0.150, 0.060, 0.999);
        const dcip3TheaterWht = Vector3.make(0.314, 0.351, 1.000);
        this.setChromaticities(dcip3Red, dcip3Grn, dcip3Blu, dcip3TheaterWht);
    }
    setAdobeChromaticies() {
        const adobeRed = Vector3.make(0.6400, 0.3300, 0.9999);
        const adobeGrn = Vector3.make(0.2100, 0.7100, 0.9999);
        const adobeBlu = Vector3.make(0.1500, 0.0600, 0.9999);
        const adobeWht = Vector3.make(0.3127, 0.3290, 1.0000);
        this.setChromaticities(adobeRed, adobeGrn, adobeBlu, adobeWht);
    }
    process(lines) {
        // data has the format
        // wavelength   n2   k2
        let dp = [];
        let count = 0;
        let minimum = 1e6;
        let maximum = -1e6;
        for (let line of lines) {
            if (count == 0) {
                count++;
                continue;
            }
            let wavelength = parseFloat(line[0]);
            let n2 = parseFloat(line[1]);
            let k2 = parseFloat(line[2]);
            minimum = GTE.min3(n2, k2, minimum);
            maximum = GTE.max3(n2, k2, maximum);
            dp.push(new FresnelMetalDataPoint(wavelength, n2, k2));
        }
        this.fresnelMax = Math.max(this.fresnelMax, maximum);
        this.fresnelMin = Math.max(this.fresnelMin, minimum);
        this.fresnelScale = this.height * 1.0 / this.fresnelMax;
        // use linear interpolation to map the wavelengths
        let srci = 0;
        for (let i = 0; i < this.data.length; i++) {
            let wavelength = i / 10.0;
            if (srci == 0 && dp[srci].wavelength > wavelength) {
                this.data[i].n2 = dp[srci].n2;
                this.data[i].k2 = dp[srci].k2;
            }
            else if (srci == dp.length - 1 && dp[srci].wavelength < wavelength) {
                this.data[i].n2 = dp[srci].n2;
                this.data[i].k2 = dp[srci].k2;
            }
            else {
                // skip forward until we have the right two samples
                let sample1 = dp[srci];
                let sample2 = dp[srci + 1];
                while (srci <= dp.length - 2 && sample2.wavelength < wavelength) {
                    srci++;
                    if (srci >= dp.length - 2)
                        break;
                    sample1 = dp[srci];
                    sample2 = dp[srci + 1];
                }
                let dw = sample2.wavelength - sample1.wavelength;
                let dn2 = sample2.n2 - sample1.n2;
                let dk2 = sample2.k2 - sample1.k2;
                let n2slope = dn2 / dw;
                let k2slope = dk2 / dw;
                let delta = this.data[i].wavelength - sample1.wavelength;
                this.data[i].n2 = sample1.n2 + delta * n2slope;
                this.data[i].k2 = sample1.k2 + delta * k2slope;
            }
        }
        this.recalcCoefs();
    }
    makeGraph() {
        if (!this.div) {
            let el = document.getElementById("metalGraphDiv");
            if (!el) {
                this.div = document.createElement("div");
                this.div.id = "metalGraphDiv";
                this.div.style.textAlign = "center";
                document.body.appendChild(this.div);
            }
            else {
                this.div = el;
                this.div.style.textAlign = "center";
            }
        }
        if (this.div && !this.canvas) {
            let el = document.getElementById("metalGraphCanvas");
            if (!el) {
                this.canvas = document.createElement("canvas");
                this.canvas.id = "metalGraphCanvas";
                // for wavelengths 390 to 830
                // and intensity -100 to +100
                this.canvas.width = 441 + 50 + 181;
                this.canvas.height = 201;
                this.width = this.canvas.width;
                this.height = this.canvas.height;
                this.canvas.style.margin = "auto";
                this.div.appendChild(this.canvas);
                this.context = this.canvas.getContext("2d");
            }
        }
    }
    renderGraph() {
        if (this.context) {
            let ctx2d = this.context;
            ctx2d.fillStyle = "#ffffff";
            ctx2d.fillRect(0, 0, this.width, this.height);
            let g1width = 441;
            let g2width = 201;
            let g1x = 0;
            let g1y = 0.75 * this.height;
            let g2x = this.width - 181;
            let g2y = this.height;
            ctx2d.strokeStyle = "black";
            ctx2d.beginPath();
            ctx2d.moveTo(0, 0);
            ctx2d.lineTo(0, this.height);
            ctx2d.moveTo(0, g1y);
            ctx2d.lineTo(g1width, g1y);
            ctx2d.moveTo(g2x, 0);
            ctx2d.lineTo(g2x, this.height);
            ctx2d.stroke();
            let scale = -this.fresnelScale;
            let y = this.middleY;
            ctx2d.strokeStyle = "#27251F"; // Process Black
            ctx2d.beginPath();
            ctx2d.moveTo(0, scale * this.data[this.nmA].n2 + g1y);
            for (let i = 0; i <= 440; i++) {
                ctx2d.lineTo(i, scale * this.data[this.nmA + i * 10].n2 + g1y);
            }
            ctx2d.stroke();
            ctx2d.strokeStyle = "#818387"; // Cool Gray
            ctx2d.beginPath();
            ctx2d.moveTo(0, scale * this.data[this.nmA].k2 + g1y);
            for (let i = 0; i <= 440; i++) {
                ctx2d.lineTo(i, scale * this.data[this.nmA + i * 10].k2 + g1y);
            }
            ctx2d.stroke();
            g1y = this.height;
            let vscale = -3000.0; //0.0001;
            scale = -1.0;
            let py = 0;
            ctx2d.strokeStyle = "red"; // Red
            ctx2d.beginPath();
            ctx2d.moveTo(0, scale * this.data[this.nmA].rgbWeight.x + g1y);
            let max = 0;
            for (let i = 0; i <= 440; i++) {
                let py = this.data[this.nmA + i * 10].rgbWeight.x;
                max = Math.max(py, max);
                ctx2d.lineTo(i, vscale * py + g1y);
            }
            ctx2d.stroke();
            ctx2d.strokeStyle = "green"; // Red
            ctx2d.beginPath();
            ctx2d.moveTo(0, scale * this.data[this.nmA].rgbWeight.y + g1y);
            for (let i = 0; i <= 440; i++) {
                ctx2d.lineTo(i, vscale * this.data[this.nmA + i * 10].rgbWeight.y + g1y);
            }
            ctx2d.stroke();
            ctx2d.strokeStyle = "blue"; // Red
            ctx2d.beginPath();
            ctx2d.moveTo(0, scale * this.data[this.nmA].rgbWeight.z + g1y);
            for (let i = 0; i <= 440; i++) {
                ctx2d.lineTo(i, vscale * this.data[this.nmA + i * 10].rgbWeight.z + g1y);
            }
            ctx2d.stroke();
            let colors = ["red", "green", "blue"];
            let compcolors1 = ["#ff0000", "#00ff00", "#0000ff"];
            let compcolors2 = ["#00ffff", "#ff00ff", "#ffff00"];
            let fc1 = 0;
            let fc2 = 0;
            for (let g = 0; g < 4; g++) {
                for (let wavelength = 0; wavelength < 3; wavelength++) {
                    for (let angle = 0; angle <= 90; angle++) {
                        let value = 0;
                        let fc1 = this.fresnel(this.comp1, angle, wavelength);
                        ;
                        let fc2 = this.fresnel(this.comp2, angle, wavelength);
                        if (g == 0) {
                            value = this.fresnel(this.method, angle, wavelength);
                        }
                        if (g == 1) {
                            value = fc1;
                        }
                        if (g == 2) {
                            value = fc2;
                        }
                        if (g == 3) {
                            value = Math.abs(fc1 - fc2);
                        }
                        this.fresnelGraph.plot(g, angle, wavelength, value);
                    }
                }
            }
            for (let wavelength = 0; wavelength < 3; wavelength++) {
                vscale = 200;
                if (this.comp1 != this.comp2) {
                    ctx2d.strokeStyle = compcolors1[wavelength];
                    ctx2d.beginPath();
                    ctx2d.moveTo(g2x, g2y);
                    for (let i = 0; i <= 180; i++) {
                        let yvalue = vscale * this.fresnel(this.comp1, i / 2, wavelength);
                        ctx2d.lineTo(g2x + i, g2y - yvalue);
                    }
                    ctx2d.stroke();
                    ctx2d.strokeStyle = compcolors2[wavelength];
                    ctx2d.beginPath();
                    ctx2d.moveTo(g2x, g2y);
                    for (let i = 0; i <= 180; i++) {
                        let yvalue = vscale * this.fresnel(this.comp2, i / 2, wavelength);
                        ctx2d.lineTo(g2x + i, g2y - yvalue);
                    }
                    ctx2d.stroke();
                    ctx2d.strokeStyle = compcolors1[wavelength];
                    ctx2d.beginPath();
                    ctx2d.moveTo(g2x, g2y);
                    for (let i = 0; i <= 180; i++) {
                        let fc1 = this.fresnel(this.comp1, i / 2, wavelength);
                        let fc2 = this.fresnel(this.comp2, i / 2, wavelength);
                        let yvalue = vscale * Math.abs(fc1 - fc2);
                        ctx2d.lineTo(g2x + i, -10 * (1 + wavelength) + g2y - yvalue);
                    }
                    ctx2d.stroke();
                }
                else {
                    ctx2d.strokeStyle = colors[wavelength];
                    ctx2d.beginPath();
                    ctx2d.moveTo(g2x, g2y);
                    for (let i = 0; i <= 180; i++) {
                        let yvalue = vscale * this.fresnel(this.method, i / 2, wavelength);
                        ctx2d.lineTo(g2x + i, g2y - yvalue);
                    }
                    ctx2d.stroke();
                }
            }
        }
    }
    fresnel(method, angle, index) {
        switch (method) {
            case 0: return this.fresnelSpecular(angle, index);
            case 1: return this.fresnelSchlick(angle, index);
            case 2: return this.fresnelLazani(angle, index);
            case 3: return this.fresnelApprox(angle, index);
            case 4: return this.fresnelExact(angle, index);
            case 5: return this.fresnelSpectral(angle, index);
        }
        return this.fresnelExact(angle, index);
    }
    fresnelSpecular(angle, index) {
        let cos_theta = Math.cos(angle * GTE.toRadians);
        let c = Math.pow(1.0 - cos_theta, 5.0);
        let f0 = this.F1.y;
        return this.F1.get(index) * (f0 + (1.0 - f0) * c);
    }
    fresnelSchlick(angle, index) {
        let cos_theta = Math.cos(angle * GTE.toRadians);
        let F0 = this.F0.get(index);
        return F0 + (1 - F0) * Math.pow(1 - cos_theta, 5);
    }
    fresnelLazani(angle, index) {
        let c = Math.pow(1.0 - Math.cos(angle * GTE.toRadians), 5.0);
        let n2 = this.n2.get(index);
        let k2 = this.k2.get(index);
        let t1 = Math.pow(n2 - 1.0, 2.0);
        let t2 = Math.pow(n2 + 1.0, 2.0);
        let t3 = k2 * k2;
        return (t1 + 4.0 * c * n2 + t3) / (t2 + t3);
    }
    fresnelApprox(angle, index) {
        let cos_theta = Math.cos(angle * GTE.toRadians);
        let n = this.n2.get(index);
        let k = this.k2.get(index);
        let n2 = n * n;
        let k2 = k * k;
        let cos2 = cos_theta * cos_theta;
        let n2k2cos2 = (n2 + k2) * cos2;
        let n2cos = 2.0 * cos_theta * n;
        let n_minus_cos_2 = (n - cos_theta) * (n - cos_theta);
        let n_plus_cos_2 = (n + cos_theta) * (n + cos_theta);
        let Rs = (n_minus_cos_2 + k2) / (n_plus_cos_2 + k2);
        let Rp = (n2k2cos2 - n2cos + 1.0) / (n2k2cos2 + n2cos + 1.0);
        return (Rs * Rs + Rp * Rp) * 0.5;
    }
    fresnelExact(angle, index) {
        let cos_theta = Math.cos(angle * GTE.toRadians);
        let n_1 = 1.0;
        let n_2 = this.n2.get(index);
        let k_2 = this.k2.get(index);
        let k_2Squared = k_2 * k_2;
        let n_2Squared = n_2 * n_2;
        let n_1Squared = n_1 * n_1;
        let NcrossLSquared = 1.0 - cos_theta * cos_theta;
        let a = n_2Squared - k_2Squared - n_1Squared * NcrossLSquared;
        let aSquared = a * a;
        let b = 4.0 * n_2Squared * k_2Squared;
        let c = Math.sqrt(aSquared + b);
        let p2 = 0.5 * (c + a);
        let p = Math.sqrt(p2);
        let q2 = 0.5 * (c - a);
        let d1 = n_1 * cos_theta - p;
        let d2 = n_1 * cos_theta + p;
        let rho_perp = (d1 * d1 + q2) / (d2 * d2 + q2);
        let e1 = p - n_1 * (1.0 / cos_theta - cos_theta);
        let e2 = p + n_1 * (1.0 / cos_theta - cos_theta);
        let rho_parl = rho_perp * (e1 * e1 + q2) / (e2 * e2 + q2);
        return (rho_perp * rho_perp + rho_parl * rho_parl) * 0.5;
    }
    fullFresnel(cos_theta, n_2, k_2) {
        let n_1 = 1.0;
        let k_2Squared = k_2 * k_2;
        let n_2Squared = n_2 * n_2;
        let n_1Squared = n_1 * n_1;
        let NcrossLSquared = 1.0 - cos_theta * cos_theta;
        let a = n_2Squared - k_2Squared - n_1Squared * NcrossLSquared;
        let aSquared = a * a;
        let b = 4.0 * n_2Squared * k_2Squared;
        let c = Math.sqrt(aSquared + b);
        let p2 = 0.5 * (c + a);
        let p = Math.sqrt(p2);
        let q2 = 0.5 * (c - a);
        let d1 = n_1 * cos_theta - p;
        let d2 = n_1 * cos_theta + p;
        let rho_perp = (d1 * d1 + q2) / (d2 * d2 + q2);
        let e1 = p - n_1 * (1.0 / cos_theta - cos_theta);
        let e2 = p + n_1 * (1.0 / cos_theta - cos_theta);
        let rho_parl = rho_perp * (e1 * e1 + q2) / (e2 * e2 + q2);
        return (rho_perp * rho_perp + rho_parl * rho_parl) * 0.5;
    }
    fresnelSpectral(angle, index) {
        let F_spectral = 0;
        let cos_theta = Math.cos(angle * GTE.toRadians);
        for (let i = this.nmA; i <= this.nmB; i++) {
            F_spectral += 0.1 * this.fullFresnel(cos_theta, this.data[i].n2, this.data[i].k2) * this.data[i].rgbWeight.get(index);
        }
        return F_spectral;
    }
    get PBn2() {
        return Vector3.make(1.33, 1.33, 1.33);
    }
    get PBk2() {
        return Vector3.make(0.0, 0.0, 0.0);
    }
    initHorseshoe() {
        this.ciehs = [
            new CIEHorseshoeDataPoint(390, 0.17842, 0.02464, 0.79694),
            new CIEHorseshoeDataPoint(391, 0.17838, 0.02482, 0.79679),
            new CIEHorseshoeDataPoint(392, 0.17831, 0.02496, 0.79673),
            new CIEHorseshoeDataPoint(393, 0.17819, 0.02505, 0.79676),
            new CIEHorseshoeDataPoint(394, 0.17803, 0.02510, 0.79687),
            new CIEHorseshoeDataPoint(395, 0.17784, 0.02509, 0.79706),
            new CIEHorseshoeDataPoint(396, 0.17763, 0.02504, 0.79733),
            new CIEHorseshoeDataPoint(397, 0.17738, 0.02494, 0.79769),
            new CIEHorseshoeDataPoint(398, 0.17711, 0.02478, 0.79811),
            new CIEHorseshoeDataPoint(399, 0.17682, 0.02458, 0.79860),
            new CIEHorseshoeDataPoint(400, 0.17652, 0.02432, 0.79915),
            new CIEHorseshoeDataPoint(401, 0.17621, 0.02403, 0.79976),
            new CIEHorseshoeDataPoint(402, 0.17590, 0.02371, 0.80040),
            new CIEHorseshoeDataPoint(403, 0.17559, 0.02338, 0.80103),
            new CIEHorseshoeDataPoint(404, 0.17530, 0.02307, 0.80163),
            new CIEHorseshoeDataPoint(405, 0.17504, 0.02279, 0.80217),
            new CIEHorseshoeDataPoint(406, 0.17480, 0.02255, 0.80265),
            new CIEHorseshoeDataPoint(407, 0.17457, 0.02236, 0.80308),
            new CIEHorseshoeDataPoint(408, 0.17432, 0.02218, 0.80349),
            new CIEHorseshoeDataPoint(409, 0.17405, 0.02202, 0.80393),
            new CIEHorseshoeDataPoint(410, 0.17372, 0.02185, 0.80442),
            new CIEHorseshoeDataPoint(411, 0.17333, 0.02168, 0.80499),
            new CIEHorseshoeDataPoint(412, 0.17290, 0.02150, 0.80560),
            new CIEHorseshoeDataPoint(413, 0.17243, 0.02133, 0.80623),
            new CIEHorseshoeDataPoint(414, 0.17196, 0.02118, 0.80685),
            new CIEHorseshoeDataPoint(415, 0.17151, 0.02106, 0.80744),
            new CIEHorseshoeDataPoint(416, 0.17107, 0.02097, 0.80796),
            new CIEHorseshoeDataPoint(417, 0.17065, 0.02092, 0.80844),
            new CIEHorseshoeDataPoint(418, 0.17023, 0.02090, 0.80887),
            new CIEHorseshoeDataPoint(419, 0.16980, 0.02093, 0.80927),
            new CIEHorseshoeDataPoint(420, 0.16935, 0.02100, 0.80966),
            new CIEHorseshoeDataPoint(421, 0.16886, 0.02111, 0.81004),
            new CIEHorseshoeDataPoint(422, 0.16834, 0.02126, 0.81040),
            new CIEHorseshoeDataPoint(423, 0.16780, 0.02144, 0.81076),
            new CIEHorseshoeDataPoint(424, 0.16726, 0.02165, 0.81109),
            new CIEHorseshoeDataPoint(425, 0.16672, 0.02188, 0.81140),
            new CIEHorseshoeDataPoint(426, 0.16620, 0.02213, 0.81167),
            new CIEHorseshoeDataPoint(427, 0.16569, 0.02240, 0.81190),
            new CIEHorseshoeDataPoint(428, 0.16518, 0.02271, 0.81211),
            new CIEHorseshoeDataPoint(429, 0.16465, 0.02307, 0.81228),
            new CIEHorseshoeDataPoint(430, 0.16408, 0.02349, 0.81243),
            new CIEHorseshoeDataPoint(431, 0.16346, 0.02398, 0.81255),
            new CIEHorseshoeDataPoint(432, 0.16280, 0.02453, 0.81267),
            new CIEHorseshoeDataPoint(433, 0.16212, 0.02512, 0.81276),
            new CIEHorseshoeDataPoint(434, 0.16142, 0.02572, 0.81285),
            new CIEHorseshoeDataPoint(435, 0.16074, 0.02632, 0.81294),
            new CIEHorseshoeDataPoint(436, 0.16010, 0.02689, 0.81301),
            new CIEHorseshoeDataPoint(437, 0.15949, 0.02744, 0.81306),
            new CIEHorseshoeDataPoint(438, 0.15890, 0.02800, 0.81309),
            new CIEHorseshoeDataPoint(439, 0.15831, 0.02860, 0.81309),
            new CIEHorseshoeDataPoint(440, 0.15769, 0.02925, 0.81306),
            new CIEHorseshoeDataPoint(441, 0.15703, 0.02998, 0.81299),
            new CIEHorseshoeDataPoint(442, 0.15632, 0.03080, 0.81289),
            new CIEHorseshoeDataPoint(443, 0.15557, 0.03168, 0.81275),
            new CIEHorseshoeDataPoint(444, 0.15479, 0.03262, 0.81259),
            new CIEHorseshoeDataPoint(445, 0.15400, 0.03360, 0.81240),
            new CIEHorseshoeDataPoint(446, 0.15320, 0.03462, 0.81218),
            new CIEHorseshoeDataPoint(447, 0.15238, 0.03570, 0.81192),
            new CIEHorseshoeDataPoint(448, 0.15154, 0.03686, 0.81159),
            new CIEHorseshoeDataPoint(449, 0.15068, 0.03814, 0.81118),
            new CIEHorseshoeDataPoint(450, 0.14977, 0.03958, 0.81065),
            new CIEHorseshoeDataPoint(451, 0.14882, 0.04119, 0.80999),
            new CIEHorseshoeDataPoint(452, 0.14779, 0.04300, 0.80921),
            new CIEHorseshoeDataPoint(453, 0.14670, 0.04499, 0.80831),
            new CIEHorseshoeDataPoint(454, 0.14551, 0.04717, 0.80732),
            new CIEHorseshoeDataPoint(455, 0.14423, 0.04951, 0.80626),
            new CIEHorseshoeDataPoint(456, 0.14283, 0.05202, 0.80515),
            new CIEHorseshoeDataPoint(457, 0.14132, 0.05471, 0.80397),
            new CIEHorseshoeDataPoint(458, 0.13972, 0.05759, 0.80269),
            new CIEHorseshoeDataPoint(459, 0.13802, 0.06067, 0.80130),
            new CIEHorseshoeDataPoint(460, 0.13627, 0.06397, 0.79976),
            new CIEHorseshoeDataPoint(461, 0.13446, 0.06751, 0.79803),
            new CIEHorseshoeDataPoint(462, 0.13258, 0.07132, 0.79610),
            new CIEHorseshoeDataPoint(463, 0.13062, 0.07543, 0.79394),
            new CIEHorseshoeDataPoint(464, 0.12855, 0.07992, 0.79153),
            new CIEHorseshoeDataPoint(465, 0.12634, 0.08482, 0.78884),
            new CIEHorseshoeDataPoint(466, 0.12395, 0.09020, 0.78585),
            new CIEHorseshoeDataPoint(467, 0.12137, 0.09611, 0.78252),
            new CIEHorseshoeDataPoint(468, 0.11859, 0.10260, 0.77881),
            new CIEHorseshoeDataPoint(469, 0.11563, 0.10971, 0.77466),
            new CIEHorseshoeDataPoint(470, 0.11247, 0.11750, 0.77003),
            new CIEHorseshoeDataPoint(471, 0.10912, 0.12603, 0.76485),
            new CIEHorseshoeDataPoint(472, 0.10557, 0.13535, 0.75908),
            new CIEHorseshoeDataPoint(473, 0.10182, 0.14553, 0.75265),
            new CIEHorseshoeDataPoint(474, 0.09784, 0.15663, 0.74553),
            new CIEHorseshoeDataPoint(475, 0.09363, 0.16873, 0.73765),
            new CIEHorseshoeDataPoint(476, 0.08916, 0.18188, 0.72896),
            new CIEHorseshoeDataPoint(477, 0.08447, 0.19609, 0.71944),
            new CIEHorseshoeDataPoint(478, 0.07957, 0.21135, 0.70908),
            new CIEHorseshoeDataPoint(479, 0.07450, 0.22760, 0.69790),
            new CIEHorseshoeDataPoint(480, 0.06929, 0.24478, 0.68593),
            new CIEHorseshoeDataPoint(481, 0.06400, 0.26281, 0.67319),
            new CIEHorseshoeDataPoint(482, 0.05863, 0.28170, 0.65966),
            new CIEHorseshoeDataPoint(483, 0.05323, 0.30150, 0.64528),
            new CIEHorseshoeDataPoint(484, 0.04781, 0.32221, 0.62998),
            new CIEHorseshoeDataPoint(485, 0.04243, 0.34386, 0.61371),
            new CIEHorseshoeDataPoint(486, 0.03714, 0.36644, 0.59642),
            new CIEHorseshoeDataPoint(487, 0.03201, 0.38982, 0.57817),
            new CIEHorseshoeDataPoint(488, 0.02711, 0.41387, 0.55902),
            new CIEHorseshoeDataPoint(489, 0.02250, 0.43840, 0.53909),
            new CIEHorseshoeDataPoint(490, 0.01826, 0.46323, 0.51851),
            new CIEHorseshoeDataPoint(491, 0.01443, 0.48816, 0.49741),
            new CIEHorseshoeDataPoint(492, 0.01110, 0.51301, 0.47589),
            new CIEHorseshoeDataPoint(493, 0.00834, 0.53760, 0.45406),
            new CIEHorseshoeDataPoint(494, 0.00623, 0.56173, 0.43204),
            new CIEHorseshoeDataPoint(495, 0.00486, 0.58520, 0.40993),
            new CIEHorseshoeDataPoint(496, 0.00428, 0.60787, 0.38785),
            new CIEHorseshoeDataPoint(497, 0.00443, 0.62973, 0.36584),
            new CIEHorseshoeDataPoint(498, 0.00520, 0.65087, 0.34393),
            new CIEHorseshoeDataPoint(499, 0.00648, 0.67137, 0.32214),
            new CIEHorseshoeDataPoint(500, 0.00817, 0.69130, 0.30052),
            new CIEHorseshoeDataPoint(501, 0.01017, 0.71070, 0.27912),
            new CIEHorseshoeDataPoint(502, 0.01251, 0.72943, 0.25806),
            new CIEHorseshoeDataPoint(503, 0.01525, 0.74730, 0.23744),
            new CIEHorseshoeDataPoint(504, 0.01846, 0.76414, 0.21740),
            new CIEHorseshoeDataPoint(505, 0.02218, 0.77978, 0.19804),
            new CIEHorseshoeDataPoint(506, 0.02648, 0.79401, 0.17951),
            new CIEHorseshoeDataPoint(507, 0.03143, 0.80653, 0.16204),
            new CIEHorseshoeDataPoint(508, 0.03704, 0.81710, 0.14587),
            new CIEHorseshoeDataPoint(509, 0.04333, 0.82555, 0.13111),
            new CIEHorseshoeDataPoint(510, 0.05030, 0.83185, 0.11785),
            new CIEHorseshoeDataPoint(511, 0.05788, 0.83606, 0.10606),
            new CIEHorseshoeDataPoint(512, 0.06588, 0.83858, 0.09554),
            new CIEHorseshoeDataPoint(513, 0.07408, 0.83984, 0.08609),
            new CIEHorseshoeDataPoint(514, 0.08228, 0.84018, 0.07754),
            new CIEHorseshoeDataPoint(515, 0.09030, 0.83993, 0.06977),
            new CIEHorseshoeDataPoint(516, 0.09804, 0.83930, 0.06266),
            new CIEHorseshoeDataPoint(517, 0.10558, 0.83823, 0.05620),
            new CIEHorseshoeDataPoint(518, 0.11304, 0.83660, 0.05035),
            new CIEHorseshoeDataPoint(519, 0.12056, 0.83434, 0.04510),
            new CIEHorseshoeDataPoint(520, 0.12825, 0.83134, 0.04040),
            new CIEHorseshoeDataPoint(521, 0.13620, 0.82759, 0.03621),
            new CIEHorseshoeDataPoint(522, 0.14434, 0.82318, 0.03248),
            new CIEHorseshoeDataPoint(523, 0.15262, 0.81824, 0.02913),
            new CIEHorseshoeDataPoint(524, 0.16097, 0.81290, 0.02613),
            new CIEHorseshoeDataPoint(525, 0.16931, 0.80726, 0.02343),
            new CIEHorseshoeDataPoint(526, 0.17760, 0.80140, 0.02100),
            new CIEHorseshoeDataPoint(527, 0.18580, 0.79539, 0.01881),
            new CIEHorseshoeDataPoint(528, 0.19386, 0.78929, 0.01686),
            new CIEHorseshoeDataPoint(529, 0.20176, 0.78314, 0.01511),
            new CIEHorseshoeDataPoint(530, 0.20946, 0.77699, 0.01355),
            new CIEHorseshoeDataPoint(531, 0.21696, 0.77088, 0.01216),
            new CIEHorseshoeDataPoint(532, 0.22432, 0.76476, 0.01092),
            new CIEHorseshoeDataPoint(533, 0.23159, 0.75860, 0.00980),
            new CIEHorseshoeDataPoint(534, 0.23885, 0.75235, 0.00879),
            new CIEHorseshoeDataPoint(535, 0.24615, 0.74597, 0.00788),
            new CIEHorseshoeDataPoint(536, 0.25353, 0.73942, 0.00705),
            new CIEHorseshoeDataPoint(537, 0.26097, 0.73274, 0.00630),
            new CIEHorseshoeDataPoint(538, 0.26841, 0.72597, 0.00562),
            new CIEHorseshoeDataPoint(539, 0.27582, 0.71916, 0.00502),
            new CIEHorseshoeDataPoint(540, 0.28316, 0.71236, 0.00448),
            new CIEHorseshoeDataPoint(541, 0.29038, 0.70561, 0.00401),
            new CIEHorseshoeDataPoint(542, 0.29751, 0.69891, 0.00359),
            new CIEHorseshoeDataPoint(543, 0.30452, 0.69226, 0.00322),
            new CIEHorseshoeDataPoint(544, 0.31144, 0.68568, 0.00288),
            new CIEHorseshoeDataPoint(545, 0.31826, 0.67915, 0.00259),
            new CIEHorseshoeDataPoint(546, 0.32499, 0.67269, 0.00233),
            new CIEHorseshoeDataPoint(547, 0.33163, 0.66628, 0.00209),
            new CIEHorseshoeDataPoint(548, 0.33819, 0.65992, 0.00188),
            new CIEHorseshoeDataPoint(549, 0.34469, 0.65361, 0.00169),
            new CIEHorseshoeDataPoint(550, 0.35114, 0.64734, 0.00152),
            new CIEHorseshoeDataPoint(551, 0.35755, 0.64109, 0.00136),
            new CIEHorseshoeDataPoint(552, 0.36397, 0.63481, 0.00122),
            new CIEHorseshoeDataPoint(553, 0.37043, 0.62848, 0.00109),
            new CIEHorseshoeDataPoint(554, 0.37696, 0.62206, 0.00098),
            new CIEHorseshoeDataPoint(555, 0.38361, 0.61552, 0.00088),
            new CIEHorseshoeDataPoint(556, 0.39036, 0.60885, 0.00079),
            new CIEHorseshoeDataPoint(557, 0.39716, 0.60214, 0.00071),
            new CIEHorseshoeDataPoint(558, 0.40393, 0.59543, 0.00064),
            new CIEHorseshoeDataPoint(559, 0.41062, 0.58881, 0.00057),
            new CIEHorseshoeDataPoint(560, 0.41716, 0.58232, 0.00051),
            new CIEHorseshoeDataPoint(561, 0.42354, 0.57600, 0.00046),
            new CIEHorseshoeDataPoint(562, 0.42980, 0.56979, 0.00042),
            new CIEHorseshoeDataPoint(563, 0.43602, 0.56360, 0.00037),
            new CIEHorseshoeDataPoint(564, 0.44227, 0.55740, 0.00034),
            new CIEHorseshoeDataPoint(565, 0.44859, 0.55110, 0.00030),
            new CIEHorseshoeDataPoint(566, 0.45503, 0.54470, 0.00027),
            new CIEHorseshoeDataPoint(567, 0.46153, 0.53823, 0.00025),
            new CIEHorseshoeDataPoint(568, 0.46803, 0.53175, 0.00022),
            new CIEHorseshoeDataPoint(569, 0.47450, 0.52530, 0.00020),
            new CIEHorseshoeDataPoint(570, 0.48088, 0.51894, 0.00018),
            new CIEHorseshoeDataPoint(571, 0.48714, 0.51269, 0.00016),
            new CIEHorseshoeDataPoint(572, 0.49331, 0.50654, 0.00015),
            new CIEHorseshoeDataPoint(573, 0.49939, 0.50048, 0.00013),
            new CIEHorseshoeDataPoint(574, 0.50541, 0.49447, 0.00012),
            new CIEHorseshoeDataPoint(575, 0.51138, 0.48851, 0.00011),
            new CIEHorseshoeDataPoint(576, 0.51732, 0.48258, 0.00010),
            new CIEHorseshoeDataPoint(577, 0.52323, 0.47668, 0.00009),
            new CIEHorseshoeDataPoint(578, 0.52914, 0.47078, 0.00008),
            new CIEHorseshoeDataPoint(579, 0.53505, 0.46488, 0.00007),
            new CIEHorseshoeDataPoint(580, 0.54097, 0.45896, 0.00007),
            new CIEHorseshoeDataPoint(581, 0.54689, 0.45305, 0.00006),
            new CIEHorseshoeDataPoint(582, 0.55275, 0.44719, 0.00006),
            new CIEHorseshoeDataPoint(583, 0.55849, 0.44146, 0.00005),
            new CIEHorseshoeDataPoint(584, 0.56405, 0.43591, 0.00005),
            new CIEHorseshoeDataPoint(585, 0.56937, 0.43059, 0.00004),
            new CIEHorseshoeDataPoint(586, 0.57444, 0.42552, 0.00004),
            new CIEHorseshoeDataPoint(587, 0.57930, 0.42066, 0.00004),
            new CIEHorseshoeDataPoint(588, 0.58401, 0.41596, 0.00003),
            new CIEHorseshoeDataPoint(589, 0.58860, 0.41137, 0.00003),
            new CIEHorseshoeDataPoint(590, 0.59312, 0.40685, 0.00003),
            new CIEHorseshoeDataPoint(591, 0.59760, 0.40238, 0.00002),
            new CIEHorseshoeDataPoint(592, 0.60201, 0.39796, 0.00002),
            new CIEHorseshoeDataPoint(593, 0.60636, 0.39362, 0.00002),
            new CIEHorseshoeDataPoint(594, 0.61060, 0.38938, 0.00002),
            new CIEHorseshoeDataPoint(595, 0.61474, 0.38524, 0.00002),
            new CIEHorseshoeDataPoint(596, 0.61877, 0.38121, 0.00002),
            new CIEHorseshoeDataPoint(597, 0.62269, 0.37729, 0.00002),
            new CIEHorseshoeDataPoint(598, 0.62653, 0.37346, 0.00001),
            new CIEHorseshoeDataPoint(599, 0.63028, 0.36971, 0.00001),
            new CIEHorseshoeDataPoint(600, 0.63396, 0.36602, 0.00001),
            new CIEHorseshoeDataPoint(601, 0.63758, 0.36241, 0.00001),
            new CIEHorseshoeDataPoint(602, 0.64111, 0.35888, 0.00001),
            new CIEHorseshoeDataPoint(603, 0.64454, 0.35545, 0.00001),
            new CIEHorseshoeDataPoint(604, 0.64785, 0.35214, 0.00001),
            new CIEHorseshoeDataPoint(605, 0.65103, 0.34896, 0.00001),
            new CIEHorseshoeDataPoint(606, 0.65407, 0.34593, 0.00001),
            new CIEHorseshoeDataPoint(607, 0.65697, 0.34302, 0.00001),
            new CIEHorseshoeDataPoint(608, 0.65975, 0.34024, 0.00001),
            new CIEHorseshoeDataPoint(609, 0.66242, 0.33758, 0.00001),
            new CIEHorseshoeDataPoint(610, 0.66498, 0.33502, 0.00001),
            new CIEHorseshoeDataPoint(611, 0.66744, 0.33256, 0.00001),
            new CIEHorseshoeDataPoint(612, 0.66980, 0.33019, 0.00001),
            new CIEHorseshoeDataPoint(613, 0.67208, 0.32791, 0.00001),
            new CIEHorseshoeDataPoint(614, 0.67427, 0.32572, 0.00000),
            new CIEHorseshoeDataPoint(615, 0.67638, 0.32361, 0.00000),
            new CIEHorseshoeDataPoint(616, 0.67841, 0.32159, 0.00000),
            new CIEHorseshoeDataPoint(617, 0.68038, 0.31962, 0.00000),
            new CIEHorseshoeDataPoint(618, 0.68228, 0.31772, 0.00000),
            new CIEHorseshoeDataPoint(619, 0.68414, 0.31586, 0.00000),
            new CIEHorseshoeDataPoint(620, 0.68596, 0.31404, 0.00000),
            new CIEHorseshoeDataPoint(621, 0.68773, 0.31227, 0.00000),
            new CIEHorseshoeDataPoint(622, 0.68945, 0.31055, 0.00000),
            new CIEHorseshoeDataPoint(623, 0.69109, 0.30891, 0.00000),
            new CIEHorseshoeDataPoint(624, 0.69262, 0.30738, 0.00000),
            new CIEHorseshoeDataPoint(625, 0.69405, 0.30595, 0.00000),
            new CIEHorseshoeDataPoint(626, 0.69535, 0.30465, 0.00000),
            new CIEHorseshoeDataPoint(627, 0.69656, 0.30344, 0.00000),
            new CIEHorseshoeDataPoint(628, 0.69768, 0.30232, 0.00000),
            new CIEHorseshoeDataPoint(629, 0.69875, 0.30125, 0.00000),
            new CIEHorseshoeDataPoint(630, 0.69977, 0.30023, 0.00000),
            new CIEHorseshoeDataPoint(631, 0.70077, 0.29923, 0.00000),
            new CIEHorseshoeDataPoint(632, 0.70174, 0.29826, 0.00000),
            new CIEHorseshoeDataPoint(633, 0.70268, 0.29732, 0.00000),
            new CIEHorseshoeDataPoint(634, 0.70359, 0.29641, 0.00000),
            new CIEHorseshoeDataPoint(635, 0.70447, 0.29553, 0.00000),
            new CIEHorseshoeDataPoint(636, 0.70533, 0.29467, 0.00000),
            new CIEHorseshoeDataPoint(637, 0.70618, 0.29382, 0.00000),
            new CIEHorseshoeDataPoint(638, 0.70702, 0.29298, 0.00000),
            new CIEHorseshoeDataPoint(639, 0.70786, 0.29214, 0.00000),
            new CIEHorseshoeDataPoint(640, 0.70871, 0.29129, 0.00000),
            new CIEHorseshoeDataPoint(641, 0.70957, 0.29043, 0.00000),
            new CIEHorseshoeDataPoint(642, 0.71042, 0.28958, 0.00000),
            new CIEHorseshoeDataPoint(643, 0.71122, 0.28878, 0.00000),
            new CIEHorseshoeDataPoint(644, 0.71195, 0.28805, 0.00000),
            new CIEHorseshoeDataPoint(645, 0.71259, 0.28741, 0.00000),
            new CIEHorseshoeDataPoint(646, 0.71312, 0.28688, 0.00000),
            new CIEHorseshoeDataPoint(647, 0.71356, 0.28644, 0.00000),
            new CIEHorseshoeDataPoint(648, 0.71395, 0.28605, 0.00000),
            new CIEHorseshoeDataPoint(649, 0.71431, 0.28569, 0.00000),
            new CIEHorseshoeDataPoint(650, 0.71465, 0.28535, 0.00000),
            new CIEHorseshoeDataPoint(651, 0.71501, 0.28499, 0.00000),
            new CIEHorseshoeDataPoint(652, 0.71537, 0.28463, 0.00000),
            new CIEHorseshoeDataPoint(653, 0.71574, 0.28426, 0.00000),
            new CIEHorseshoeDataPoint(654, 0.71611, 0.28389, 0.00000),
            new CIEHorseshoeDataPoint(655, 0.71648, 0.28352, 0.00000),
            new CIEHorseshoeDataPoint(656, 0.71685, 0.28315, 0.00000),
            new CIEHorseshoeDataPoint(657, 0.71721, 0.28279, 0.00000),
            new CIEHorseshoeDataPoint(658, 0.71756, 0.28244, 0.00000),
            new CIEHorseshoeDataPoint(659, 0.71791, 0.28209, 0.00000),
            new CIEHorseshoeDataPoint(660, 0.71824, 0.28176, 0.00000),
            new CIEHorseshoeDataPoint(661, 0.71857, 0.28143, 0.00000),
            new CIEHorseshoeDataPoint(662, 0.71887, 0.28113, 0.00000),
            new CIEHorseshoeDataPoint(663, 0.71916, 0.28084, 0.00000),
            new CIEHorseshoeDataPoint(664, 0.71943, 0.28057, 0.00000),
            new CIEHorseshoeDataPoint(665, 0.71967, 0.28033, 0.00000),
            new CIEHorseshoeDataPoint(666, 0.71988, 0.28012, 0.00000),
            new CIEHorseshoeDataPoint(667, 0.72007, 0.27993, 0.00000),
            new CIEHorseshoeDataPoint(668, 0.72024, 0.27976, 0.00000),
            new CIEHorseshoeDataPoint(669, 0.72039, 0.27961, 0.00000),
            new CIEHorseshoeDataPoint(670, 0.72054, 0.27946, 0.00000),
            new CIEHorseshoeDataPoint(671, 0.72067, 0.27933, 0.00000),
            new CIEHorseshoeDataPoint(672, 0.72080, 0.27920, 0.00000),
            new CIEHorseshoeDataPoint(673, 0.72093, 0.27907, 0.00000),
            new CIEHorseshoeDataPoint(674, 0.72104, 0.27896, 0.00000),
            new CIEHorseshoeDataPoint(675, 0.72115, 0.27885, 0.00000),
            new CIEHorseshoeDataPoint(676, 0.72125, 0.27875, 0.00000),
            new CIEHorseshoeDataPoint(677, 0.72134, 0.27866, 0.00000),
            new CIEHorseshoeDataPoint(678, 0.72143, 0.27857, 0.00000),
            new CIEHorseshoeDataPoint(679, 0.72151, 0.27849, 0.00000),
            new CIEHorseshoeDataPoint(680, 0.72158, 0.27842, 0.00000),
            new CIEHorseshoeDataPoint(681, 0.72165, 0.27835, 0.00000),
            new CIEHorseshoeDataPoint(682, 0.72171, 0.27829, 0.00000),
            new CIEHorseshoeDataPoint(683, 0.72177, 0.27823, 0.00000),
            new CIEHorseshoeDataPoint(684, 0.72183, 0.27817, 0.00000),
            new CIEHorseshoeDataPoint(685, 0.72187, 0.27813, 0.00000),
            new CIEHorseshoeDataPoint(686, 0.72192, 0.27808, 0.00000),
            new CIEHorseshoeDataPoint(687, 0.72195, 0.27805, 0.00000),
            new CIEHorseshoeDataPoint(688, 0.72199, 0.27801, 0.00000),
            new CIEHorseshoeDataPoint(689, 0.72202, 0.27798, 0.00000),
            new CIEHorseshoeDataPoint(690, 0.72205, 0.27795, 0.00000),
            new CIEHorseshoeDataPoint(691, 0.72208, 0.27792, 0.00000),
            new CIEHorseshoeDataPoint(692, 0.72211, 0.27789, 0.00000),
            new CIEHorseshoeDataPoint(693, 0.72213, 0.27787, 0.00000),
            new CIEHorseshoeDataPoint(694, 0.72215, 0.27785, 0.00000),
            new CIEHorseshoeDataPoint(695, 0.72217, 0.27783, 0.00000),
            new CIEHorseshoeDataPoint(696, 0.72218, 0.27782, 0.00000),
            new CIEHorseshoeDataPoint(697, 0.72218, 0.27782, 0.00000),
            new CIEHorseshoeDataPoint(698, 0.72219, 0.27781, 0.00000),
            new CIEHorseshoeDataPoint(699, 0.72219, 0.27781, 0.00000),
            new CIEHorseshoeDataPoint(700, 0.72219, 0.27781, 0.00000),
            new CIEHorseshoeDataPoint(701, 0.72219, 0.27781, 0.00000),
            new CIEHorseshoeDataPoint(702, 0.72219, 0.27781, 0.00000),
            new CIEHorseshoeDataPoint(703, 0.72219, 0.27781, 0.00000),
            new CIEHorseshoeDataPoint(704, 0.72219, 0.27781, 0.00000),
            new CIEHorseshoeDataPoint(705, 0.72219, 0.27781, 0.00000),
            new CIEHorseshoeDataPoint(706, 0.72218, 0.27782, 0.00000),
            new CIEHorseshoeDataPoint(707, 0.72217, 0.27783, 0.00000),
            new CIEHorseshoeDataPoint(708, 0.72216, 0.27784, 0.00000),
            new CIEHorseshoeDataPoint(709, 0.72215, 0.27785, 0.00000),
            new CIEHorseshoeDataPoint(710, 0.72213, 0.27787, 0.00000),
            new CIEHorseshoeDataPoint(711, 0.72210, 0.27790, 0.00000),
            new CIEHorseshoeDataPoint(712, 0.72207, 0.27793, 0.00000),
            new CIEHorseshoeDataPoint(713, 0.72204, 0.27796, 0.00000),
            new CIEHorseshoeDataPoint(714, 0.72201, 0.27799, 0.00000),
            new CIEHorseshoeDataPoint(715, 0.72198, 0.27802, 0.00000),
            new CIEHorseshoeDataPoint(716, 0.72195, 0.27805, 0.00000),
            new CIEHorseshoeDataPoint(717, 0.72192, 0.27808, 0.00000),
            new CIEHorseshoeDataPoint(718, 0.72189, 0.27811, 0.00000),
            new CIEHorseshoeDataPoint(719, 0.72185, 0.27815, 0.00000),
            new CIEHorseshoeDataPoint(720, 0.72182, 0.27818, 0.00000),
            new CIEHorseshoeDataPoint(721, 0.72179, 0.27821, 0.00000),
            new CIEHorseshoeDataPoint(722, 0.72175, 0.27825, 0.00000),
            new CIEHorseshoeDataPoint(723, 0.72171, 0.27829, 0.00000),
            new CIEHorseshoeDataPoint(724, 0.72167, 0.27833, 0.00000),
            new CIEHorseshoeDataPoint(725, 0.72163, 0.27837, 0.00000),
            new CIEHorseshoeDataPoint(726, 0.72159, 0.27841, 0.00000),
            new CIEHorseshoeDataPoint(727, 0.72155, 0.27845, 0.00000),
            new CIEHorseshoeDataPoint(728, 0.72151, 0.27849, 0.00000),
            new CIEHorseshoeDataPoint(729, 0.72147, 0.27853, 0.00000),
            new CIEHorseshoeDataPoint(730, 0.72142, 0.27858, 0.00000),
            new CIEHorseshoeDataPoint(731, 0.72138, 0.27862, 0.00000),
            new CIEHorseshoeDataPoint(732, 0.72134, 0.27866, 0.00000),
            new CIEHorseshoeDataPoint(733, 0.72130, 0.27870, 0.00000),
            new CIEHorseshoeDataPoint(734, 0.72125, 0.27875, 0.00000),
            new CIEHorseshoeDataPoint(735, 0.72120, 0.27880, 0.00000),
            new CIEHorseshoeDataPoint(736, 0.72115, 0.27885, 0.00000),
            new CIEHorseshoeDataPoint(737, 0.72109, 0.27891, 0.00000),
            new CIEHorseshoeDataPoint(738, 0.72104, 0.27896, 0.00000),
            new CIEHorseshoeDataPoint(739, 0.72097, 0.27903, 0.00000),
            new CIEHorseshoeDataPoint(740, 0.72091, 0.27909, 0.00000),
            new CIEHorseshoeDataPoint(741, 0.72084, 0.27916, 0.00000),
            new CIEHorseshoeDataPoint(742, 0.72078, 0.27922, 0.00000),
            new CIEHorseshoeDataPoint(743, 0.72071, 0.27929, 0.00000),
            new CIEHorseshoeDataPoint(744, 0.72064, 0.27936, 0.00000),
            new CIEHorseshoeDataPoint(745, 0.72057, 0.27943, 0.00000),
            new CIEHorseshoeDataPoint(746, 0.72050, 0.27950, 0.00000),
            new CIEHorseshoeDataPoint(747, 0.72043, 0.27957, 0.00000),
            new CIEHorseshoeDataPoint(748, 0.72036, 0.27964, 0.00000),
            new CIEHorseshoeDataPoint(749, 0.72029, 0.27971, 0.00000),
            new CIEHorseshoeDataPoint(750, 0.72022, 0.27978, 0.00000),
            new CIEHorseshoeDataPoint(751, 0.72015, 0.27985, 0.00000),
            new CIEHorseshoeDataPoint(752, 0.72009, 0.27991, 0.00000),
            new CIEHorseshoeDataPoint(753, 0.72002, 0.27998, 0.00000),
            new CIEHorseshoeDataPoint(754, 0.71995, 0.28005, 0.00000),
            new CIEHorseshoeDataPoint(755, 0.71988, 0.28012, 0.00000),
            new CIEHorseshoeDataPoint(756, 0.71980, 0.28020, 0.00000),
            new CIEHorseshoeDataPoint(757, 0.71973, 0.28027, 0.00000),
            new CIEHorseshoeDataPoint(758, 0.71965, 0.28035, 0.00000),
            new CIEHorseshoeDataPoint(759, 0.71958, 0.28042, 0.00000),
            new CIEHorseshoeDataPoint(760, 0.71950, 0.28050, 0.00000),
            new CIEHorseshoeDataPoint(761, 0.71943, 0.28057, 0.00000),
            new CIEHorseshoeDataPoint(762, 0.71935, 0.28065, 0.00000),
            new CIEHorseshoeDataPoint(763, 0.71928, 0.28072, 0.00000),
            new CIEHorseshoeDataPoint(764, 0.71921, 0.28079, 0.00000),
            new CIEHorseshoeDataPoint(765, 0.71915, 0.28085, 0.00000),
            new CIEHorseshoeDataPoint(766, 0.71908, 0.28092, 0.00000),
            new CIEHorseshoeDataPoint(767, 0.71901, 0.28099, 0.00000),
            new CIEHorseshoeDataPoint(768, 0.71894, 0.28106, 0.00000),
            new CIEHorseshoeDataPoint(769, 0.71888, 0.28112, 0.00000),
            new CIEHorseshoeDataPoint(770, 0.71881, 0.28119, 0.00000),
            new CIEHorseshoeDataPoint(771, 0.71874, 0.28126, 0.00000),
            new CIEHorseshoeDataPoint(772, 0.71867, 0.28133, 0.00000),
            new CIEHorseshoeDataPoint(773, 0.71860, 0.28140, 0.00000),
            new CIEHorseshoeDataPoint(774, 0.71852, 0.28148, 0.00000),
            new CIEHorseshoeDataPoint(775, 0.71845, 0.28155, 0.00000),
            new CIEHorseshoeDataPoint(776, 0.71838, 0.28162, 0.00000),
            new CIEHorseshoeDataPoint(777, 0.71830, 0.28170, 0.00000),
            new CIEHorseshoeDataPoint(778, 0.71822, 0.28178, 0.00000),
            new CIEHorseshoeDataPoint(779, 0.71814, 0.28186, 0.00000),
            new CIEHorseshoeDataPoint(780, 0.71807, 0.28193, 0.00000),
            new CIEHorseshoeDataPoint(781, 0.71799, 0.28201, 0.00000),
            new CIEHorseshoeDataPoint(782, 0.71791, 0.28209, 0.00000),
            new CIEHorseshoeDataPoint(783, 0.71783, 0.28217, 0.00000),
            new CIEHorseshoeDataPoint(784, 0.71775, 0.28225, 0.00000),
            new CIEHorseshoeDataPoint(785, 0.71766, 0.28234, 0.00000),
            new CIEHorseshoeDataPoint(786, 0.71758, 0.28242, 0.00000),
            new CIEHorseshoeDataPoint(787, 0.71750, 0.28250, 0.00000),
            new CIEHorseshoeDataPoint(788, 0.71742, 0.28258, 0.00000),
            new CIEHorseshoeDataPoint(789, 0.71733, 0.28267, 0.00000),
            new CIEHorseshoeDataPoint(790, 0.71725, 0.28275, 0.00000),
            new CIEHorseshoeDataPoint(791, 0.71716, 0.28284, 0.00000),
            new CIEHorseshoeDataPoint(792, 0.71708, 0.28292, 0.00000),
            new CIEHorseshoeDataPoint(793, 0.71699, 0.28301, 0.00000),
            new CIEHorseshoeDataPoint(794, 0.71690, 0.28310, 0.00000),
            new CIEHorseshoeDataPoint(795, 0.71681, 0.28319, 0.00000),
            new CIEHorseshoeDataPoint(796, 0.71671, 0.28329, 0.00000),
            new CIEHorseshoeDataPoint(797, 0.71661, 0.28339, 0.00000),
            new CIEHorseshoeDataPoint(798, 0.71651, 0.28349, 0.00000),
            new CIEHorseshoeDataPoint(799, 0.71641, 0.28359, 0.00000),
            new CIEHorseshoeDataPoint(800, 0.71630, 0.28370, 0.00000),
            new CIEHorseshoeDataPoint(801, 0.71619, 0.28381, 0.00000),
            new CIEHorseshoeDataPoint(802, 0.71609, 0.28391, 0.00000),
            new CIEHorseshoeDataPoint(803, 0.71598, 0.28402, 0.00000),
            new CIEHorseshoeDataPoint(804, 0.71588, 0.28412, 0.00000),
            new CIEHorseshoeDataPoint(805, 0.71577, 0.28423, 0.00000),
            new CIEHorseshoeDataPoint(806, 0.71566, 0.28434, 0.00000),
            new CIEHorseshoeDataPoint(807, 0.71556, 0.28444, 0.00000),
            new CIEHorseshoeDataPoint(808, 0.71545, 0.28455, 0.00000),
            new CIEHorseshoeDataPoint(809, 0.71534, 0.28466, 0.00000),
            new CIEHorseshoeDataPoint(810, 0.71523, 0.28477, 0.00000),
            new CIEHorseshoeDataPoint(811, 0.71513, 0.28487, 0.00000),
            new CIEHorseshoeDataPoint(812, 0.71502, 0.28498, 0.00000),
            new CIEHorseshoeDataPoint(813, 0.71491, 0.28509, 0.00000),
            new CIEHorseshoeDataPoint(814, 0.71480, 0.28520, 0.00000),
            new CIEHorseshoeDataPoint(815, 0.71469, 0.28531, 0.00000),
            new CIEHorseshoeDataPoint(816, 0.71459, 0.28541, 0.00000),
            new CIEHorseshoeDataPoint(817, 0.71449, 0.28551, 0.00000),
            new CIEHorseshoeDataPoint(818, 0.71438, 0.28562, 0.00000),
            new CIEHorseshoeDataPoint(819, 0.71428, 0.28572, 0.00000),
            new CIEHorseshoeDataPoint(820, 0.71418, 0.28582, 0.00000),
            new CIEHorseshoeDataPoint(821, 0.71409, 0.28591, 0.00000),
            new CIEHorseshoeDataPoint(822, 0.71400, 0.28600, 0.00000),
            new CIEHorseshoeDataPoint(823, 0.71391, 0.28609, 0.00000),
            new CIEHorseshoeDataPoint(824, 0.71382, 0.28618, 0.00000),
            new CIEHorseshoeDataPoint(825, 0.71373, 0.28627, 0.00000),
            new CIEHorseshoeDataPoint(826, 0.71365, 0.28635, 0.00000),
            new CIEHorseshoeDataPoint(827, 0.71358, 0.28642, 0.00000),
            new CIEHorseshoeDataPoint(828, 0.71350, 0.28650, 0.00000),
            new CIEHorseshoeDataPoint(829, 0.71343, 0.28657, 0.00000),
            new CIEHorseshoeDataPoint(830, 0.71336, 0.28664, 0.00000),
        ];
    }
}
const BUTTONA = 0;
const BUTTONB = 1;
const BUTTONX = 2;
const BUTTONY = 3;
const BUTTONLSHOULDER1 = 4;
const BUTTONRSHOULDER1 = 5;
const BUTTONLSHOULDER2 = 6;
const BUTTONRSHOULDER2 = 7;
const BUTTONSELECT = 8;
const BUTTONSTART = 9;
const BUTTONUP = 12;
const BUTTONDOWN = 13;
const BUTTONLEFT = 14;
const BUTTONRIGHT = 15;
class SimpleGamepad {
    constructor() {
        this._stick1 = new Vector2();
        this._stick2 = new Vector2();
        // _buttons is the four buttons on 
        this._buttons = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this._connected = false;
        this.reset();
    }
    set stick1x(x) { this._stick1.x = GTE.clamp(x, -1.0, 1.0); }
    set stick1y(x) { this._stick1.y = GTE.clamp(x, -1.0, 1.0); }
    set stick2x(x) { this._stick2.x = GTE.clamp(x, -1.0, 1.0); }
    set stick2y(x) { this._stick2.y = GTE.clamp(x, -1.0, 1.0); }
    get stick1() { return this._stick1; }
    get stick2() { return this._stick2; }
    get stick1dir() { return this._stick1.norm(); }
    get stick2dir() { return this._stick2.norm(); }
    get button1() { return this._buttons[0] > 0.25; }
    get button2() { return this._buttons[1] > 0.25; }
    get button3() { return this._buttons[2] > 0.25; }
    get button4() { return this._buttons[3] > 0.25; }
    get lshoulder1() { return this._buttons[4] > 0.25; }
    get rshoulder1() { return this._buttons[5] > 0.25; }
    get lshoulder2() { return this._buttons[6] > 0.25; }
    get rshoulder2() { return this._buttons[7] > 0.25; }
    get back() { return this._buttons[8] > 0.25; }
    get forward() { return this._buttons[9] > 0.25; }
    get select() { return this._buttons[8] > 0.25; }
    get start() { return this._buttons[9] > 0.25; }
    get up() { return this._buttons[12] > 0.25; }
    get down() { return this._buttons[13] > 0.25; }
    get left() { return this._buttons[14] > 0.25; }
    get right() { return this._buttons[15] > 0.25; }
    // W/S        move forward/backward
    // A/D        move left/right
    // Q/E        bank left/right
    // Z/C        move up/down
    // UP/DOWN    turn up/down
    // LEFT/RIGHT turn left/right
    // R          ACTION 1
    // F          ACTION 2
    // SHIFT      SPEED SLOW/FAST
    // SPACEBAR   
    // 
    get w() { return this._buttons[12] > 0.25; }
    get s() { return this._buttons[13] > 0.25; }
    get a() { return this._buttons[14] > 0.25; }
    get d() { return this._buttons[15] > 0.25; }
    get c() { return this._buttons[0] > 0.25; }
    get q() { return this._buttons[1] > 0.25; }
    get e() { return this._buttons[2] > 0.25; }
    get z() { return this._buttons[3] > 0.25; }
    get r() { return this._buttons[4] > 0.25; }
    get f() { return this._buttons[5] > 0.25; }
    get upjoy() { return this.w || this._stick1.y > 0.25; }
    get downjoy() { return this.s || this._stick1.y < -0.25; }
    get leftjoy() { return this.a || this._stick1.x < -0.25; }
    get rightjoy() { return this.d || this._stick1.x > 0.25; }
    get wjoy() { return this.w || this._stick1.y > 0.25; }
    get sjoy() { return this.s || this._stick1.y < -0.25; }
    get ajoy() { return this.a || this._stick1.x < -0.25; }
    get djoy() { return this.d || this._stick1.x > 0.25; }
    get logo() { return this._buttons[16] > 0.25; }
    update(gp) {
        this._stick1.x = gp.axes[0];
        this._stick1.y = gp.axes[1];
        this._stick2.x = gp.axes[2];
        this._stick2.y = gp.axes[3];
        for (let i = 0; i <= 16 && i < gp.buttons.length; i++) {
            this._buttons[i] = gp.buttons[i].value;
        }
        this._stick1.x += this.a ? -1.0 : 0.0;
        this._stick1.x += this.d ? 1.0 : 0.0;
        this._stick1.y += this.w ? -1.0 : 1.0;
        this._stick1.y += this.s ? 1.0 : 1.0;
        this._connected = true;
    }
    setButton(which, state) {
        if (which < 0 || which > 16)
            return;
        return this._buttons[which] = state;
    }
    getAxis(which) {
        switch (which) {
            case 0:
                return this._stick1.x;
            case 1:
                return this._stick1.y;
            case 2:
                return this._stick2.x;
            case 3:
                return this._stick2.y;
        }
        return 0.0;
    }
    getButton(which) {
        if (which < 0 || which > 16)
            return false;
        return this._buttons[which] > 0.25;
    }
    getAxisClear(which) {
        let retval = 0;
        switch (which) {
            case 0:
                retval = this._stick1.x;
                this._stick1.x = 0;
                break;
            case 1:
                retval = this._stick1.y;
                this._stick1.y = 0;
                break;
            case 2:
                retval = this._stick2.x;
                this._stick2.x = 0;
                break;
            case 3:
                retval = this._stick2.y;
                this._stick2.y = 0;
                break;
        }
        return retval;
    }
    getButtonClear(which) {
        if (which < 0 || which > 16)
            return false;
        let state = this._buttons[which] > 0.25;
        this._buttons[which] = 0;
        return state;
    }
    reset() {
        this._connected = false;
        this._stick1.reset(0, 0);
        this._stick2.reset(0, 0);
        for (let i = 0; i <= 16; i++) {
            this._buttons[i] = 0.0;
        }
    }
}
class KeyboardGamepadControl {
    constructor() {
        this.gamepads = [
            new SimpleGamepad(),
            new SimpleGamepad(),
            new SimpleGamepad(),
            new SimpleGamepad(),
            new SimpleGamepad()
        ];
        this.keys = new Map();
        let self = this;
        window.addEventListener("keydown", (e) => { self.onkeydown(e); });
        window.addEventListener("keyup", (e) => { self.onkeyup(e); });
    }
    update(dtInSeconds) {
        let gamepads = navigator.getGamepads();
        if (!gamepads) {
            gamepads = [null, null, null, null];
        }
        else
            while (gamepads.length < 4) {
                gamepads.push(null);
            }
        for (let i = 1; i <= 4; i++) {
            let g = gamepads[i - 1];
            if (!g) {
                this.gamepads[i].reset();
            }
            else {
                this.gamepads[i].update(g);
            }
        }
        // update the keyboard
        let kb = this.gamepads[0];
        let stick1x = 0.0;
        let stick1y = 0.0;
        let stick2x = 0.0;
        let stick2y = 0.0;
        let cancelButton = 0.0;
        let okButton = 0.0;
        let fireButton = 0.0;
        let missileButton = 0.0;
        let equipButton = 0.0;
        let menuButton = 0.0;
        let speed = 1.0;
        let lshoulder = 0.0;
        let rshoulder = 0.0;
        let dpadLeft = 0.0;
        let dpadRight = 0.0;
        let dpadUp = 0.0;
        let dpadDown = 0.0;
        if (this.keys.get("Left") || this.keys.get("LeftArrow"))
            stick1x -= 1.0;
        if (this.keys.get("Right") || this.keys.get("RightArrow"))
            stick1x += 1.0;
        if (this.keys.get("Up") || this.keys.get("UpArrow"))
            stick1y += 1.0;
        if (this.keys.get("Down") || this.keys.get("DownArrow"))
            stick1y -= 1.0;
        if (this.keys.get("a") || this.keys.get("A"))
            stick2x -= 1.0;
        if (this.keys.get("d") || this.keys.get("D"))
            stick2x += 1.0;
        if (this.keys.get("w") || this.keys.get("W"))
            stick2y += 1.0;
        if (this.keys.get("s") || this.keys.get("S"))
            stick2y -= 1.0;
        if (this.keys.get("i") || this.keys.get("I"))
            dpadUp = 1.0;
        if (this.keys.get("k") || this.keys.get("K"))
            dpadDown = 1.0;
        if (this.keys.get("j") || this.keys.get("J"))
            dpadLeft = 1.0;
        if (this.keys.get("l") || this.keys.get("L"))
            dpadRight = 1.0;
        if (this.keys.get("Esc") || this.keys.get("Escape"))
            cancelButton = 1.0;
        if (this.keys.get("Return") || this.keys.get("Enter"))
            okButton = 1.0;
        if (this.keys.get("Space") || this.keys.get(" "))
            missileButton = 1.0;
        if (this.keys.get("Shift"))
            speed = 2.0;
        if (this.keys.get("e") || this.keys.get("E"))
            equipButton = 1.0;
        if (this.keys.get("r") || this.keys.get("R"))
            menuButton = 1.0;
        kb.stick1x = stick1x;
        kb.stick1y = stick1y;
        kb.stick2x = stick2x;
        kb.stick2y = stick2y;
        kb.setButton(BUTTONA, okButton);
        kb.setButton(BUTTONB, cancelButton);
        kb.setButton(BUTTONX, equipButton);
        kb.setButton(BUTTONY, menuButton);
        kb.setButton(BUTTONLSHOULDER1, lshoulder);
        kb.setButton(BUTTONRSHOULDER1, rshoulder);
        kb.setButton(BUTTONSELECT, okButton);
        kb.setButton(BUTTONSTART, cancelButton);
        kb.setButton(BUTTONLEFT, dpadLeft);
        kb.setButton(BUTTONRIGHT, dpadRight);
        kb.setButton(BUTTONUP, dpadUp);
        kb.setButton(BUTTONDOWN, dpadDown);
    }
    getGamepad(which) {
        if (which < 0 || which >= this.gamepads.length)
            return null;
        return this.gamepads[which];
    }
    getKeyboard() {
        return this.gamepads[0];
    }
    static MapButtonToAxis(negativeButton, positiveButton, magnitude) {
        let x = 0.0;
        if (negativeButton)
            x -= magnitude;
        if (positiveButton)
            x += magnitude;
        return x;
    }
    classifyKey(key) {
        let button = -1;
        switch (key) {
            case "Left":
            case "ArrowLeft":
            case "a":
            case "A":
                button = 14;
                break;
            case "Right":
            case "ArrowRight":
            case "d":
            case "D":
                button = 15;
                break;
            case "Up":
            case "ArrowUp":
            case "w":
            case "W":
                button = 12;
                break;
            case "Down":
            case "ArrowDown":
            case "s":
            case "S":
                button = 13;
                break;
            case "Esc":
            case "Escape":
                button = 8;
                break;
            case "Return":
            case "Enter":
                button = 9;
                break;
            case "Space":
            case " ":
                button = 0;
                break;
            case "Shift":
            case "LeftShift":
                button = 2;
                break;
            case "e":
            case "E":
                button = 1;
                break;
            case "r":
            case "R":
                button = 3;
                break;
        }
        return button;
    }
    onkeydown(e) {
        let button = this.classifyKey(e.key);
        if (button >= 0) {
            e.preventDefault();
            this.gamepads[0].setButton(button, 1.0);
            this.keys.set(e.key, true);
        }
    }
    onkeyup(e) {
        let button = this.classifyKey(e.key);
        if (button >= 0) {
            e.preventDefault();
            this.gamepads[0].setButton(button, 0.0);
            this.keys.set(e.key, false);
        }
    }
}
class MouseClickState {
    constructor(x, y) {
        this.state = false;
        this.x = 0;
        this.y = 0;
        this.dx = 0;
        this.dy = 0;
        this.downx = 0;
        this.downy = 0;
        this.dragx = 0;
        this.dragy = 0;
        this.x = x;
        this.y = y;
    }
    move(x, y) {
        this.dx = x - this.x;
        this.dy = y - this.y;
        this.x = x;
        this.y = y;
        if (this.state) {
            this.dragx = x - this.downx;
            this.dragy = y - this.downy;
        }
    }
    down(x, y) {
        this.downx = x;
        this.downy = y;
        this.state = true;
    }
    up(x, y) {
        this.state = false;
    }
}
class MouseOrbitControl {
    constructor() {
        this._transform = Matrix4.makeIdentity();
        this._eulerAngles = Vector3.make(0, 0, 0);
        this._dt = 0.0;
        this.speed = 1.0;
        this._mouseIsOver = false;
        this._buttons = new Map();
    }
    reset() {
        this._transform.LoadIdentity();
        this._eulerAngles.reset(0, 0, 0);
    }
    update(deltaTimeInSeconds) {
        this._dt = Math.min(0.16667, deltaTimeInSeconds);
    }
    attachToElement(element) {
        let self = this;
        element.addEventListener("mousedown", (e) => {
            self.onmousedown(e);
        });
        element.addEventListener("mouseup", (e) => {
            self.onmouseup(e);
        });
        element.addEventListener("mouseout", (e) => {
            self.onmouseout(e);
        });
        element.addEventListener("mouseover", (e) => {
            self.onmouseover(e);
        });
        element.addEventListener("mousemove", (e) => {
            self.onmousemove(e);
        });
        element.addEventListener("mousewheel", (e) => {
            self.onmousewheel(e);
        });
    }
    get transform() {
        return this._transform;
    }
    get euler() {
        return this._eulerAngles;
    }
    onmouseover(e) {
        this._mouseIsOver = true;
        if (this._mouseIsOver) {
            e.stopImmediatePropagation();
            e.preventDefault();
        }
    }
    onmouseout(e) {
        this._mouseIsOver = false;
        for (let button of this._buttons.values()) {
            button.up(e.x, e.y);
        }
    }
    onmousedown(e) {
        if (this._mouseIsOver) {
            e.stopImmediatePropagation();
            e.preventDefault();
        }
        if (!this._buttons.has(e.button)) {
            this._buttons.set(e.button, new MouseClickState(e.x, e.y));
        }
        let mcs = this._buttons.get(e.button);
        if (mcs) {
            mcs.down(e.x, e.y);
        }
    }
    onmouseup(e) {
        if (this._mouseIsOver) {
            e.stopImmediatePropagation();
            e.preventDefault();
        }
        if (!this._buttons.has(e.button)) {
            this._buttons.set(e.button, new MouseClickState(e.x, e.y));
        }
        let mcs = this._buttons.get(e.button);
        if (mcs) {
            mcs.up(e.x, e.y);
        }
    }
    onmousemove(e) {
        if (this._mouseIsOver) {
            e.stopImmediatePropagation();
            e.preventDefault();
        }
        for (let button of this._buttons.values()) {
            button.move(e.x, e.y);
        }
        let mcs0 = this._buttons.get(0);
        if (mcs0 && mcs0.state) {
            this._transform.Rotate(10.0 * this.speed * this._dt * mcs0.dx, 0.0, 1.0, 0.0);
            this._transform.Rotate(90.0 * this.speed * this._dt * mcs0.dy, 1.0, 0.0, 0.0);
            //this._transform.Translate(0.0, 0.0, -this.speed * this._dt * mcs0.dy);
            this._eulerAngles.x += this._dt * mcs0.dx;
            this._eulerAngles.y += this._dt * mcs0.dy;
        }
        let msc1 = this._buttons.get(1);
        if (msc1 && msc1.state) {
            this._transform.Translate(0.0, 0.0, -this.speed * this._dt * msc1.dy);
        }
        let mcs2 = this._buttons.get(2);
        if (mcs2 && mcs2.state) {
            this._transform.Translate(this.speed * this._dt * mcs2.dx, -this.speed * this._dt * mcs2.dy, 0.0);
        }
    }
    onmousewheel(e) {
        this._transform.Translate(0.0, 0.0, this.speed * this._dt * e.wheelDelta);
        if (this._mouseIsOver) {
            e.stopImmediatePropagation();
            e.preventDefault();
        }
    }
}
class SimpleHarmonicMotion {
    constructor(k, p, x, m = 1.53) {
        this.k = k;
        this.p = p;
        this.x = x;
        this.m = m;
        this.t0 = 0;
        this.t1 = 0;
        this.dt = 0;
        this.v = 0;
        this.E = 0;
        //this.E = x * m * 9.8;
        this.reset(x);
    }
    reset(x) {
        this.x = 0;
        this.v = 0;
        // mg = 1/2 kx
        // x = 2mg/k
        this.E = (2 * this.m * 9.8) / this.k * this.m * 9.8;
    }
    get maxTravel() { return this.E / (this.m * 9.8); }
    update(tInSeconds) {
        if (this.t0 == 0)
            this.t0 = tInSeconds;
        this.t0 = this.t1;
        this.t1 = tInSeconds;
        let dt = this.dt = this.t1 - this.t0;
        let F = -this.k * this.x - 9.8 * this.m;
        let a = F / this.m;
        let vnew = a * dt + this.v;
        let xnew = this.x + vnew * dt;
        let K1 = 0.5 * this.m * Math.pow(this.v, 2);
        let U1 = this.x * this.m * 9.8;
        let K2 = 0.5 * this.m * Math.pow(vnew, 2);
        let U2 = xnew * this.m * 9.8;
        xnew = GTE.clamp(xnew, -2 * 9.8 * this.m / this.k, 2 * 9.8 * this.m / this.k);
        this.v = vnew;
        this.x = xnew;
        // limit energy to starting location and displacement of the spring
    }
    getTransform() {
        return Matrix4.makeTranslation(this.p.x, this.p.y + this.x * 0.05, this.p.z);
    }
}
var GTE;
(function (GTE) {
    function rev(angleInDegrees) {
        return angleInDegrees - Math.floor(angleInDegrees / 360.0) * 360.0;
    }
    GTE.rev = rev;
    function wrap(x, b) {
        let xp = x - Math.floor(x / b) * b;
        if (xp < 0)
            return xp + b;
        return xp;
    }
    GTE.wrap = wrap;
    GTE.toDegrees = 180.0 / Math.PI;
    GTE.toRadians = Math.PI / 180.0;
})(GTE || (GTE = {}));
class SunMotion {
    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.obliquityOfEcliptic = 23.439167;
        this.transformMatrix = Matrix4.makeIdentity();
        this._dirto = Vector3.make(0.0, 1.0, 0.0);
        this.lambda = 0;
        this.r = 0;
        this.trueAnomaly = 0;
        this.tDays = 0;
        this.tCenturies = 0;
        this.siderealTime = 0;
        this.GMST0 = 0;
        this.trueLongitude = 0;
        this.longitudeOfPerihelion = 0;
        this.meanAnomaly = 0;
        this.RA = 0;
        this.HA = 0;
        this.Decl = 0;
        this.LST = 0;
        this.GST = 0;
        this.azimuth = 0;
        this.altitude = 0;
        this.eclipticV = new Vector3();
    }
    update(t) {
        //let JD = 
        const toDegrees = 180.0 / Math.PI;
        const toRadians = Math.PI / 180.0;
        let d = t / 86400.0; // (days since J2000.0)
        this.tDays = d;
        this.tCenturies = AstroCalc.makeCenturiesFromJ2000(d);
        let w = GTE.rev(282.9404 + 4.70935E-5 * this.tDays); // (longitude of perihelion)
        let a = AstroCalcNOAA.calcSunRadVector(this.tCenturies); // (mean distance, a.u.)
        let e = AstroCalcNOAA.calcEccentricityEarthOrbit(this.tCenturies);
        let M = AstroCalcNOAA.calcGeomMeanAnomalySun(this.tCenturies); //GTE.rev(356.0470 + 0.9856002585 * d); // (mean anomaly)
        let oblecl = AstroCalcNOAA.calcMeanObliquityOfEcliptic(this.tCenturies); // GTE.rev(23.4393 - 3.563E-7 * d); // (obliquity of the ecliptic)
        let L = GTE.rev(w + M);
        let E = M + (180 / Math.PI) * e * Math.sin(M * toRadians) * (1 + e * Math.cos(M * toRadians));
        let x = Math.cos(E * toRadians) - e;
        let y = Math.sin(E * toRadians) * Math.sqrt(1 - e * e);
        let r = this.r = Math.sqrt(x * x + y * y); // distance
        let v = this.trueAnomaly = GTE.rev(Math.atan2(y, x) * toDegrees); // true anomaly
        let lon = this.trueLongitude = GTE.rev(w + v);
        this.lambda = lon;
        this.meanAnomaly = M;
        this.longitudeOfPerihelion = w;
        this.obliquityOfEcliptic = oblecl;
        this.GST = AstroCalc.makeGSTfromJ2000(d);
        this.LST = AstroCalc.makeLSTfromJD(d, this.longitude);
        this.GMST0 = GTE.wrap(L / 15 + 12, 24.0); // hours
        this.siderealTime = this.GMST0 + 24 * (d - Math.floor(d)) + this.longitude / 15;
        let sunecl_x = r * Math.cos(this.trueLongitude * toRadians);
        let sunecl_y = r * Math.sin(this.trueLongitude * toRadians);
        let sunecl_z = 0;
        let sunecl = Vector3.make(r * Math.cos(this.trueLongitude * toRadians), r * Math.sin(this.trueLongitude * toRadians), 0);
        let suneq = AstroCalc.makeEquatorialfromEcliptic(sunecl, oblecl);
        this.r = suneq.length();
        this.RA = AstroCalc.makeRAfromEquatorial(suneq);
        this.Decl = AstroCalc.makeDeclfromEquatorial(suneq);
        this.HA = GTE.rev(this.LST * 15 - this.RA);
        let vHADecl = Vector3.make(Math.cos(this.HA * toRadians) * Math.cos(this.Decl * toRadians), Math.sin(this.HA * toRadians) * Math.cos(this.Decl * toRadians), Math.sin(this.Decl * toRadians));
        let vHor = Vector3.make(vHADecl.x * Math.cos((90.0 - this.latitude) * toRadians) - vHADecl.z * Math.sin((90.0 - this.latitude) * toRadians), vHADecl.y, vHADecl.x * Math.sin((90.0 - this.latitude) * toRadians) + vHADecl.z * Math.cos((90.0 - this.latitude) * toRadians));
        this.azimuth = Math.atan2(vHor.y, vHor.x) * toDegrees + 180.0;
        this.altitude = Math.asin(vHor.z) * toDegrees;
        this._dirto = AstroCalc.makeRHfromEcliptic(sunecl, this.LST, oblecl, this.latitude, this.longitude);
        return this._dirto;
    }
    get dirTo() { return this._dirto.norm(); }
}
class MoonMotion {
    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.obliquityOfEcliptic = 23.439167;
        this.transformMatrix = Matrix4.makeIdentity();
        this._dirto = Vector3.make(0.0, 1.0, 0.0);
        this.moonAge = 0;
        this.moonPhase = 0;
        this.moonE0 = new Vector3();
    }
    update(t) {
        //let JD = 
        const toDegrees = 180.0 / Math.PI;
        const toRadians = Math.PI / 180.0;
        let d = t / 86400.0; //JD - 2451545.0;
        let N = toRadians * GTE.rev(125.1228 - 0.0529538083 * d); // (Long asc. node)
        let i = toRadians * 5.1454; // (Inclination)
        let w = toRadians * GTE.rev(318.0634 + 0.1643573223 * d); // (Arg. of perigee)
        let a = 60.2666; // (Mean distance)
        let e = 0.054900; // (Eccentricity)
        let M = GTE.rev(115.3654 + 13.0649929509 * d); // (Mean anomaly)
        let E = AstroCalc.kepler(M, e);
        let x = a * (Math.cos(toRadians * E) - e);
        let y = a * Math.sqrt(1 - e * e) * Math.sin(toRadians * E);
        let r = Math.sqrt(x * x + y * y);
        let v = Math.atan2(y, x);
        let v_ecliptic = Vector3.make(r * (Math.cos(N) * Math.cos(v + w) - Math.sin(N) * Math.sin(v + w) * Math.cos(i)), r * (Math.sin(N) * Math.cos(v + w) + Math.cos(N) * Math.sin(v + w) * Math.cos(i)), r * Math.sin(v + w) * Math.sin(i));
        let LST = AstroCalc.makeLSTfromJD(d, this.longitude);
        let oblecl = AstroCalc.getMeanObliquityOfEcliptic(d);
        this._dirto = AstroCalc.makeRHfromEcliptic(v_ecliptic, LST, oblecl, this.latitude, this.longitude);
        let j = AstroCalc.J2000 + d;
        //Calculate the approximate phase of the moon
        let ip = (j + 4.867) / 29.53059;
        ip = ip - Math.floor(ip);
        //After several trials I've seen to add the following lines, 
        //which gave the result was not bad 
        let ag = 0;
        if (ip < 0.5)
            ag = ip * 29.53059 + 29.53059 / 2;
        else
            ag = ip * 29.53059 - 29.53059 / 2;
        // Moon's age in days
        ag = Math.floor(ag) + 1;
        this.moonPhase = ip;
        this.moonAge = ag;
        this.moonE0 = Vector3.make(0.2 * ip, 0.2 * ip, ip);
        // let m: Matrix3 = Matrix3.makeIdentity();
        // let cosphi = Math.cos(this.latitude * toRadians);
        // let sinphi = Math.sin(this.latitude * toRadians);
        // let cose = Math.cos(e * toRadians);
        // let sine = Math.sin(e * toRadians);
        // let coso = Math.cos(this.longitude * toRadians);
        // let sino = Math.sin(this.longitude * toRadians);
        // m.LoadIdentity();
        // m.LoadRowMajor(
        //     -sinphi * coso, sine * cosphi - cose * sinphi * sino, sine * sinphi * sino + cose * cosphi,
        //     -cosphi * coso, -cose * cosphi * sino - sine * sinphi, sine * cosphi * sino - cose * sinphi,
        //     -sino, cose * coso, -sine * coso
        // );
        // this.transformMatrix = m.toMatrix4();
        // this._dirto = m.transform(v_ecliptic);
    }
    get dirTo() { return this._dirto.norm(); }
}
var GTE;
(function (GTE) {
    class WaveletNoiseCalculator {
        constructor(noiseTileSize = 128) {
            this.noiseTileSize = noiseTileSize;
            this.initialized = false;
            this.noiseTileData = new Float32Array(noiseTileSize * noiseTileSize * noiseTileSize);
            this.GenerateNoiseTile(noiseTileSize);
        }
        Mod(x, n) {
            let m = x % n;
            return m < 0 ? m + n : m;
        }
        Downsample(from, to, n, stride) {
            const ARAD = 16;
            let coefs = new Float32Array([
                0.000334, -0.001528, 0.000410, 0.003545, -0.000938, -0.008233, 0.002172, 0.019120,
                -0.005040, -0.044412, 0.011655, 0.103311, -0.025936, -0.243780, 0.033979, 0.655340,
                0.655340, 0.033979, -0.243780, -0.025936, 0.103311, 0.011655, -0.044412, -0.005040,
                0.019120, 0.002172, -0.008233, -0.000938, 0.003546, 0.000410, -0.001528, 0.000334,
                0
            ]);
            let a = coefs.subarray(ARAD);
            for (let i = 0; i < ((n / 2) | 0); i++) {
                to[i * stride] = 0;
                for (let k = 2 * i - ARAD; k <= 2 * i + ARAD; k++) {
                    let _a = coefs[ARAD + k - 2 * i];
                    to[i * stride] += _a * from[this.Mod(k, n) * stride];
                    if (!isFinite(to[i * stride])) {
                        console.error("non finite number produced");
                    }
                }
            }
        }
        Upsample(from, to, n, stride) {
            const ARAD = 16;
            let pCoefs = new Float32Array([0.25, 0.75, 0.75, 0.25]);
            let p = pCoefs.subarray(2);
            for (let i = 0; i < n; i++) {
                to[i * stride] = 0;
                let k1 = (i / 2) | 0;
                let k2 = k1 + 1;
                for (let k = k1; k <= k2; k++) {
                    let _p = pCoefs[2 + i - 2 * k];
                    to[i * stride] += _p * from[this.Mod(k, n / 2) * stride];
                    if (!isFinite(to[i * stride])) {
                        console.error("non finite number produced");
                    }
                }
            }
        }
        GenerateNoiseTile(n) {
            if (n % 2) {
                n++;
            }
            let ix = 0;
            let iy = 0;
            let iz = 0;
            let sz = n * n * n * 4;
            let temp1 = new Float32Array(n * n * n);
            let temp2 = new Float32Array(n * n * n);
            let noise = new Float32Array(n * n * n);
            for (let i = 0; i < n * n * n; i++) {
                // Wavelet noise paper says "GaussianNoise"
                noise[i] = Math.random() * 2 - 1;
            }
            // Downsample and upsample
            for (iy = 0; iy < n; iy++) {
                for (iz = 0; iz < n; iz++) {
                    let i = iy * n + iz * n * n;
                    this.Downsample(noise.subarray(i), temp1.subarray(i), n, 1);
                    this.Upsample(temp1.subarray(i), temp2.subarray(i), n, 1);
                }
            }
            for (ix = 0; ix < n; ix++) {
                for (iz = 0; iz < n; iz++) {
                    let i = ix + iz * n * n;
                    this.Downsample(temp2.subarray(i), temp1.subarray(i), n, n);
                    this.Upsample(temp1.subarray(i), temp2.subarray(i), n, n);
                }
            }
            for (ix = 0; ix < n; ix++) {
                for (iy = 0; iy < n; iy++) {
                    let i = ix + iy * n;
                    this.Downsample(temp2.subarray(i), temp1.subarray(i), n, n * n);
                    this.Upsample(temp1.subarray(i), temp2.subarray(i), n, n * n);
                }
            }
            for (let i = 0; i < n * n * n; i++) {
                noise[i] -= temp2[i];
            }
            let offset = n / 2;
            if (offset % 2) {
                offset++;
            }
            for (let i = 0, ix = 0; ix < n; ix++) {
                for (iy = 0; iy < n; iy++) {
                    for (iz = 0; iz < n; iz++) {
                        temp1[i++] = noise[this.Mod(ix + offset, n) + this.Mod(iy + offset, n) * n + this.Mod(iz + offset, n) * n * n];
                    }
                }
            }
            for (let i = 0; i < n * n * n; i++) {
                noise[i] += temp1[i];
            }
            this.noiseTileData = noise;
            this.initialized = true;
        }
        WaveletNoise(x, y, z, octave = 128) {
            let p = [octave * x, octave * y, octave * z];
            let i = 0;
            let f = [0, 0, 0];
            let c = [0, 0, 0];
            let n = this.noiseTileSize;
            let mid = [0, 0, 0];
            let w = [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ];
            let t = 0;
            let result = 0;
            // B-spline quadratic basis function
            for (i = 0; i < 3; i++) {
                mid[i] = Math.ceil(p[i] - 0.5);
                t = mid[i] - (p[i] - 0.5);
                w[i][0] = t * t / 2;
                w[i][2] = (1 - t) * (1 - t) / 2;
                w[i][1] = 1 - w[i][0] - w[i][2];
            }
            for (f[2] = -1; f[2] <= 1; f[2]++) {
                for (f[1] = -1; f[1] <= 1; f[1]++) {
                    for (f[0] = -1; f[0] <= 1; f[0]++) {
                        let weight = 1;
                        for (i = 0; i < 3; i++) {
                            c[i] = this.Mod(mid[i] + f[i], n);
                            weight *= w[i][f[i] + 1];
                            result += weight * this.noiseTileData[c[2] * n * n + c[1] * n + c[0]];
                        }
                    }
                }
            }
            return result;
        }
    }
    GTE.WaveletNoiseCalculator = WaveletNoiseCalculator;
    GTE.WaveletNoise = new WaveletNoiseCalculator(64);
})(GTE || (GTE = {}));
function getIndex(i, j) {
    return 9 * i + j;
}
class HackathonApp {
    constructor(width = 512, height = 384) {
        this.width = width;
        this.height = height;
        this.t0 = 0;
        this.t1 = 0;
        this.dt = 0;
        this.uiUpdateTime = 0;
        this.skipBehind = true;
        this.shaderProgram = null;
        this.aVertexLocation = 0;
        this.aTexCoordLocation = 0;
        this.aColorLocation = 0;
        this.aNormalLocation = 0;
        this.uModelViewMatrixLocation = null;
        this.uProjectionMatrixLocation = null;
        this.uTextureMatrix = null;
        this.uTextureMapLocation = null;
        this.uRenderMode = null;
        this.uColor = null;
        this.uWorldMatrixLocation = null;
        this.surfaces = new MyShape();
        this.subfaces = new Array(54);
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
    run() {
        this.init();
        this.mainloop(0);
    }
    init() {
        this.loadShaders();
        this.loadScenegraph();
    }
    loadShaders() {
        let gl = this.renderingContext.gl;
        const vsSource = `#version 100
        #extension GL_OES_standard_derivatives: enable
        // ABOVE IS NEW FOR LECTURE 12

        attribute vec4 aVertexPosition;
        attribute vec4 aTexCoord;
        attribute vec4 aColor;

        // NEW FOR LECTURE 12
        attribute vec3 aNormal;
        // ABOVE IS NEW FOR LECTURE 12

        varying vec2 vTexCoord;
        varying vec4 vColor;

        // NEW FOR LECTURE 12
        varying vec3 vNormal;
        varying vec3 vPosition;
        // ABOVE IS NEW FOR LECTURE 12

        uniform mat4 uModelViewMatrix;
        uniform mat4 uProjectionMatrix;
        uniform mat4 uTextureMatrix;
        uniform mat4 uWorldMatrix;

        void main() {
            vec4 worldPosition = uWorldMatrix * aVertexPosition;
            vNormal = mat3(uModelViewMatrix) * aNormal;
            vPosition = (uModelViewMatrix * aVertexPosition).xyz;
            // ABOVE IS NEW FOR LECTURE 12

            // multiply our 2 component vector with a 4x4 matrix and return resulting x, y
            vec2 temp = (uTextureMatrix * aTexCoord).xy;
            vTexCoord = vec2(aTexCoord.x, aTexCoord.y);
            vColor = aColor;            
            gl_Position = uProjectionMatrix * uModelViewMatrix * worldPosition;
            gl_PointSize = 3.0;
        }
        `;
        const vertexShader = this.loadShader(gl.VERTEX_SHADER, vsSource);
        const fsSource = `#version 100
        #extension GL_OES_standard_derivatives: enable
        // ABOVE IS NEW FOR LECTURE 12

        precision mediump float;
        uniform sampler2D uTextureMap;
        uniform int uRenderMode;
        uniform vec3 uColor;

        varying vec2 vTexCoord;
        varying vec4 vColor;

        // NEW FOR LECTURE 12
        varying vec3 vNormal;
        varying vec3 vPosition;
        // ABOVE IS NEW FOR LECTURE 12

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
            this.aTexCoordLocation = gl.getAttribLocation(shaderProgram, 'aTexCoord');
            this.aColorLocation = gl.getAttribLocation(shaderProgram, 'aColor');
            this.aNormalLocation = gl.getAttribLocation(shaderProgram, 'aNormalLocation');
            this.uModelViewMatrixLocation = gl.getUniformLocation(shaderProgram, 'uModelViewMatrix');
            this.uProjectionMatrixLocation = gl.getUniformLocation(shaderProgram, 'uProjectionMatrix');
            this.uTextureMatrix = gl.getUniformLocation(shaderProgram, 'uTextureMatrix');
            this.uTextureMapLocation = gl.getUniformLocation(shaderProgram, "uTextureMap");
            this.uRenderMode = gl.getUniformLocation(shaderProgram, "uRenderMode");
            this.uColor = gl.getUniformLocation(shaderProgram, "uColor");
            this.uWorldMatrixLocation = gl.getUniformLocation(shaderProgram, "uWorldMatrix");
        }
    }
    loadShader(type, source) {
        let gl = this.renderingContext.gl;
        const shader = gl.createShader(type);
        if (!shader)
            return null;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            hflog.error("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }
    resetRubriksCube() {
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
    loadScenegraph() {
        this.resetRubriksCube();
        let gl = this.renderingContext.gl;
        this.surfaces.newSurface(gl.TRIANGLE_FAN);
        this.surfaces.vertex(-0.5, -0.5, 0.0);
        this.surfaces.vertex(0.5, -0.5, 0.0);
        this.surfaces.vertex(0.5, 0.5, 0.0);
        this.surfaces.vertex(-0.5, 0.5, 0.0);
        this.surfaces.buildBuffers(gl);
    }
    mainloop(timestamp) {
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
        window.requestAnimationFrame((t) => {
            self.update();
            self.display();
            self.mainloop(t);
        });
    }
    updateUI() {
        // Nothing here currently
    }
    rotateCW(i) {
        let temp = new Array(9);
        temp[0] = this.subfaces[i * 9 + 6];
        temp[1] = this.subfaces[i * 9 + 3];
        temp[2] = this.subfaces[i * 9 + 0];
        temp[3] = this.subfaces[i * 9 + 7];
        temp[4] = this.subfaces[i * 9 + 4];
        temp[5] = this.subfaces[i * 9 + 1];
        temp[6] = this.subfaces[i * 9 + 8];
        temp[7] = this.subfaces[i * 9 + 5];
        temp[8] = this.subfaces[i * 9 + 2];
        for (let j = 0; j < 9; ++j) {
            this.subfaces[i * 9 + j] = temp[j];
        }
    }
    rotateRubriksUp() {
        let temp = new Array(54);
        for (let i = 0; i < 9; ++i) {
            temp[5 * 9 + i] = this.subfaces[0 * 9 + i];
            temp[3 * 9 + i] = this.subfaces[5 * 9 + 8 - i];
            temp[4 * 9 + i] = this.subfaces[3 * 9 + 8 - i];
            temp[0 * 9 + i] = this.subfaces[4 * 9 + i];
        }
        temp[1 * 9 + 0] = this.subfaces[1 * 9 + 2];
        temp[1 * 9 + 1] = this.subfaces[1 * 9 + 5];
        temp[1 * 9 + 2] = this.subfaces[1 * 9 + 8];
        temp[1 * 9 + 3] = this.subfaces[1 * 9 + 1];
        temp[1 * 9 + 4] = this.subfaces[1 * 9 + 4];
        temp[1 * 9 + 5] = this.subfaces[1 * 9 + 7];
        temp[1 * 9 + 6] = this.subfaces[1 * 9 + 0];
        temp[1 * 9 + 7] = this.subfaces[1 * 9 + 3];
        temp[1 * 9 + 8] = this.subfaces[1 * 9 + 6];
        temp[2 * 9 + 2] = this.subfaces[2 * 9 + 0];
        temp[2 * 9 + 5] = this.subfaces[2 * 9 + 1];
        temp[2 * 9 + 8] = this.subfaces[2 * 9 + 2];
        temp[2 * 9 + 1] = this.subfaces[2 * 9 + 3];
        temp[2 * 9 + 4] = this.subfaces[2 * 9 + 4];
        temp[2 * 9 + 7] = this.subfaces[2 * 9 + 5];
        temp[2 * 9 + 0] = this.subfaces[2 * 9 + 6];
        temp[2 * 9 + 3] = this.subfaces[2 * 9 + 7];
        temp[2 * 9 + 6] = this.subfaces[2 * 9 + 8];
        for (let i = 0; i < 54; ++i) {
            if (temp[i] != undefined) {
                this.subfaces[i] = temp[i];
            }
        }
    }
    rotateRubriksLeft() {
        let temp = new Array(54);
        for (let i = 0; i < 9; ++i) {
            temp[0 * 9 + i] = this.subfaces[1 * 9 + i];
            temp[1 * 9 + i] = this.subfaces[3 * 9 + i];
            temp[2 * 9 + i] = this.subfaces[0 * 9 + i];
            temp[3 * 9 + i] = this.subfaces[2 * 9 + i];
        }
        temp[5 * 9 + 0] = this.subfaces[5 * 9 + 2];
        temp[5 * 9 + 1] = this.subfaces[5 * 9 + 5];
        temp[5 * 9 + 2] = this.subfaces[5 * 9 + 8];
        temp[5 * 9 + 3] = this.subfaces[5 * 9 + 1];
        temp[5 * 9 + 4] = this.subfaces[5 * 9 + 4];
        temp[5 * 9 + 5] = this.subfaces[5 * 9 + 7];
        temp[5 * 9 + 6] = this.subfaces[5 * 9 + 0];
        temp[5 * 9 + 7] = this.subfaces[5 * 9 + 3];
        temp[5 * 9 + 8] = this.subfaces[5 * 9 + 6];
        temp[4 * 9 + 2] = this.subfaces[4 * 9 + 0];
        temp[4 * 9 + 5] = this.subfaces[4 * 9 + 1];
        temp[4 * 9 + 8] = this.subfaces[4 * 9 + 2];
        temp[4 * 9 + 1] = this.subfaces[4 * 9 + 3];
        temp[4 * 9 + 4] = this.subfaces[4 * 9 + 4];
        temp[4 * 9 + 7] = this.subfaces[4 * 9 + 5];
        temp[4 * 9 + 0] = this.subfaces[4 * 9 + 6];
        temp[4 * 9 + 3] = this.subfaces[4 * 9 + 7];
        temp[4 * 9 + 6] = this.subfaces[4 * 9 + 8];
        for (let i = 0; i < 54; ++i) {
            if (temp[i] != undefined) {
                this.subfaces[i] = temp[i];
            }
        }
    }
    update() {
        let zoom_speed = 6.0;
        // The first time through will dynamically build key listener list
        // The list is physical keyboard keys, see KeyboardEvent.code documentation
        let keys = this.controls;
        /***** CAMERA / WORLD CONTROLS *****/
        if (keys.isKeyClick(["Tab"])) {
            this.skipBehind = !this.skipBehind;
        }
        if (keys.isKeyDown(["ShiftLeft", "ShiftRight"])) {
            zoom_speed *= 5.0;
        }
        if (keys.isKeyClick(["ArrowUp"])) {
            this.rotateRubriksUp();
            this.rotateRubriksUp();
            this.rotateRubriksLeft();
            this.rotateRubriksLeft();
            this.rotateRubriksLeft();
            // this.cameraPosition.y += zoom_speed*this.dt;
        }
        // if (keys.isKeyClick(["ArrowDown"])) {
        //     this.rotateRubriksUp();
        //     this.rotateRubriksUp();
        //     this.rotateRubriksUp();
        //     // this.cameraPosition.y -= zoom_speed*this.dt;
        // }
        if (keys.isKeyClick(["ArrowRight"])) {
            this.rotateRubriksLeft();
            this.rotateRubriksLeft();
            this.rotateRubriksLeft();
            // this.cameraPosition.x -= 10.0*zoom_speed*this.dt;
        }
        if (keys.isKeyClick(["ArrowLeft"])) {
            this.rotateRubriksLeft();
            // this.cameraPosition.x += 10.0*zoom_speed*this.dt;
        }
        if (keys.isKeyClick(["KeyR"])) {
            this.resetRubriksCube();
            // this.cameraPosition.x = 0.0;
            // this.cameraPosition.y = -30.0;
            // this.cameraPosition.y = 0.0;
        }
        /***** OTHER CONTROLS *****/
        if (keys.isKeyClick(["KeyA"])) {
            // hflog.log('left');
            let temp = new Array(54);
            this.rotateCW(1);
            temp[getIndex(4, 0)] = this.subfaces[getIndex(0, 0)];
            temp[getIndex(4, 3)] = this.subfaces[getIndex(0, 3)];
            temp[getIndex(4, 6)] = this.subfaces[getIndex(0, 6)];
            temp[getIndex(5, 0)] = this.subfaces[getIndex(3, 8)];
            temp[getIndex(5, 3)] = this.subfaces[getIndex(3, 5)];
            temp[getIndex(5, 6)] = this.subfaces[getIndex(3, 2)];
            temp[getIndex(0, 0)] = this.subfaces[getIndex(5, 0)];
            temp[getIndex(0, 3)] = this.subfaces[getIndex(5, 3)];
            temp[getIndex(0, 6)] = this.subfaces[getIndex(5, 6)];
            temp[getIndex(3, 2)] = this.subfaces[getIndex(4, 6)];
            temp[getIndex(3, 5)] = this.subfaces[getIndex(4, 3)];
            temp[getIndex(3, 8)] = this.subfaces[getIndex(4, 0)];
            // this.cameraPosition.z += 10.0*zoom_speed*this.dt;
            for (let i = 0; i < 54; ++i) {
                if (temp[i] != undefined) {
                    this.subfaces[i] = temp[i];
                }
            }
        }
        else if (keys.isKeyClick(["KeyD"])) {
            // hflog.log('front');
            let temp = new Array(54);
            this.rotateCW(0);
            temp[getIndex(1, 2)] = this.subfaces[getIndex(4, 0)];
            temp[getIndex(1, 5)] = this.subfaces[getIndex(4, 1)];
            temp[getIndex(1, 8)] = this.subfaces[getIndex(4, 2)];
            temp[getIndex(2, 0)] = this.subfaces[getIndex(5, 6)];
            temp[getIndex(2, 3)] = this.subfaces[getIndex(5, 7)];
            temp[getIndex(2, 6)] = this.subfaces[getIndex(5, 8)];
            temp[getIndex(4, 0)] = this.subfaces[getIndex(2, 6)];
            temp[getIndex(4, 1)] = this.subfaces[getIndex(2, 3)];
            temp[getIndex(4, 2)] = this.subfaces[getIndex(2, 0)];
            temp[getIndex(5, 6)] = this.subfaces[getIndex(1, 8)];
            temp[getIndex(5, 7)] = this.subfaces[getIndex(1, 5)];
            temp[getIndex(5, 8)] = this.subfaces[getIndex(1, 2)];
            for (let i = 0; i < 54; ++i) {
                if (temp[i] != undefined) {
                    this.subfaces[i] = temp[i];
                }
            }
        }
        else if (keys.isKeyClick(["KeyQ"])) {
            // hflog.log('back');
            let temp = new Array(54);
            this.rotateCW(3);
            temp[getIndex(5, 0)] = this.subfaces[getIndex(2, 2)];
            temp[getIndex(5, 1)] = this.subfaces[getIndex(2, 5)];
            temp[getIndex(5, 2)] = this.subfaces[getIndex(2, 8)];
            temp[getIndex(2, 2)] = this.subfaces[getIndex(4, 8)];
            temp[getIndex(2, 5)] = this.subfaces[getIndex(4, 7)];
            temp[getIndex(2, 8)] = this.subfaces[getIndex(4, 6)];
            temp[getIndex(4, 6)] = this.subfaces[getIndex(1, 0)];
            temp[getIndex(4, 7)] = this.subfaces[getIndex(1, 3)];
            temp[getIndex(4, 8)] = this.subfaces[getIndex(1, 6)];
            temp[getIndex(1, 0)] = this.subfaces[getIndex(5, 2)];
            temp[getIndex(1, 3)] = this.subfaces[getIndex(5, 1)];
            temp[getIndex(1, 6)] = this.subfaces[getIndex(5, 0)];
            for (let i = 0; i < 54; ++i) {
                if (temp[i] != undefined) {
                    this.subfaces[i] = temp[i];
                }
            }
        }
        else if (keys.isKeyClick(["KeyE"])) {
            // hflog.log('right');
            let temp = new Array(54);
            this.rotateCW(2);
            temp[getIndex(0, 2)] = this.subfaces[getIndex(4, 2)];
            temp[getIndex(0, 5)] = this.subfaces[getIndex(4, 5)];
            temp[getIndex(0, 8)] = this.subfaces[getIndex(4, 8)];
            temp[getIndex(3, 0)] = this.subfaces[getIndex(5, 8)];
            temp[getIndex(3, 3)] = this.subfaces[getIndex(5, 5)];
            temp[getIndex(3, 6)] = this.subfaces[getIndex(5, 2)];
            temp[getIndex(4, 2)] = this.subfaces[getIndex(3, 6)];
            temp[getIndex(4, 5)] = this.subfaces[getIndex(3, 3)];
            temp[getIndex(4, 8)] = this.subfaces[getIndex(3, 0)];
            temp[getIndex(5, 2)] = this.subfaces[getIndex(0, 2)];
            temp[getIndex(5, 5)] = this.subfaces[getIndex(0, 5)];
            temp[getIndex(5, 8)] = this.subfaces[getIndex(0, 8)];
            for (let i = 0; i < 54; ++i) {
                if (temp[i] != undefined) {
                    this.subfaces[i] = temp[i];
                }
            }
        }
        else if (keys.isKeyClick(["KeyW"])) {
            // hflog.log('top');
            let temp = new Array(54);
            this.rotateCW(5);
            temp[getIndex(3, 0)] = this.subfaces[getIndex(1, 0)];
            temp[getIndex(3, 1)] = this.subfaces[getIndex(1, 1)];
            temp[getIndex(3, 2)] = this.subfaces[getIndex(1, 2)];
            temp[getIndex(2, 0)] = this.subfaces[getIndex(3, 0)];
            temp[getIndex(2, 1)] = this.subfaces[getIndex(3, 1)];
            temp[getIndex(2, 2)] = this.subfaces[getIndex(3, 2)];
            temp[getIndex(1, 0)] = this.subfaces[getIndex(0, 0)];
            temp[getIndex(1, 1)] = this.subfaces[getIndex(0, 1)];
            temp[getIndex(1, 2)] = this.subfaces[getIndex(0, 2)];
            temp[getIndex(0, 0)] = this.subfaces[getIndex(2, 0)];
            temp[getIndex(0, 1)] = this.subfaces[getIndex(2, 1)];
            temp[getIndex(0, 2)] = this.subfaces[getIndex(2, 2)];
            for (let i = 0; i < 54; ++i) {
                if (temp[i] != undefined) {
                    this.subfaces[i] = temp[i];
                }
            }
        }
        else if (keys.isKeyClick(["KeyS"])) {
            // hflog.log('bottom');
            let temp = new Array(54);
            this.rotateCW(4);
            temp[getIndex(0, 6)] = this.subfaces[getIndex(1, 6)];
            temp[getIndex(0, 7)] = this.subfaces[getIndex(1, 7)];
            temp[getIndex(0, 8)] = this.subfaces[getIndex(1, 8)];
            temp[getIndex(2, 6)] = this.subfaces[getIndex(0, 6)];
            temp[getIndex(2, 7)] = this.subfaces[getIndex(0, 7)];
            temp[getIndex(2, 8)] = this.subfaces[getIndex(0, 8)];
            temp[getIndex(1, 6)] = this.subfaces[getIndex(3, 6)];
            temp[getIndex(1, 7)] = this.subfaces[getIndex(3, 7)];
            temp[getIndex(1, 8)] = this.subfaces[getIndex(3, 8)];
            temp[getIndex(3, 6)] = this.subfaces[getIndex(2, 6)];
            temp[getIndex(3, 7)] = this.subfaces[getIndex(2, 7)];
            temp[getIndex(3, 8)] = this.subfaces[getIndex(2, 8)];
            for (let i = 0; i < 54; ++i) {
                if (temp[i] != undefined) {
                    this.subfaces[i] = temp[i];
                }
            }
        }
    }
    getWorldMatrix(i) {
        let x = 0, y = 0, z = 0;
        z = 1.7;
        let temp = Math.floor(i % 3);
        if (temp == 0) {
            x = -1.1;
        }
        else if (temp == 1) {
            x = 0.0;
        }
        else if (temp == 2) {
            x = 1.1;
        }
        else {
            // hflog.log('invalid temp_x ' + temp);
        }
        temp = Math.floor((i % 9) / 3);
        if (temp == 0) {
            y = 1.1;
        }
        else if (temp == 1) {
            y = 0.0;
        }
        else if (temp == 2) {
            y = -1.1;
        }
        else {
            // hflog.log('invalid temp_y ' + temp);
        }
        let w = Matrix4.makeTranslation(x, y, z);
        if (Math.floor(i / 9) == 1) {
            w.Rotate(-90, 0.0, 1.0, 0.0);
        }
        else if (Math.floor(i / 9) == 2) {
            w.Rotate(90, 0.0, 1.0, 0.0);
        }
        else if (Math.floor(i / 9) == 3) {
            w.Rotate(180, 0.0, 1.0, 0.0);
        }
        else if (Math.floor(i / 9) == 4) {
            w.Rotate(90, 1.0, 0.0, 0.0);
        }
        else if (Math.floor(i / 9) == 5) {
            w.Rotate(-90, 1.0, 0.0, 0.0);
        }
        return w;
    }
    display() {
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
        if (this.uTextureMapLocation)
            gl.uniform1i(this.uTextureMapLocation, 0);
        let color = new Vector3(0.0, 1.0, 0.0);
        if (this.uColor)
            gl.uniform3fv(this.uColor, color.toFloat32Array());
        let w = Matrix4.makeIdentity();
        gl.useProgram(this.shaderProgram);
        for (let i = 0; i < 54; ++i) {
            if (i == 18 && this.skipBehind) {
                i = 54 - 9;
            }
            w = this.getWorldMatrix(i);
            gl.uniformMatrix4fv(this.uWorldMatrixLocation, false, w.toColMajorArray());
            switch (this.subfaces[i]) {
                case 0:
                    color = new Vector3(0.0, 1.0, 0.0);
                    break;
                case 1:
                    color = new Vector3(255 / 255, 140 / 255, 0.0);
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
            this.surfaces.draw(gl, this.aVertexLocation, this.aColorLocation, this.aTexCoordLocation, this.aNormalLocation);
        }
    }
}
class MyColor {
    constructor(r = 0, g = 0, b = 0, a = 255) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
}
;
// Note abs(KEY_X) == abs(KEY_X_READ)
var KeyStatus;
(function (KeyStatus) {
    KeyStatus[KeyStatus["NONE"] = 0] = "NONE";
    KeyStatus[KeyStatus["KEY_DOWN_READ"] = -2] = "KEY_DOWN_READ";
    KeyStatus[KeyStatus["KEY_UP_READ"] = -1] = "KEY_UP_READ";
    KeyStatus[KeyStatus["KEY_UP"] = 1] = "KEY_UP";
    KeyStatus[KeyStatus["KEY_DOWN"] = 2] = "KEY_DOWN";
})(KeyStatus || (KeyStatus = {}));
class MyControls {
    constructor(keysToListenFor = []) {
        this.keysToListenFor = keysToListenFor;
        // Uses KeyboardEvent.code field to map a KeyStatus
        this.keysPressed = new Map();
        // Prevent default action of ctrl and/or alt modifiers
        this.prevent_ctrl = false;
        this.prevent_alt = false;
        let self = this;
        document.onkeydown = (e) => {
            // Only prevent default action of those we are listening for
            keysToListenFor.forEach((key) => {
                // Usually don't want to prevent ctrl and alt modified key events
                if (key == e.code && (!e.ctrlKey || this.prevent_ctrl) && (!e.altKey || this.prevent_alt)) {
                    e.preventDefault();
                }
            });
            if (!e.repeat) {
                self.keysPressed.set(e.code, KeyStatus.KEY_DOWN);
            }
        };
        document.onkeyup = (e) => {
            // Only prevent default action of those we are listening for
            keysToListenFor.forEach((key) => {
                if (key == e.code) {
                    e.preventDefault();
                }
            });
            let status = self.keysPressed.get(e.code);
            if (status != KeyStatus.KEY_UP_READ) {
                self.keysPressed.set(e.code, KeyStatus.KEY_UP);
            }
        };
    }
    checkAndUpdateListeners(names) {
        names.forEach((e) => {
            let doesntHaveName = true;
            for (let j = 0; j < this.keysToListenFor.length; ++j) {
                if (e == this.keysToListenFor[j]) {
                    doesntHaveName = false;
                    break;
                }
            }
            if (doesntHaveName) {
                this.keysToListenFor.push(e);
            }
        });
    }
    /** Couldn't come up with a good reason to use KeyStatus directly */
    // get(name: string): KeyStatus {
    //     this.checkAndUpdateListeners([name]);
    //     let temp = this.keysPressed.get(name);
    //     if (!temp) {
    //         return KeyStatus.NONE;
    //     }
    //     this.keysPressed.set(name, -Math.abs(temp));
    //     return temp;
    // }
    // getFrom(names: string[]): KeyStatus {
    //     this.checkAndUpdateListeners(names);
    //     let value: KeyStatus = KeyStatus.NONE;
    //     for(let i = 0; i < names.length; ++i) {
    //         let temp = this.keysPressed.get(names[i]);
    //         if (temp != undefined && temp != KeyStatus.NONE) {
    //             value = temp;
    //             this.keysPressed.set(names[i], -Math.abs(value));
    //         }
    //     }
    //     return value;
    // }
    isKeyClick(names) {
        let keyclick = false;
        names.forEach((e) => {
            let temp = this.keysPressed.get(e);
            if (temp && temp == KeyStatus.KEY_DOWN) {
                this.keysPressed.set(e, KeyStatus.KEY_DOWN_READ);
                keyclick = true;
            }
        });
        // You never start a program with a key down
        if (!keyclick)
            this.checkAndUpdateListeners(names);
        return keyclick;
    }
    isKeyDown(keys) {
        let keydown = false;
        keys.forEach((e) => {
            let temp = this.keysPressed.get(e);
            // For any of the that keys have KEY_DOWN set to KEY_DOWN_READ
            if (temp && Math.abs(temp) == KeyStatus.KEY_DOWN) {
                this.keysPressed.set(e, KeyStatus.KEY_DOWN_READ);
                keydown = true;
            }
        });
        // You never start a program with a key down
        if (!keydown)
            this.checkAndUpdateListeners(keys);
        return keydown;
    }
    isKeyUp(keys) {
        let keyup = false;
        keys.forEach((e) => {
            let temp = this.keysPressed.get(e);
            // For any of the that keys have KEY_UP set to KEY_UP_READ
            if (temp && Math.abs(temp) == KeyStatus.KEY_UP) {
                this.keysPressed.set(e, KeyStatus.KEY_UP_READ);
                keyup = true;
            }
        });
        // You never start a program with a key down
        if (!keyup)
            this.checkAndUpdateListeners(keys);
        return keyup;
    }
}
/// <reference path="MyColor.ts" />
class MyShapeOutline {
    constructor(type = 0, first = 0, count = 0) {
        this.type = type;
        this.first = first;
        this.count = count;
    }
}
class MyShape {
    constructor() {
        this.currentVertex = Vector3.make(0, 0, 0);
        this.currentColor = Vector3.make(1, 1, 1);
        this.currentTexCoord = Vector2.make(0, 0);
        this.currentNormal = Vector3.make(0, 0, 1);
        this.count = 0;
        this.vertices = [];
        this.surfaces = [];
        this.dirty = true;
        this.buffer = null;
        this.vOffset = 0;
        this.cOffset = 4 * 3;
        this.tOffset = 4 * 6;
        this.nOffset = 4 * 8;
        this.stride = 4 * 11;
    }
    vertex(x, y, z) {
        this.currentVertex.x = x;
        this.currentVertex.y = y;
        this.currentVertex.z = z;
        this.emitVertex();
    }
    vertex3(xyz) {
        this.currentVertex.x = xyz.x;
        this.currentVertex.y = xyz.y;
        this.currentVertex.z = xyz.z;
        this.emitVertex();
    }
    color(r, g, b) {
        this.currentColor.x = r;
        this.currentColor.y = g;
        this.currentColor.z = b;
    }
    color3(rgb) {
        this.currentColor.copy(rgb);
    }
    texCoord(s, t) {
        this.currentTexCoord.x = s;
        this.currentTexCoord.y = t;
    }
    texCoord2(st) {
        this.currentTexCoord.x = st.x;
        this.currentTexCoord.y = st.y;
    }
    normal(x, y, z) {
        this.currentNormal.reset(x, y, z);
    }
    normal3(xyz) {
        this.currentNormal.reset(xyz.x, xyz.y, xyz.z);
    }
    // set current material library
    mtllib(name) {
    }
    // set current material
    usemtl(name) {
    }
    // create smoothing normals
    smooth() {
    }
    // create a box
    box(P0, P1) {
    }
    // create a sphere
    sphere(size, slices = 16, stacks = 8) {
    }
    // add a new index to the surface
    // negative numbers backward index into the shape vertices
    addIndex(which) {
    }
    clear() {
        this.vertices = [];
        this.surfaces = [];
        this.dirty = true;
    }
    newSurface(type) {
        let surface = new MyShapeOutline(type, this.count, 0);
        this.surfaces.push(surface);
    }
    emitVertex() {
        if (this.surfaces.length == 0) {
            return;
        }
        let last = this.surfaces.length - 1;
        let v = [
            this.currentVertex.x,
            this.currentVertex.y,
            this.currentVertex.z,
            this.currentColor.x,
            this.currentColor.y,
            this.currentColor.z,
            this.currentTexCoord.x,
            this.currentTexCoord.y,
            this.currentNormal.x,
            this.currentNormal.y,
            this.currentNormal.z
        ];
        this.vertices.push(...v);
        this.count++;
        this.surfaces[last].count++;
        this.dirty = true;
    }
    buildBuffers(gl) {
        this.buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.DYNAMIC_DRAW);
        this.dirty = false;
    }
    draw(gl, vertexIndex = -1, colorIndex = -1, texCoordIndex = -1, normalIndex = -1) {
        if (this.dirty)
            this.buildBuffers(gl);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        if (vertexIndex >= 0) {
            gl.enableVertexAttribArray(vertexIndex);
            gl.vertexAttribPointer(vertexIndex, 3, gl.FLOAT, false, this.stride, this.vOffset);
        }
        if (colorIndex >= 0) {
            gl.enableVertexAttribArray(colorIndex);
            gl.vertexAttribPointer(colorIndex, 3, gl.FLOAT, false, this.stride, this.cOffset);
        }
        if (texCoordIndex >= 0) {
            gl.enableVertexAttribArray(texCoordIndex);
            gl.vertexAttribPointer(texCoordIndex, 2, gl.FLOAT, false, this.stride, this.tOffset);
        }
        if (normalIndex >= 0) {
            gl.enableVertexAttribArray(normalIndex);
            gl.vertexAttribPointer(colorIndex, 3, gl.FLOAT, false, this.stride, this.nOffset);
        }
        for (let surface of this.surfaces) {
            gl.drawArrays(surface.type, surface.first, surface.count);
        }
    }
}
//# sourceMappingURL=library.js.map