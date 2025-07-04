export default function Features() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="font-roboto font-bold text-3xl text-center text-darkText mb-12">Why Choose ScienceLab SA</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-primary bg-opacity-10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="material-icons text-primary text-2xl">menu_book</span>
            </div>
            <h3 className="font-roboto font-medium text-xl text-darkText mb-2">CAPS Aligned</h3>
            <p className="text-gray-600">All experiments follow the South African curriculum requirements for Grades 7-12.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-primary bg-opacity-10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="material-icons text-primary text-2xl">science</span>
            </div>
            <h3 className="font-roboto font-medium text-xl text-darkText mb-2">Practical Learning</h3>
            <p className="text-gray-600">Hands-on experiments that reinforce theoretical concepts in an engaging way.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-primary bg-opacity-10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="material-icons text-primary text-2xl">accessibility</span>
            </div>
            <h3 className="font-roboto font-medium text-xl text-darkText mb-2">Accessible Resources</h3>
            <p className="text-gray-600">Experiments designed with readily available materials for all South African schools.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-primary bg-opacity-10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="material-icons text-primary text-2xl">devices</span>
            </div>
            <h3 className="font-roboto font-medium text-xl text-darkText mb-2">Multi-Platform</h3>
            <p className="text-gray-600">Access on any device with our responsive website and dedicated mobile apps.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
