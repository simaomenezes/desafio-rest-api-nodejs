interface IMeal {
    id: string
    userId: string
    name: string
    description?: string | undefined
    isInDiet: boolean
    created_at: string
  }
  
  export function calcBestSqDiet(meals: IMeal[]): number {
    const sequenceList: number[] = []
    let sequenceCount: number = 0
  
    const listIsInDiet = meals.map(({ isInDiet }) => isInDiet)
  
    listIsInDiet.forEach((item, index) => {
      if (item) {
        sequenceCount++
      } else {
        sequenceList.push(sequenceCount)
        sequenceCount = 0
      }
  
      if (listIsInDiet.length - 1 === index) {
        sequenceList.push(sequenceCount)
      }
    })
  
    return Math.max(...sequenceList)
  }