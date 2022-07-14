// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract TaskContract {
    uint public taskCounter = 0;

    constructor() {
        createTask("Mi primer tarea", "Tengo que hacer tal cosa");
    }

    event TaskCreated (
        uint id,
        string title,
        string description,
        bool done,
        uint createdAt
    );

    event ToggleTaskDone (
        uint id,
        bool done
    );

    // uint = uint256
    struct Task {
        uint id;
        string title;
        string description;
        bool done;
        uint createdAt;
    }

    mapping (uint => Task) public tasks;

    function createTask(string memory _title, string memory _description) public {
        taskCounter++;
        tasks[taskCounter] = Task(taskCounter, _title, _description, false, block.timestamp);
        emit TaskCreated(taskCounter, _title, _description, false, block.timestamp);
    }

    function toggleDone(uint _id) public {
       Task memory _task = tasks[_id];
       _task.done = !_task.done;
       tasks[_id] = _task;
       emit ToggleTaskDone(_id, _task.done);
    }
}