/**
 * Command Pattern Implementation
 * Encapsulates canvas operations as objects
 */

/**
 * Base Command
 */
export class Command {
  execute() {
    throw new Error('execute() must be implemented by subclass');
  }

  undo() {
    throw new Error('undo() must be implemented by subclass');
  }
}

/**
 * Clear Canvas Command
 */
export class ClearCanvasCommand extends Command {
  constructor(canvasFacade) {
    super();
    this.canvasFacade = canvasFacade;
  }

  execute() {
    this.canvasFacade.clear();
  }

  undo() {
    // Clearing is not undoable in this context
  }
}

/**
 * Draw Field Command
 */
export class DrawFieldCommand extends Command {
  constructor(canvasFacade) {
    super();
    this.canvasFacade = canvasFacade;
  }

  execute() {
    this.canvasFacade.drawField();
  }

  undo() {
    // Drawing is not undoable in this context
  }
}

/**
 * Reset Canvas Command
 */
export class ResetCanvasCommand extends Command {
  constructor(canvas, context) {
    super();
    this.canvas = canvas;
    this.context = context;
  }

  execute() {
    const { width, height, ctx } = this.context.canvasFacade.constructor.setupCanvas(
      this.canvas,
      this.context.constructor.getDevicePixelRatio 
        ? this.context.constructor.getDevicePixelRatio()
        : (window.devicePixelRatio || 1)
    );
    
    this.context.w = width;
    this.context.h = height;
    this.context.canvasFacade.setDimensions(width, height);
    
    return { width, height };
  }

  undo() {
    // Reset is not undoable
  }
}

/**
 * Command Invoker
 * Executes commands and maintains history
 */
export class CommandInvoker {
  constructor() {
    this.history = [];
    this.maxHistory = 50;
  }

  /**
   * Execute a command
   * @param {Command} command - Command to execute
   */
  execute(command) {
    const result = command.execute();
    
    // Add to history
    this.history.push(command);
    
    // Limit history size
    if (this.history.length > this.maxHistory) {
      this.history.shift();
    }
    
    return result;
  }

  /**
   * Undo last command
   */
  undo() {
    const command = this.history.pop();
    if (command) {
      command.undo();
    }
  }

  /**
   * Clear history
   */
  clearHistory() {
    this.history = [];
  }
}
