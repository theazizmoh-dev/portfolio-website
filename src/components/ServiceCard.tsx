import { Check } from 'lucide-react';
import { Service } from '@/lib/sanity';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <div className="card-minimal">
      {service.icon && (
        <div className="w-12 h-12 mb-4">
          <img
            src={service.icon}
            alt={`${service.title} icon`}
            className="w-full h-full object-contain"
          />
        </div>
      )}
      
      <div className="space-y-4">
        <h3 className="text-xl font-bold leading-tight">
          {service.title}
        </h3>

        <p className="text-muted-foreground leading-relaxed">
          {service.description}
        </p>

        {service.features && service.features.length > 0 && (
          <ul className="space-y-2">
            {service.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <Check size={16} className="text-primary shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;