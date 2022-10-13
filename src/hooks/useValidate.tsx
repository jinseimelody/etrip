type IState = {
  valid: Boolean,
  messages: string[]
}

const useValidate = (errors: any) => {

  if (!errors || Object.entries(errors).length === 0) {
    return { valid: true, messages: [] } as IState;
  }

  const entries = Object.entries(errors);
  return {
    valid: false,
    messages: entries.map(([_, error]) => (error as any).message)
  } as IState;

}

export default useValidate;