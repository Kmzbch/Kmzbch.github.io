module objects {
    export abstract class Scene extends createjs.Container {
        constructor() {
            super();
        }

        // Life Cycle Functions

        public abstract Start(): void;

        public abstract Update(): void;

        public abstract Main(): void;
    }
}