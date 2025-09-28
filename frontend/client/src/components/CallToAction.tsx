import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const CallToAction = () => {
  return (
    <section className="py-24 animated-gradient relative">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-fredoka text-4xl md:text-5xl text-white mb-6">Ready to Make Learning Fun?</h2>
        <p className="text-white text-xl max-w-3xl mx-auto mb-10">Join thousands of kids who love learning with our interactive educational games and friendly AI characters!</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard">
            <Button className="bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-full hover:bg-white hover:text-primary transition-all hover:-translate-y-1 duration-300 text-lg">
              Get Started Free
            </Button>
          </Link>
          <Button variant="outline" className="bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-full hover:bg-white hover:text-primary transition-all hover:-translate-y-1 duration-300 text-lg">
            See Demo
          </Button>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-10 right-10 w-16 h-16 bg-white opacity-10 rounded-full"></div>
        <div className="absolute bottom-10 left-20 w-24 h-24 bg-white opacity-10 rounded-full"></div>
        <div className="absolute top-1/2 left-10 w-12 h-12 bg-white opacity-10 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 bg-white opacity-10 rounded-full"></div>
      </div>
    </section>
  );
};

export default CallToAction;
