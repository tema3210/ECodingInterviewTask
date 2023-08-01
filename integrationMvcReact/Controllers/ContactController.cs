using System.Data;
using System.Data.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using static integrationMvcReact.ContactFilter;

namespace integrationMvcReact.Controllers
{
    public class ContactController : Controller
    {

        private readonly ContactsContext ctx;

        public ContactController(ContactsContext ctx)
        {
            this.ctx = ctx;
        }

        [HttpGet]
        public IEnumerable<Contact> Get(string id)
        {
            var result = from c in ctx.Contacts
                         where c.Id.Equals(id)
                         select c;

            return result;
        }

        [HttpGet]
        public string Index([FromQuery] ContactFilter filter)
        {
            var offset = filter.Page * filter.PageSize;

            var substrPattern = (string s) => '%' + s+ '%';

            var query = from u in ctx.Contacts select u;

            if (filter.FirstNameLike != null)
                query = query.Where( c => EF.Functions.Like(c.FirstName, substrPattern(filter.FirstNameLike) ));

            if (filter.LastNameLike != null)
                query = query.Where( c => EF.Functions.Like(c.LastName, substrPattern(filter.LastNameLike) ));

            if (filter.PhoneNumberLike != null)
                query = query.Where( c => EF.Functions.Like(c.PhoneNumber, substrPattern(filter.PhoneNumberLike)));

            if (filter.EmailLike != null)
                query = query.Where( c => EF.Functions.Like(c.Email, substrPattern(filter.EmailLike)));

            switch (filter.Order)
            {
                case OrderBy.FirstName:
                    query = query.OrderBy(x => x.FirstName); break;
                case OrderBy.LastName:
                    query = query.OrderBy(x => x.LastName); break;
                case OrderBy.PhoneNumber:
                    query = query.OrderBy(x => x.PhoneNumber); break;
                case OrderBy.Email:
                    query = query.OrderBy(x => x.Email); break;
            }

            var count = ctx.Contacts.Count();

            return JsonConvert.SerializeObject(new { contacts = query.Skip(offset).Take(filter.PageSize).ToList(), count }) ;
        }

        [HttpPost]
        public int Post([FromBody] Contact contact)
        {
            if (contact == null) return 400;

            ctx.Contacts.Add(contact);

            try
            {
                ctx.SaveChanges();
            } catch (Exception _)
            {
                //TODO: handle errors
            }
            return 200;
        }

        [HttpPatch]
        public int Patch(int id, [FromBody] Contact contact)
        {
            contact.Id = id;

            ctx.Contacts.Attach(contact);

            ctx.Contacts.Update(contact);

            try
            {
                ctx.SaveChanges();
            }
            catch (Exception _)
            {
                //TODO: handle errors
            }
            return 200;
        }

        [HttpDelete]
        public int Delete(string id)
        {
            try
            {
                Contact target = new Contact() { Id = long.Parse(id) };
                ctx.Contacts.Attach(target);
                ctx.Contacts.Remove(target);
                ctx.SaveChanges();
            }
            catch (Exception ex)
            {
                //TODO: handle errors
            }

            return 200;
        }
    }
}
