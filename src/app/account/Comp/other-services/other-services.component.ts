import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-other-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './other-services.component.html',
  styleUrl: './other-services.component.css'
})
export class OtherServicesComponent {
  categories = [
    {
      imageUrl: "https://cdn.usegalileo.ai/stability/471e6841-697e-4f98-a6c6-ab74c7f701d6.png",
      description: "Love & Relationships",
    },
    {
      imageUrl: "https://cdn.usegalileo.ai/sdxl10/22880522-77be-4ff9-8167-c407e7066dc2.png",
      description: "Career & Money",
    },
    {
      imageUrl: "https://cdn.usegalileo.ai/stability/96659cfe-b139-481f-b8b7-dc63a8024b93.png",
      description: "Family & Friends",
    },
    {
      imageUrl: "https://cdn.usegalileo.ai/stability/4d2d3f93-afde-4c8f-a363-e27fad5bef56.png",
      description: "Wellness & Spirituality",
    },
  ];

  poojas = [
    {
      imageUrl: "https://cdn.usegalileo.ai/sdxl10/d5ab57c3-0c57-43a2-bccc-b62acf9aac49.png",
      description: "Maha Mrityunjaya Homam",
    },
    {
      imageUrl: "https://cdn.usegalileo.ai/sdxl10/770f8177-740d-41a4-ab3e-50279c69d712.png",
      description: "Sri Sukta Homam",
    },
    {
      imageUrl: "https://cdn.usegalileo.ai/sdxl10/e7274ef8-6ca9-4811-bb20-4ab27ae60727.png",
      description: "Ganapathy Homam",
    },
    {
      imageUrl: "https://cdn.usegalileo.ai/sdxl10/2e5f1eb3-ab23-457e-8057-8f89849dcd8c.png",
      description: "Durga Homam",
    },
  ];
}
