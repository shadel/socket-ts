export async function wait(param:number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const timer = setTimeout(() => {
            try {
                
            resolve();
            clearTimeout(timer);
            } catch (error) {
                reject()
            }
        }, param);
    })
}