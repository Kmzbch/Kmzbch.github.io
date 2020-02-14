// module objects {
//     export class Symbol extends createjs.Bitmap {
//         constructor(imagePath: string, x: number, y: number, isCentered: boolean) {
//             super(imagePath);
//             if (isCentered) {
//                 this.regX = -150;
//                 this.regY = 25;
//             }
//             this.x = x;
//             this.y = y;
//         }
//     }
// }

module objects {
    export class Symbol extends GameObject {

        public Start(): void {
            throw new Error("Method not implemented.");
        }
        public Update(): void {
            throw new Error("Method not implemented.");
        }
        public Reset(): void {
            throw new Error("Method not implemented.");
        }

        // constructor
        constructor(imagePath: string, x: number = 0, y: number = 0, width: number = 0, height: number = 0, isCentered: boolean = false) {
            super(imagePath, x, y, isCentered);
            super.CustomSize(width, height, isCentered);
            // this.Start();

        }
    }
}
