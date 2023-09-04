interface ObserverCallback<T> {
    (value: T): void
}
export class Observers<T> {
    private observers: ObserverCallback<T>[]
    private _value: T
    public get value(): T {
        return this._value
    }
    public subscribe(observer: ObserverCallback<T>) {
        this.observers.push(observer)
    }

    public unsubscribe(observer: ObserverCallback<T>) {
        this.observers = this.observers.filter(obs => obs !== observer)
    }
    public notify(value: T) {
        this._value = value
        this.observers.forEach(observer => observer(value))
    }
}
export class ObserverableValue<T> {
    public observers = new Observers<T>()
    public notify(value: T) {
        this.observers.notify(value)
    }
}