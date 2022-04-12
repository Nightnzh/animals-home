import { useRadio, Box, useRadioGroup, HStack, RadioProps, Center } from "@chakra-ui/react"

// 1. Create a component that consumes the `useRadio` hook
export function RadioCard(props : RadioProps) {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box flex={1} as='label'>
      <input {...input} />
      <Center
     
        {...checkbox}
        cursor='pointer'
        rounded={"20px"}
        borderWidth='1px'
        borderRadius='20px'
        boxShadow='md'
        bg="#f7f7f7"
        _checked={{
          bg: 'black',
          color: 'white',
          borderColor: '#FFF',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        h="50px"
        // w="72px"
        px={5}
        py={3}
      >
        {props.children}
      </Center>
    </Box>
  )
}

export function RadioPlaceCard(props : RadioProps) {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box flex={1} as='label'>
      <input {...input} />
      <Center
        {...checkbox}
        // transition='all 0.5s'
        cursor='pointer'
        rounded={"10px"}
        boxShadow='sm'
        // color="#FFF"
        bg="#f0a122"
        _checked={{
          bg: '#0070e1',
          color: 'white',
          borderColor: '#FFF',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        // h="50px"
        fontWeight="bold"
        // w="72px"
        px={5}
        py={3}
      >
        {props.children}
      </Center>
    </Box>
  )
}

// Step 2: Use the `useRadioGroup` hook to control a group of custom radios.
function Example() {
  const options = ['react', 'vue', 'svelte']

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'framework',
    defaultValue: 'react',
    onChange: console.log,
  })

  const group = getRootProps()

  return (
    <HStack {...group}>
      {options.map((value) => {
        const radio = getRadioProps({ value })
        return (
          <RadioCard key={value} {...radio}>
            {value}
          </RadioCard>
        )
      })}
    </HStack>
  )
}

