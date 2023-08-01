namespace integrationMvcReact
{
    public class ContactFilter
    {
        public string? FirstNameLike { get; set; } = null;

        public string? LastNameLike { get; set; } = null;

        public string? PhoneNumberLike { get; set; } = null;

        public string? EmailLike { get; set; } = null;

        public enum OrderBy {
            FirstName,
            LastName,
            PhoneNumber,
            Email
        };

        public OrderBy Order { get; set; } = OrderBy.FirstName;

        public int Page { get; set; } = 0;

        public int PageSize { get; set; } = 10;
    }
}
