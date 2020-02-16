module objects {
    export abstract class Scene extends createjs.Container {
        // CONSTRUCTOR
        constructor() {
            super();
        }

        // PUBLIC METHODS
        // Life Cycle Functions
        public abstract Start(): void;

        public abstract Update(): void;

        public abstract Main(): void;
    }
}