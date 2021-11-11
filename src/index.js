// **problem statement**
// I need to create a daily habbits point system such that
// I can define tasks that I would like to accomplish every day
// At the start of every day, I can resolve all of the tasks done and score the points for the day adding them to my bank
// I can track the number of days in a row that I have accomplished that task
// The value of every task increases by the number of days in a row, in sets of 5 with the 5th day being a pizza
// ---
// **"real world" examples
/**
 * bank: 0
 * - [ ] task: [ 1, 2, 3, 4, 5, 🍕]
 *
 * resolve
 *
 * bank: 0
 * - [ ] task: [ 1, 2, 3, 4, 5, 🍕]
 */

/**
 * bank: 0
 * - [x] task: [ 1, 2, 3, 4, 5, 🍕]
 *
 * resolve
 *
 * bank: 1
 * - [ ] task: [ x, 2, 3, 4, 5, 🍕]
 */

/**
 * bank: 0
 * - [x] task: [ x, x, x, x, x 🍕]
 *
 * resolve
 *
 * bank: 0 | 🍕
 * - [ ] task: [ 2, 3, 4, 5, 6 🍕]
 */

/**
 * bank: 0
 * - [x] task: [ x, 2, 3, 4, 5 🍕]
 *
 * resolve
 *
 * bank: 2
 * - [ ] task: [ x, x, 3, 4, 5 🍕]
 */

/**
 * bank: 0
 * - [ ] task: [ x, 2, 3, 4, 5 🍕]
 *
 * resolve
 *
 * bank: 0
 * - [ ] task: [ 1, 2, 3, 4, 5 🍕]
 */

/**
 * bank: 0
 * - [ ] task: [ x, 3, 4, 5, 6 🍕]
 *
 * resolve
 *
 * bank: 0
 * - [ ] task: [ 1, 2, 3, 4, 5 🍕]
 */
// ---

/**
 * Observed behaviour
 * A Task is things that have a name, a points array, a "done" status flag
 *  - a tasks points array is based on how many times it has been completed, so:
 *    0-5 1, 2, 3, 4, 5
 *    6-11 2, 3, 4, 5, 6
 *    12-17 2, 3, 4, 5, 6
 *    this could be handled by simply counting `timesCompleted: number` and then having the value added with that
 *  - if a task isn't done when a day resolves, it's count gets reset
 * The Tasks is a list of tasks, just a collection I think
 * The Bank is a singular thing that has a number value and a pizza number value that is incremented for every task done when a day is resovled
 *
 */

// **Structures That I Know I will Need**
/**
 * App {
 *  LastDate
 *  Bank
 *  Tasks
 * }
 *
 * LastDate: Date
 *
 * Bank {
 *  value: number
 *  pizza: number
 * }
 *
 * Task {
 *  status: 'active'|'done'
 *  task: string
 *  streakItterations: number
 * }
 *
 * Tasks {
 *  id: Task
 * }
 */

/**
 * UX
 *
 * The User can Toggle a Task's Done Status
 * The User can Resolve a Day - If it is a new day
 * The User can Spend Points
 */

// toggleTask( taskOrTaskId: string | Task ): void
//    get the task from the task list
//    mark task as done or not-done depending on it's current state

//  resovleTask(task)

// resolveDay(date): void
//  if date is not state's LastDate
//    for each Task in TaskList
//      if Task isDone
//        resolveTask -> value
//        add value to bank

// resolveDay()
//    getCurrentState
//    modifyState -> 'state
//    render 'state

// updateAndRender
//  // hold's current state
//  //

// "render"
// when state has changed
//    render state
//    offer api toggleTask and resolveDay

/**
 * So state is going to be an object,
 * this object will have the given values,
 * the offered api will take the current state and any relevent payload and return a new state
 * the offered api will mask the functions so when they are done with the new state, it will rerender
 *
 * UX {
 *    state
 *    updateState(newState)
 *    renderState()
 *    resolveDay()
 *    toggleTask()
 * }
 */

// director( state, modFunc )
//   modFunc(state) -> 'state
//   updateState('state)
//   renderState('state)

const Bank = {
  pizza: 0,
  points: 0,

  spendPoints({ pizza, points }, { amount, pizzaAmount }) {
    if (amount > points || pizzaAmount > pizza) return;
    points -= amount;
    pizza -= amount;
  },

  addPoints({ points }, { amount }) {
    points += amount;
  },

  addPizza({ pizza }, { amount }) {
    pizza += amount;
  }
};

const TASK_STATUS = {
  active: 0,
  done: 1
};

function isDone(task) {
  return task.status === TASK_STATUS.done;
}

const STREAK_MAX = 6;

const Task = {
  status: TASK_STATUS.active,
  task: "",
  streakItterations: 0,
  currentStreakIndex: 0,

  toggleStatus(task) {
    task.status = isDone(task) ? TASK_STATUS.active : TASK_STATUS.done;
  },

  setStatus(task, { status }) {
    task.status = status;
  },

  resolveTask(task) {
    if (isDone(task)) {
      if (task.currentStreakIndex === STREAK_MAX) {
        task.currentStreakIndex = 0;
        task.streakItterations += 1;
      } else {
        task.currentStreakIndex += 1;
        task.status = TASK_STATUS.active;
      }
    } else {
      task.currentStreakIndex = 0;
      task.streakItterations = 0;
    }
  }
};
