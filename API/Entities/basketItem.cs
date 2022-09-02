using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("BasketItems")]
    public class basketItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }

        //Relation to Basket (navigation properties) will just show product Id in Product
        public int ProductId { get; set; }
        public Product Product { get; set; }

        public int basketId { get; set; }
        public Basket Basket { get; set; }
    }
}