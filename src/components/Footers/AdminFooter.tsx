function Footer (): React.ReactElement {
  return (
    <footer className='print:hidden p-1 text-center font-bold text-gray-500'>
      © {new Date().getFullYear()} AJMA
    </footer>
  )
}

export default Footer
