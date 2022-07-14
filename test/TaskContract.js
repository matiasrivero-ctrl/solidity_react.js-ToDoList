const TaskContract = artifacts.require('TaskContract');

contract('TaskContract', () => {
    before(async() => {
        this.taskContract = await TaskContract.deployed();
    });

    it('migrate deployed successfully', async () => {
        const address = this.taskContract.address;

        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
        assert.notEqual(address, 0x0);
        assert.notEqual(address, '');
    });

    it('get task list', async() => {
        const taskCounter = await this.taskContract.taskCounter();
        const task = await this.taskContract.tasks(taskCounter);

        assert.equal(task.id.toNumber(), taskCounter);
        assert.equal(task.title, "Mi primer tarea");
        assert.equal(task.description, "Tengo que hacer tal cosa");
        assert.equal(task.done, false);
        assert.equal(taskCounter, 1);
    });

    it('testing createTask function', async() => {
        const result = await this.taskContract.createTask("mi segunda tarea", "debo hacer algo más");
        const args = result.logs[0].args;
        const taskCounter = await this.taskContract.taskCounter();

        assert.equal(taskCounter, 2);
        assert.equal(args.id.toNumber(), 2);
        assert.equal(args.title, "mi segunda tarea");
        assert.equal(args.description, "debo hacer algo más");
        assert.equal(args.done, false);
    });

    it('testing toggleDone function', async () => {
        const result = await this.taskContract.toggleDone(1);
        const task = result.logs[0].args;
        const tasks = await this.taskContract.tasks(1);

        assert.equal(tasks.done, true);
        assert.equal(task.id, 1);
        assert.equal(task.done, true);
    })
})